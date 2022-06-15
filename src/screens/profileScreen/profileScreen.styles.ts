import { StatusBar, StyleSheet } from "react-native";
import { colors, fontSize } from "../../styles/global.styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  navigationButton: {
    flexDirection: "row",
  },
  logoutBtn: {
    marginRight: 10,
    backgroundColor: colors.tertiary,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 6,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
