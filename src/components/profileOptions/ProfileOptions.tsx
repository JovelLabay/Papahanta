import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { LineSeparator2 } from "../lineSeparator/LineSeparator";
import styles from "./profileOptions.styles";
import {
  MaterialIcons,
  Feather,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { Box } from "native-base";
import { context } from "../../context/context";
import { colors, fontSize } from "../../styles/global.styles";

interface ProfileOptions {
  id: number;
  name: string;
}
export default function ProfileOptions({
  setIsEditProfileModal,
}: {
  setIsEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const myContext = useContext(context);
  const profileOptions = [
    { id: 1, name: "Edit Profile" },
    { id: 2, name: "Posts" },
    { id: 3, name: "Friends" },
    { id: 4, name: "Dark Mode" },
  ];

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 20,
        backgroundColor: myContext?.isDarkMode
          ? colors.darkMode
          : colors.primary,
      }}
    >
      <FlatList
        ItemSeparatorComponent={LineSeparator2}
        data={profileOptions}
        keyExtractor={(_, item) => item.toString()}
        renderItem={({ item }) => (
          <ProfileList
            item={item}
            setIsEditProfileModal={setIsEditProfileModal}
          />
        )}
      />
    </View>
  );
}

function ProfileList({
  item,
  setIsEditProfileModal,
}: {
  item: ProfileOptions;
  setIsEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const id = item.id;

  const myContext = useContext(context);

  return (
    <TouchableOpacity
      onPress={() => {
        if (id === 1) setIsEditProfileModal(true);
        if (id === 2) alert(id);
        if (id === 3) alert(id);
        if (id === 4) {
          myContext?.setIsDarkMode(!myContext.isDarkMode);
          myContext?.setDarkModeData(JSON.stringify(!myContext.isDarkMode));
        }
      }}
    >
      <View style={styles.textOptionContainer}>
        <Box
          padding={4}
          backgroundColor={
            id === 1
              ? "amber.200"
              : id === 2
              ? "blue.200"
              : id === 3
              ? "danger.200"
              : "emerald.200"
          }
          rounded="full"
          marginRight={5}
        >
          {id === 1 ? (
            <AntDesign name="edit" size={30} color="black" />
          ) : id === 2 ? (
            <MaterialIcons name="post-add" size={30} color="black" />
          ) : id === 3 ? (
            <Ionicons name="person-outline" size={30} color="black" />
          ) : (
            <Feather
              name={myContext?.isDarkMode ? "sun" : "moon"}
              size={30}
              color="black"
            />
          )}
        </Box>
        <Text
          style={{
            fontSize: fontSize.normal,
            fontWeight: "500",
            color: !myContext?.isDarkMode ? colors.darkMode : colors.primary,
          }}
        >
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
