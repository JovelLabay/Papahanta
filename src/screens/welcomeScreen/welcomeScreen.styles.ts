import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { colors, fontSize, fullWidth } from "../../styles/global.styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: StatusBar.currentHeight,
  },
  indicators: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginTop: 10,
  },
  mainContainer: {
    flex: 1,
  },
  imageAndDescriptionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 200,
    borderWidth: 5,
    borderColor: colors.tertiary,
    marginBottom: 20,
  },
  description: {
    fontSize: fontSize.big,
    color: colors.tertiary,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 10,
    marginTop: 20,
  },
  //   NEXT
  nextContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  skipTouchable2: {
    width: "90%",
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: colors.tertiary,
  },
  skipText2: {
    textAlign: "center",
    color: colors.primary,
    fontSize: fontSize.medium,
    fontWeight: "bold",
  },

  //   SKIP
  bottomContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  skipTouchable: {
    width: "90%",
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.tertiary,
  },
  skipText: {
    textAlign: "center",
    color: colors.tertiary,
    fontSize: fontSize.medium,
    fontWeight: "bold",
  },
});

export default styles;
