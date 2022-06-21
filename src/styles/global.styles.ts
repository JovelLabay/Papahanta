import { Dimensions } from "react-native";

const colors = {
  primary: "#fff",
  secondary: "#09101D",
  tertiary: "#FF4D67",
  other: "#EEF0F4",
  opccityColor: "#FFEEF0",
  darkMode: "#1A1B22",
  lightMode: "#302029",
  alert: "#E4A5A5",
  success: "#ABF399",
};
const fontSize = {
  giant: 40,
  big: 28,
  medium: 18,
  normal: 16,
  small: 14,
};

const opacity = {
  full: 1,
  half: 0.5,
  almost: 0.2,
};

const fullWidth = Dimensions.get("screen").width;
const fullHeight = Dimensions.get("screen").height;

export { colors, fontSize, fullWidth, fullHeight, opacity };
