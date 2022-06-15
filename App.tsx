import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

import Index from "./src/layouts/Index";
import { NativeBaseProvider } from "native-base";

import * as Navigationbar from "expo-navigation-bar";
import { colors } from "./src/styles/global.styles";

export default function App() {
  React.useEffect(() => {
    Navigationbar.setBackgroundColorAsync(colors.primary);
    Navigationbar.setButtonStyleAsync("dark");
  }, []);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Index />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
