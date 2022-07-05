import {
  View,
  Text,
  ScrollView,
  Keyboard,
  Pressable,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { context } from "../../context/context";
import { colors, fontSize } from "../../styles/global.styles";
import { Box, Button, HStack } from "native-base";
import {
  MessageInterface,
  MessageStackParamListProps,
  MessageStackParamListRouteProps,
} from "../../../global";
import { Entypo, Feather } from "@expo/vector-icons";
import styles from "./message.styles";
import { BlurView } from "expo-blur";
import { auth, storage } from "../../../firebase/firebase.config";
import {
  arrayUnion,
  doc,
  DocumentData,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import * as Network from "expo-network";

export default function MessageContainer({
  route,
  navigation,
}: {
  navigation: MessageStackParamListProps;
  route: MessageStackParamListRouteProps;
}) {
  const myContext = useContext(context);
  const [contentMessage, setContentMessage] = useState("");

  // THE UNIQUE ID
  const myId =
    auth.currentUser?.uid !== undefined ? auth.currentUser?.uid : "null";
  const yourId =
    route.params?.recepientUniqueId !== undefined
      ? route.params?.recepientUniqueId
      : "null";

  // THE NAME
  const myName =
    auth.currentUser?.displayName !== undefined
      ? auth.currentUser?.displayName
      : "null";
  const yourName =
    route.params?.myFullName !== undefined ? route.params?.myFullName : null;

  const messageScrollView = useRef<ScrollView>(null);
  const [messageConversatation, setMessageConversatation] = useState<
    MessageInterface[] | undefined
  >([]);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      messageScrollView.current?.scrollToEnd({ animated: true });
    });

    // GET THE DATA FOR THE MESSAGES
    const unSubscribeToMessages = onSnapshot(
      doc(storage, myId, `${yourId}-${yourName}`),
      (doc: DocumentData) => {
        if (doc.exists()) {
          setMessageConversatation(doc.data().index);
          setTimeout(() => {
            messageScrollView.current?.scrollToEnd({ animated: true });
          }, 500);
        } else {
          console.log("No such document!");
          setMessageConversatation([]);
        }
      }
    );

    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      unSubscribeToMessages();
    };
  }, []);

  const sendNewMessage = async () => {
    // CLEAR TEXT INPUT
    setContentMessage("");
    try {
      await updateDoc(doc(storage, myId, `${yourId}-${yourName}`), {
        index: arrayUnion({
          fullName: route.params?.myFullName,
          hisId: yourId,
          position: myId,
          message: contentMessage,
        }),
      });
      await updateDoc(doc(storage, yourId, `${myId}-${myName}`), {
        index: arrayUnion({
          fullName: auth.currentUser?.displayName,
          hisId: myId,
          position: myId,
          message: contentMessage,
        }),
      });

      messageScrollView.current?.scrollToEnd({ animated: true });
    } catch (error) {
      console.log(error);
    }
  };

  // CHECK NETWORK FIRST
  const checkNetworkFirst = async () => {
    const networkStatus = await Network.getNetworkStateAsync();
    if (networkStatus.isConnected) {
      sendNewMessage();
    } else {
      alert("You are not connected to the internet");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: myContext?.isDarkMode
          ? colors.darkMode
          : colors.primary,
      }}
    >
      <HStack alignItems="center" paddingX={2} paddingY={2}>
        <Button
          size="xs"
          rounded="lg"
          backgroundColor={colors.tertiary}
          onPress={() => {
            navigation.navigate("MessageList");
          }}
        >
          <Entypo name="chevron-left" size={24} color={colors.primary} />
        </Button>
        <Text
          style={{
            color: !myContext?.isDarkMode ? colors.darkMode : colors.primary,
            fontSize: fontSize.normal,
            fontWeight: "bold",
            marginLeft: 20,
          }}
        >
          {route.params?.myFullName}
        </Text>
      </HStack>

      {/* MESSAGE CONVERSATION */}
      <View style={styles.messageScrollConversationContainer}>
        <ScrollView
          onMomentumScrollEnd={() => {
            Keyboard.dismiss();
          }}
          style={{ flex: 1 }}
          ref={messageScrollView}
          showsVerticalScrollIndicator={false}
        >
          {messageConversatation?.map((item, index) => {
            return (
              <Box
                key={index}
                maxW="80"
                borderTopRightRadius={
                  item.position === auth.currentUser?.uid ? 0 : 20
                }
                borderTopLeftRadius={
                  item.position === auth.currentUser?.uid ? 20 : 0
                }
                borderBottomRightRadius={20}
                borderBottomLeftRadius={20}
                padding="3"
                marginY="3"
                marginX="2"
                backgroundColor={
                  item.position === auth.currentUser?.uid
                    ? colors.tertiary
                    : "gray.400"
                }
                alignSelf={
                  item.position === auth.currentUser?.uid
                    ? "flex-end"
                    : "flex-start"
                }
              >
                <Pressable
                  onLongPress={() => {
                    alert("hello");
                  }}
                >
                  <Text style={{ color: colors.primary }}>{item.message}</Text>
                </Pressable>
              </Box>
            );
          })}
        </ScrollView>
      </View>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        paddingX="2"
        paddingBottom="2"
        paddingTop="1"
      >
        <TextInput
          multiline={true}
          placeholderTextColor={
            myContext?.isDarkMode ? colors.primary : colors.secondary
          }
          style={{
            fontSize: fontSize.normal,
            color: !myContext?.isDarkMode ? colors.darkMode : colors.primary,
            maxHeight: 100,
            minHeight: 52,
            width: "85%",
            borderRadius: 10,
            paddingHorizontal: 10,
            backgroundColor: myContext?.isDarkMode
              ? colors.lightMode
              : colors.opccityColor,
          }}
          placeholder="Your Message..."
          value={contentMessage}
          onChangeText={(val) => {
            setContentMessage(val);
          }}
        />
        <Button
          size="lg"
          rounded="lg"
          backgroundColor={colors.tertiary}
          onPress={checkNetworkFirst}
        >
          <Feather name="send" size={24} color={colors.primary} />
        </Button>
      </HStack>
    </View>
  );
}
