import { StyleSheet } from "react-native";
import { colors, fontSize } from "../../styles/global.styles";

const styles = StyleSheet.create({
  cancelBtn: {
    fontSize: fontSize.small,
    color: colors.primary,
  },
  // NEW MESSAGE COMPONENT
  messageScrollConversationContainer: {
    flex: 1,
    marginTop: 2,
  },
});

export default styles;
