import { View, Text, StatusBar } from "react-native";
import React, { useContext } from "react";
import styles from "./lovedScreen.styles";
import { context } from "../../context/context";
import { colors } from "../../styles/global.styles";

export default function LovedScreen() {
  const myContext = useContext(context);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: myContext?.isDarkMode
          ? colors.darkMode
          : colors.primary,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <Text>HomeScreen</Text>
    </View>
  );
}
