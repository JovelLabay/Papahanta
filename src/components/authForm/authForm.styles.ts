import { StyleSheet } from "react-native";
import { colors, fontSize } from "../../styles/global.styles";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  loginText: {
    fontSize: fontSize.medium,
    fontWeight: "bold",
    color: colors.secondary,
    marginVertical: 15,
  },
  label: {
    color: colors.secondary,
    fontSize: fontSize.normal,
  },
  inputText2: {
    color: colors.secondary,
    fontSize: fontSize.normal,
    width: "92%",
    marginRight: 5,
  },
  remember: {
    marginVertical: 10,
    flexDirection: "row",
  },
  rememberText: {
    marginLeft: 5,
    fontWeight: "300",
    color: colors.secondary,
    fontSize: fontSize.normal,
  },
  loginContainerBtn: {
    marginVertical: 10,
    backgroundColor: colors.tertiary,
    paddingVertical: 14,
    borderRadius: 10,
  },
  loginContainerText: {
    textAlign: "center",
    fontSize: fontSize.medium,
    fontWeight: "bold",
    color: colors.primary,
  },
  forgotPassword: {
    paddingVertical: 10,
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    fontSize: fontSize.normal,
    fontWeight: "300",
    color: colors.tertiary,
  },
  createAccount: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
  },
  authAignUp: {
    fontSize: fontSize.normal,
    color: colors.secondary,
  },
  authAignUp2: {
    fontSize: fontSize.normal,
    color: colors.tertiary,
  },
});

export default styles;
