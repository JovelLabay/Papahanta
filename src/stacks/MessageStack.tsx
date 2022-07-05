import { View, Text } from "react-native";
import React, { useContext } from "react";
import { context } from "../context/context";
import { colors } from "../styles/global.styles";
import { createStackNavigator } from "@react-navigation/stack";
import Message from "../components/message/Message";
import MessageContainer from "../components/message/MessageContainer";
import { CardStyleInterpolators } from "@react-navigation/stack";

import { MessageStackParamListProps } from "../../global";

const MessagingStack = createStackNavigator<MessageStackParamListProps>();

export default function MessageStack() {
  return (
    <MessagingStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "red",
        },
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <MessagingStack.Screen name="MessageList" component={Message} />
      <MessagingStack.Screen
        name="MessageContainer"
        component={MessageContainer}
      />
    </MessagingStack.Navigator>
  );
}
