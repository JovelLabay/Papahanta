import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: "blue",
    paddingTop: StatusBar.currentHeight,
  },
});

export { styles };
