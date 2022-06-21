import { StatusBar, StyleSheet } from "react-native";
import { colors, fontSize } from "../../styles/global.styles";

const styles = StyleSheet.create({
  navigation: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: fontSize.medium,
    fontWeight: "bold",
    marginLeft: 10,
    color: colors.tertiary,
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
