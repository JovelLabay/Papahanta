import React from "react";
import { View, Text } from "react-native";

import styles from "./lineSeperator.styles";

export default function LineSeparator() {
  return (
    <View style={styles.container}>
      <View style={styles.left}></View>
      <Text style={styles.or}>OR</Text>
      <View style={styles.right}></View>
    </View>
  );
}
