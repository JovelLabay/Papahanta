import { View, Text, StatusBar, Button } from "react-native";
import React from "react";

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

const TabNavigator = createBottomTabNavigator();

console.log(auth.currentUser?.displayName);

export default function Home() {
  return (
    <context.Provider value="sdfsd">
      <TabNavigator.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.tertiary,
          tabBarStyle: {
            height: 60,
          },
        }}
      >
        <TabNavigator.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View
                  style={{
                    backgroundColor: focused
                      ? colors.tertiary
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
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View
                  style={{
                    backgroundColor: focused
                      ? colors.tertiary
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
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View
                  style={{
                    backgroundColor: focused
                      ? colors.tertiary
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
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View
                  style={{
                    backgroundColor: focused
                      ? colors.tertiary
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
            headerTitleStyle: {
              color: colors.secondary,
              fontWeight: "bold",
            },
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.opccityColor,
            },
          }}
        />
      </TabNavigator.Navigator>
    </context.Provider>
  );
}
