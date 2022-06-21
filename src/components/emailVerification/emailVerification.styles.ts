import { StyleSheet, StatusBar } from "react-native";
import { colors, fontSize } from "../../styles/global.styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    height: 60,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerVerficationTitle: {
    color: colors.secondary,
    fontSize: fontSize.medium,
    fontWeight: "bold",
  },
  verificationButton: {
    backgroundColor: colors.tertiary,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  verificationButtonText: {
    fontSize: fontSize.normal,
    color: colors.primary,
    fontWeight: "500",
  },
});

export default styles;
