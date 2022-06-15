import { StyleSheet } from "react-native";
import { colors, fontSize } from "../../styles/global.styles";

const styles = StyleSheet.create({
  container: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    marginTop: 30,
    fontSize: fontSize.giant,
    color: colors.tertiary,
    fontWeight: "bold",
  },
});

export default styles;
