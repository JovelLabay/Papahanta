import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

import Index from "./src/layouts/Index";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Index />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
