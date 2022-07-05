import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

import Index from "./src/layouts/Index";
import { NativeBaseProvider } from "native-base";

import "react-native-gesture-handler";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Index />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
