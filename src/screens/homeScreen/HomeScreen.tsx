import { View, Text, Button } from "react-native";
import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { context } from "../../context/context";
import styles from "./homeScreen.styles";

export default function HomeScreen() {
  const contextUser = useContext(context);

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
}
