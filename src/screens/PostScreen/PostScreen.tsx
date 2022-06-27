import { View, Text, StatusBar } from "react-native";
import React, { useContext } from "react";
import { context } from "../../context/context";
import { colors } from "../../styles/global.styles";

export default function PostScreen() {
  const MyContext = useContext(context);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: MyContext?.isDarkMode
          ? colors.darkMode
          : colors.primary,
      }}
    >
      <Text>PostScreen</Text>
    </View>
  );
}
