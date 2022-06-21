import React from "react";
import { View, Text } from "react-native";

import styles from "./lineSeperator.styles";

function LineSeparator() {
  return (
    <View style={styles.container}>
      <View style={styles.left}></View>
      <Text style={styles.or}>OR</Text>
      <View style={styles.right}></View>
    </View>
  );
}

function LineSeparator2() {
  return <View style={styles.container2}></View>;
}

export { LineSeparator, LineSeparator2 };
