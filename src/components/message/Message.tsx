import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { context } from "../../context/context";
import { colors, fontSize } from "../../styles/global.styles";
import { Avatar, Button, HStack, Image, VStack } from "native-base";
import { MessageInterface, MessageStackParamListProps } from "../../../global";
import { Entypo, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { auth } from "../../../firebase/firebase.config";
import { onValue, ref, set } from "firebase/database";
import { realtimeDatabase } from "../../../firebase/firebase.config";

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

  // REALTIME DATABASE FOR MESSAGING
  const yourMessages = () => {
    set(ref(realtimeDatabase, "jovel/" + "nmbnm/"), {
      username: "bnmbnm",
      email: "bnmbnm",
      profile_picture: "bnmbn",
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const [messages, setMessages] = useState<MessageInterface[]>([]);

  useEffect(() => {
    const starCountRef = ref(realtimeDatabase, "jovel/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const ar = [];
      for (const item in data) {
        ar.unshift(data[item]);
      }
      setMessages(ar);
    });
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
        {/* LOGO */}
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
        {/* MESSAGE */}
        <HStack space={2}>
          <Button size="xs" backgroundColor={colors.tertiary}>
            <Entypo name="new-message" size={24} color={colors.primary} />
          </Button>
          <Button size="xs" backgroundColor={colors.tertiary}>
            <Ionicons name="search" size={24} color={colors.primary} />
          </Button>
        </HStack>
      </HStack>

      {/* MESSAGE LIST */}
      <FlatList
        style={{ flex: 1 }}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MessageContainer", {
                  email: item.email,
                  profile_picture: item.profile_picture,
                  username: item.username,
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
                  myContext?.isDarkMode ? colors.lightMode : colors.opccityColor
                }
                borderWidth={2}
                borderColor={colors.tertiary}
              >
                <Avatar size="lg" />
                <VStack justifyContent="center">
                  <Text
                    style={{
                      color: !myContext?.isDarkMode
                        ? colors.darkMode
                        : colors.primary,
                    }}
                  >
                    {item.email}
                  </Text>
                  <Text
                    style={{
                      color: !myContext?.isDarkMode
                        ? colors.darkMode
                        : colors.primary,
                    }}
                  >
                    {item.username}
                  </Text>
                </VStack>
              </HStack>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
