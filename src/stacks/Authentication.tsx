import React from "react";

import { AuthStackParamList } from "../../global";

import { createStackNavigator } from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";

import SignupScreen from "../screens/signupScreen/SignupScreen";
import LoginScreen from "../screens/loginScreen/LoginScreen";

const AuthStack = createStackNavigator<AuthStackParamList>();

export default function Authentication() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}
