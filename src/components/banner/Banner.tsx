import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./banner.styles";

export default function Banner() {
  return (
    <View style={styles.container}>
      <Text style={styles.login}>Papahanta</Text>
    </View>
  );
}
