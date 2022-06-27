import { StatusBar, StyleSheet } from "react-native";
import { colors, fontSize, fullWidth } from "../../styles/global.styles";

const styles = StyleSheet.create({
  header: {
    fontSize: fontSize.medium,
    fontWeight: "bold",
    color: colors.primary,
    marginRight: 10,
  },
  body: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
  },
  mainContainer: {
    marginTop: 10,
    flex: 1,
    width: fullWidth,
  },
  viewerContainer: {
    flex: 1,
    marginHorizontal: 8,
    position: "relative",
    marginBottom: 8,
  },
  choseContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  actualContainer1: {
    flex: 1,
    margin: 10,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    borderBottomWidth: 2,
    borderColor: colors.other,
  },
  actualContainer2: {
    flex: 0.2,
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
