import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  Modal,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { context } from "../../context/context";
import { colors, fontSize } from "../../styles/global.styles";
import {
  Avatar,
  Badge,
  Button,
  Center,
  HStack,
  Image,
  VStack,
} from "native-base";
import { MessageStackParamListProps } from "../../../global";
import { Entypo, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { auth, storage } from "../../../firebase/firebase.config";
import { onValue, ref, set } from "firebase/database";
import { realtimeDatabase } from "../../../firebase/firebase.config";
import { Swipeable } from "react-native-gesture-handler";
import MessageNew from "./MessageNew";
import styles from "./message.styles";
import { collection, doc, DocumentData, onSnapshot } from "firebase/firestore";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

export default function Message({
  navigation,
}: {
  navigation: MessageStackParamListProps;
}) {
  const myContext = useContext(context);
  const myPhotoUrl =
    auth.currentUser?.photoURL !== null
      ? auth.currentUser?.photoURL
      : "https://firebasestorage.googleapis.com/v0/b/express-app-b8221.appspot.com/o/default%2Ficon.png?alt=media&token=7e429259-6262-4012-ac5b-49a82180e81c";
  const myPersonalUniqueId =
    auth.currentUser?.uid === undefined ? "null" : auth.currentUser?.uid;

  const [messages, setMessages] = useState<DocumentData[]>([]);

  const searchInput = useRef<TextInput | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [messageCounts, setMessageCounts] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(storage, myPersonalUniqueId),
      (thePeople) => {
        const MESSAGES: DocumentData[] = [];
        thePeople.forEach((doc) => {
          MESSAGES.push({ ...doc.data() });
        });
        setMessages(MESSAGES);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: myContext?.isDarkMode
          ? colors.darkMode
          : colors.primary,
        paddingHorizontal: 10,
      }}
    >
      <HStack justifyContent="space-between" alignItems="center" h="16">
        {/* LOGO OR SEARCH INPUT */}
        <HStack alignItems="center" space={2}>
          <Image
            alt="Logo"
            size="xs"
            rounded="full"
            source={{
              uri: myPhotoUrl,
            }}
          />
          <Text
            style={{
              color: !myContext?.isDarkMode ? colors.darkMode : colors.primary,
              fontSize: fontSize.normal,
              fontWeight: "bold",
            }}
          >
            Messages
          </Text>
        </HStack>
        <Button
          size="xs"
          backgroundColor={colors.tertiary}
          onPress={() => {
            setIsSearchOpen(true);
            setTimeout(() => {
              searchInput.current?.focus();
            }, 1000);
          }}
        >
          <Ionicons name="search" size={24} color={colors.primary} />
        </Button>
      </HStack>

      {/* MESSAGE LIST */}
      {messages?.length <= 0 ? (
        <Text>Chat your soul and make love</Text>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onLongPress={async () => {
                  await SheetManager.show("messageOptions");
                }}
                onPress={() => {
                  navigation.navigate("MessageContainer", {
                    item: item.index,
                    recepientUniqueId: item.index[0].hisId,
                    myFullName: item.index[0].fullName,
                  });
                }}
              >
                <HStack
                  space={2}
                  borderRadius={10}
                  marginY={2}
                  paddingY={2}
                  paddingX={2}
                  backgroundColor={
                    myContext?.isDarkMode
                      ? colors.lightMode
                      : colors.opccityColor
                  }
                  borderWidth={2}
                  borderColor={colors.tertiary}
                >
                  {/*NOTIFICATION COUNTS*/}
                  <Badge
                    position="absolute"
                    top="0"
                    right="0"
                    backgroundColor={colors.alert}
                    rounded="full"
                  >
                    {messageCounts}
                  </Badge>
                  <Avatar size="lg" />
                  <VStack justifyContent="center">
                    <Text
                      style={{
                        color: !myContext?.isDarkMode
                          ? colors.darkMode
                          : colors.primary,
                        fontWeight: "bold",
                        fontSize: fontSize.medium,
                      }}
                    >
                      {item.index[0].fullName}
                    </Text>
                    <Text
                      style={{
                        color: !myContext?.isDarkMode
                          ? colors.darkMode
                          : colors.primary,
                      }}
                    >
                      {item.index[0].message}
                    </Text>
                  </VStack>
                </HStack>
              </TouchableOpacity>
            );
          }}
        />
      )}

      {/* MODAL FOR SEARCH */}
      <Modal
        visible={isSearchOpen}
        animationType="slide"
        statusBarTranslucent={false}
      >
        <HStack justifyContent="space-between" alignItems="center">
          <TextInput placeholder="Search" ref={searchInput} />
          <Button onPress={() => setIsSearchOpen(false)}>Close</Button>
        </HStack>
      </Modal>

      {/* ONLONG PRESS FOR MORE MESSAGE OPTION */}
      <ActionSheet
        id="messageOptions"
        animated={true}
        containerStyle={{
          height: 250,
          backgroundColor: myContext?.isDarkMode
            ? colors.lightMode
            : colors.opccityColor,
        }}
      >
        <Center h="16">
          <Text
            style={{
              fontWeight: "bold",
              fontSize: fontSize.medium,
              color: !myContext?.isDarkMode ? colors.darkMode : colors.primary,
            }}
          >
            Message Options
          </Text>
        </Center>
        <VStack marginX="4" space="4">
          <Button backgroundColor="red.500">Delete</Button>
          <Button backgroundColor="green.500">Open</Button>
          <Button
            marginTop="3"
            backgroundColor="yellow.500"
            onPress={async () => {
              await SheetManager.hide("messageOptions");
            }}
          >
            Dismiss
          </Button>
        </VStack>
      </ActionSheet>
    </View>
  );
}
