import { View, Text, StatusBar } from "react-native";
import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./searchScreen.styles";
import { colors } from "../../styles/global.styles";
import { context } from "../../context/context";

export default function SearchScreen() {
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
