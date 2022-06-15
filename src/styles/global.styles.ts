import { Dimensions } from "react-native";

const colors = {
  primary: "#fff",
  secondary: "#09101D",
  tertiary: "#FF4D67",
  other: "#EEF0F4",
  opccityColor: "#FFEEF0",
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
const fullHeigh = Dimensions.get("screen").height;

export { colors, fontSize, fullWidth, fullHeigh, opacity };
