import { View, Text } from "react-native";
import React, { useContext } from "react";
import { context } from "../../context/context";
import { colors } from "../../styles/global.styles";
import { Button } from "native-base";
import {
  MessageStackParamListProps,
  MessageStackParamListRouteProps,
} from "../../../global";

export default function MessageContainer({
  route,
  navigation,
}: {
  navigation: MessageStackParamListProps;
  route: MessageStackParamListRouteProps;
}) {
  const myContext = useContext(context);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: myContext?.isDarkMode
          ? colors.darkMode
          : colors.primary,
      }}
    >
      <Text>{JSON.stringify(route.params)}</Text>
      <Button
        onPress={() => {
          navigation.navigate("MessageList");
        }}
      >
        Back
      </Button>
    </View>
  );
}
