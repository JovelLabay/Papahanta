import { View, Text, StatusBar } from "react-native";
import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../screens/homeScreen/HomeScreen";
import PostScreen from "../screens/PostScreen/PostScreen";
import { context } from "../context/context";
import { colors } from "../styles/global.styles";
import Message from "../components/message/Message";
import { HomeTabParamListprops } from "../../global";
import MessageStack from "./MessageStack";
import { FontAwesome5, AntDesign, Ionicons } from "@expo/vector-icons";

const HomeTabScreen = createMaterialTopTabNavigator<HomeTabParamListprops>();

export default function HomeTab() {
  const MyContext = useContext(context);
  return (
    <HomeTabScreen.Navigator
      initialRouteName="HomeScreenHome"
      screenOptions={{
        swipeEnabled: false,
        tabBarIndicator: () => {
          return null;
        },
        tabBarPressColor: colors.opccityColor,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: StatusBar.currentHeight,
          backgroundColor: MyContext?.isDarkMode
            ? colors.darkMode
            : colors.primary,
        },
        tabBarLabelStyle: {
          color: !MyContext?.isDarkMode ? colors.darkMode : colors.primary,
        },
      }}
    >
      <HomeTabScreen.Screen
        name="PostScreenHome"
        component={PostScreen}
        options={{
          tabBarLabel: "Posts",
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="newspaper-outline"
                size={focused ? 20 : 18}
                color={
                  focused
                    ? !MyContext?.isDarkMode
                      ? colors.tertiary
                      : colors.tertiary
                    : !MyContext?.isDarkMode
                    ? colors.secondary
                    : colors.primary
                }
              />
            );
          },
        }}
      />
      <HomeTabScreen.Screen
        name="HomeScreenHome"
        component={HomeScreen}
        options={{
          tabBarLabel: "People",
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="picture"
                size={focused ? 20 : 18}
                color={
                  focused
                    ? !MyContext?.isDarkMode
                      ? colors.tertiary
                      : colors.tertiary
                    : !MyContext?.isDarkMode
                    ? colors.secondary
                    : colors.primary
                }
              />
            );
          },
        }}
      />
      <HomeTabScreen.Screen
        name="MessageScreenHome"
        component={MessageStack}
        options={{
          tabBarLabel: "Message",
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="message1"
                size={focused ? 20 : 18}
                color={
                  focused
                    ? !MyContext?.isDarkMode
                      ? colors.tertiary
                      : colors.tertiary
                    : !MyContext?.isDarkMode
                    ? colors.secondary
                    : colors.primary
                }
              />
            );
          },
        }}
      />
    </HomeTabScreen.Navigator>
  );
}
