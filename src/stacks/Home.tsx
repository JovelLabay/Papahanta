import { View, Text, Button } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStackparamListProps } from "../../global";
import HomeScreen from "../screens/homeScreen/HomeScreen";
import SearchScreen from "../screens/searchScreen/SearchScreen";
import ProfileScreen from "../screens/profileScreen/ProfileScreen";
import { context } from "../context/context";

import { AntDesign } from "@expo/vector-icons";
import { colors, fontSize } from "../styles/global.styles";
import LovedScreen from "../screens/loved/LovedScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

import * as Navigationbar from "expo-navigation-bar";
import { Platform } from "react-native";
import HomeTab from "./HomeTab";

const TabNavigator = createBottomTabNavigator();

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const getDarkModedata = async () => {
    try {
      const darkModeData = await AsyncStorage.getItem("darkModeState");
      return darkModeData;
    } catch (error) {
      console.log(error);
    }
  };

  const setDarkModeData = async (value: string) => {
    try {
      await AsyncStorage.setItem("darkModeState", value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDarkModedata()
      .then((res) => {
        if (res === null) {
          setDarkModeData(JSON.stringify(false));
        }
        if (res !== null) {
          const response = res === undefined ? "false" : res;
          setIsDarkMode(JSON.parse(response));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    if (isDarkMode) {
      if (Platform.OS === "android") {
        Navigationbar.setBackgroundColorAsync(colors.darkMode);
        Navigationbar.setButtonStyleAsync("light");
      }
    } else {
      if (Platform.OS === "android") {
        Navigationbar.setBackgroundColorAsync(colors.primary);
        Navigationbar.setButtonStyleAsync("dark");
      }
    }
  }, [isDarkMode]);

  return (
    <context.Provider value={{ isDarkMode, setIsDarkMode, setDarkModeData }}>
      <StatusBar style={!isDarkMode ? "dark" : "light"} />
      <TabNavigator.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.tertiary,
          tabBarStyle: {
            height: 60,
            backgroundColor: isDarkMode ? colors.darkMode : colors.primary,
          },
        }}
      >
        <TabNavigator.Screen
          name="Home"
          component={HomeTab}
          options={{
            tabBarIcon: ({ focused, color }) => {
              return (
                <View
                  style={{
                    backgroundColor: focused
                      ? isDarkMode
                        ? colors.tertiary
                        : colors.tertiary
                      : isDarkMode
                      ? colors.lightMode
                      : colors.opccityColor,
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                  }}
                >
                  <AntDesign
                    name="home"
                    size={focused ? 24 : 20}
                    color={color}
                  />
                </View>
              );
            },
          }}
        />
        <TabNavigator.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused, color }) => {
              return (
                <View
                  style={{
                    backgroundColor: focused
                      ? isDarkMode
                        ? colors.tertiary
                        : colors.tertiary
                      : isDarkMode
                      ? colors.lightMode
                      : colors.opccityColor,
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                  }}
                >
                  <AntDesign
                    name="search1"
                    size={focused ? 24 : 20}
                    color={color}
                  />
                </View>
              );
            },
          }}
        />
        <TabNavigator.Screen
          name="Loved"
          component={LovedScreen}
          options={{
            tabBarIcon: ({ focused, color }) => {
              return (
                <View
                  style={{
                    backgroundColor: focused
                      ? isDarkMode
                        ? colors.tertiary
                        : colors.tertiary
                      : isDarkMode
                      ? colors.lightMode
                      : colors.opccityColor,
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                  }}
                >
                  <AntDesign
                    name="hearto"
                    size={focused ? 24 : 20}
                    color={color}
                  />
                </View>
              );
            },
          }}
        />
        <TabNavigator.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused, color }) => {
              return (
                <View
                  style={{
                    backgroundColor: focused
                      ? isDarkMode
                        ? colors.tertiary
                        : colors.tertiary
                      : isDarkMode
                      ? colors.lightMode
                      : colors.opccityColor,
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                  }}
                >
                  <AntDesign
                    name="profile"
                    size={focused ? 24 : 20}
                    color={color}
                  />
                </View>
              );
            },
            headerShown: true,
            headerStyle: {
              backgroundColor: isDarkMode ? colors.darkMode : colors.primary,
            },
          }}
        />
      </TabNavigator.Navigator>
    </context.Provider>
  );
}
