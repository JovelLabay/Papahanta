import { View, Text } from "react-native";
import { Image } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Box, HStack, Badge } from "native-base";
import { colors, fontSize } from "../../styles/global.styles";
import {
  AntDesign,
  MaterialIcons,
  Foundation,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import styles from "./profilerHeader.styles";
import { context } from "../../context/context";
import { auth, storage } from "../../../firebase/firebase.config";
import { color } from "native-base/lib/typescript/theme/styled-system";
import {
  onSnapshot,
  doc,
  addDoc,
  collection,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { UsersInfo } from "../../../global";

export default function ProfileHeader() {
  const myContext = useContext(context);

  const [usersInfo, setUsersInfo] = useState("");
  async function kulira() {
    let yawa;
    if (auth.currentUser?.uid === undefined) {
      yawa = "undefined";
    } else {
      yawa = auth.currentUser?.uid;
    }
    await onSnapshot(doc(storage, "users", yawa), (doc) => {
      setUsersInfo(JSON.stringify(doc.data()));
    });
  }
  useEffect(() => {
    kulira();
  }, []);

  return (
    <Box
      h={270}
      backgroundColor={myContext?.isDarkMode ? colors.darkMode : colors.primary}
      alignItems="center"
      justifyContent="center"
    >
      <Image
        size="xl"
        rounded="full"
        borderWidth={2}
        borderColor={colors.tertiary}
        alt="profile_image"
        source={require("../../../assets/images/welcomeImages/image3.jpg")}
      />
      <Text
        style={{
          fontSize: fontSize.medium,
          fontWeight: "bold",
          color: colors.tertiary,
          marginVertical: 10,
        }}
      >
        {usersInfo === ""
          ? "loading"
          : `${JSON.parse(usersInfo).firstName} ${
              JSON.parse(usersInfo).lastName
            }`}
      </Text>
      <HStack justifyContent="center" flexWrap="wrap" w="full">
        <Box flexDirection="row" alignItems="center" paddingY={2} paddingX={3}>
          <MaterialCommunityIcons
            name="city-variant-outline"
            size={20}
            color="dodgerblue"
          />
          <Badge colorScheme="blue" alignSelf="center" borderRadius="full">
            {usersInfo === ""
              ? "loading"
              : JSON.parse(usersInfo).municipality_city}
          </Badge>
        </Box>
        <Box flexDirection="row" alignItems="center" paddingY={2} paddingX={3}>
          <Ionicons name="location-outline" size={20} color="gray" />
          <Badge colorScheme="trueGray" alignSelf="center" borderRadius="full">
            {usersInfo === "" ? "loading" : JSON.parse(usersInfo).country}
          </Badge>
        </Box>
        <Box flexDirection="row" alignItems="center" paddingY={2} paddingX={3}>
          <Feather name="phone" size={20} color="purple" />
          <Badge colorScheme="purple" alignSelf="center" borderRadius="full">
            {usersInfo === "" ? "loading" : JSON.parse(usersInfo).phone}
          </Badge>
        </Box>
        <Box flexDirection="row" alignItems="center" paddingY={2} paddingX={3}>
          <FontAwesome name="intersex" size={20} color="orange" />
          <Badge colorScheme="orange" alignSelf="center" borderRadius="full">
            {usersInfo === "" ? "loading" : JSON.parse(usersInfo).gender}
          </Badge>
        </Box>
        <Box flexDirection="row" alignItems="center" paddingY={2} paddingX={3}>
          <MaterialIcons name="event-available" size={22} color="green" />
          <Badge colorScheme="success" alignSelf="center" borderRadius="full">
            {usersInfo === "" ? "loading" : JSON.parse(usersInfo).availability}
          </Badge>
        </Box>
      </HStack>
    </Box>
  );
}
