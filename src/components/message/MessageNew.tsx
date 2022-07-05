import { View, Text, TextInput, ScrollView, Keyboard } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, Center, HStack, Pressable } from "native-base";
import { context } from "../../context/context";
import { colors, fontSize } from "../../styles/global.styles";
import { Entypo, Feather } from "@expo/vector-icons";
import styles from "./message.styles";
import {
  setDoc,
  doc,
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
  onSnapshot,
  DocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { auth, storage } from "../../../firebase/firebase.config";

export default function MessageNew() {
  const myContext = useContext(context);
  const [contentMessage, setContentMessage] = useState("");

  const myUniqueId =
    auth.currentUser?.uid === undefined ? "null" : auth.currentUser?.uid;
  const myUniqueIdRecepient =
    myContext?.nameOfRecipient.recipientUid === undefined
      ? "null"
      : myContext?.nameOfRecipient.recipientUid;

  const messageScrollView = useRef<ScrollView | null>(null);
  const [messageConversatation, setMessageConversatation] = useState<
    DocumentData[]
  >([]);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      messageScrollView.current?.scrollToEnd({ animated: true });
    });

    // GET THE DATA FOR THE MESSAGES
    const unSubscribeToMessages = onSnapshot(
      doc(
        storage,
        myUniqueId,
        `${myUniqueIdRecepient}-${myContext?.nameOfRecipient.fName} ${myContext?.nameOfRecipient.lName}`
      ),
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
    const myUniqueIdAndMyYourName = `${myUniqueIdRecepient}-${myContext?.nameOfRecipient.fName} ${myContext?.nameOfRecipient.lName}`;
    const myUniqueIdAndMyName = `${myUniqueId}-${auth.currentUser?.displayName}`;

    // CLEAR TEXT INPUT
    setContentMessage("");
    try {
      await updateDoc(doc(storage, myUniqueId, myUniqueIdAndMyYourName), {
        index: arrayUnion({
          fullName: `${myContext?.nameOfRecipient.fName} ${myContext?.nameOfRecipient.lName}`,
          hisId: myUniqueIdRecepient,
          position: myUniqueId,
          message: contentMessage,
        }),
      });
      await updateDoc(doc(storage, myUniqueIdRecepient, myUniqueIdAndMyName), {
        index: arrayUnion({
          fullName: `${auth.currentUser?.displayName}`,
          hisId: myUniqueId,
          position: myUniqueId,
          message: contentMessage,
        }),
      });
      messageScrollView.current?.scrollToEnd({ animated: true });
    } catch {
      try {
        await setDoc(doc(storage, myUniqueId, myUniqueIdAndMyYourName), {
          myUniqueId: myUniqueIdRecepient,
          index: arrayUnion({
            fullName: `${myContext?.nameOfRecipient.fName} ${myContext?.nameOfRecipient.lName}`,
            hisId: myUniqueIdRecepient,
            position: myUniqueId,
            message: contentMessage,
          }),
        });
        await setDoc(doc(storage, myUniqueIdRecepient, myUniqueIdAndMyName), {
          myUniqueId: myUniqueId,
          index: arrayUnion({
            fullName: `${auth.currentUser?.displayName}`,
            hisId: myUniqueId,
            position: myUniqueId,
            message: contentMessage,
          }),
        });

        messageScrollView.current?.scrollToEnd({ animated: true });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View
      style={{
        backgroundColor: myContext?.isDarkMode
          ? colors.darkMode
          : colors.primary,
        flex: 1,
      }}
    >
      <HStack alignItems="center" paddingX="2" paddingY="1">
        <Button
          rounded="lg"
          backgroundColor={colors.tertiary}
          onPress={() => {
            myContext?.setIsOpenMessage(false);
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
          {`${myContext?.nameOfRecipient.fName} ${myContext?.nameOfRecipient.lName}`}
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
          {messageConversatation.length >= 1 ? (
            // MESSAGE CONVERSATION IF LENGTH IS GREATER THAN 15
            messageConversatation.map((item, index) => {
              return (
                <Box
                  key={index}
                  maxW="80"
                  borderTopRightRadius={item.position === myUniqueId ? 0 : 20}
                  borderTopLeftRadius={item.position === myUniqueId ? 20 : 0}
                  borderBottomRightRadius={20}
                  borderBottomLeftRadius={20}
                  padding="3"
                  marginY="3"
                  marginX="2"
                  backgroundColor={
                    item.position === myUniqueId ? colors.tertiary : "gray.400"
                  }
                  alignSelf={
                    item.position === myUniqueId ? "flex-end" : "flex-start"
                  }
                >
                  <Pressable
                    onLongPress={() => {
                      alert("hello");
                    }}
                  >
                    <Text style={{ color: colors.primary }}>
                      {item.message}
                    </Text>
                  </Pressable>
                </Box>
              );
            })
          ) : (
            // IF THERE IS NO MESSAGE
            <Center>
              <Avatar size="2xl" marginY="2" />
              <Text
                style={{
                  color: !myContext?.isDarkMode
                    ? colors.darkMode
                    : colors.primary,
                  fontSize: fontSize.normal,
                  fontWeight: "bold",
                  marginVertical: 10,
                }}
              >
                {`${myContext?.nameOfRecipient.fName} ${myContext?.nameOfRecipient.lName}`}
              </Text>
            </Center>
          )}
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
          onPress={sendNewMessage}
        >
          <Feather name="send" size={24} color={colors.primary} />
        </Button>
      </HStack>
    </View>
  );
}
