import { StyleSheet } from "react-native";
import { colors, opacity } from "../../styles/global.styles";

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  left: {
    borderBottomWidth: 1,
    width: "40%",
    borderBottomColor: colors.other,
  },
  right: {
    borderBottomWidth: 1,
    width: "40%",
    borderBottomColor: colors.other,
  },
  or: {
    marginHorizontal: 12,
    fontWeight: "300",
  },
  // LINE SEPARATOR 2
  container2: {
    height: 2,
    backgroundColor: colors.other,
    marginVertical: 10,
    opacity: opacity.half,
  },
});

export default styles;
