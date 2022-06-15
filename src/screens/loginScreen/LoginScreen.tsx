import {
  View,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";

import WelcomeScreen from "../welcomeScreen/WelcomeScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import {
  AuthStackNavigationRoutesProps,
  AuthStackParamList,
  AuthStackParamListProps,
} from "../../../global";
import styles from "./loginScreen.styles";
import Banner from "../../components/banner/Banner";

import { Login } from "../../components/authForm/AuthForm";

export default function LoginScreen() {
  const [welcomeSreenState, setWelcomeScreenState] = useState<
    boolean | undefined
  >();

  const storeData = async (value: string) => {
    try {
      const data = await AsyncStorage.setItem("isRead", value);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("isRead");
      return value;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const read = () => {
      getData()
        .then((res) => {
          if (res === null) {
            storeData(JSON.stringify(false));
            setWelcomeScreenState(false);
          }
          if (res !== null) {
            const lala = res !== undefined ? res : "false";
            setWelcomeScreenState(JSON.parse(lala));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    read();

    return () => {
      read();
    };
  }, [welcomeSreenState]);

  if (welcomeSreenState === undefined) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!welcomeSreenState) {
    return (
      <WelcomeScreen
        setWelcomeScreenState={setWelcomeScreenState}
        storeData={storeData}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Banner />
        <Login />
      </ScrollView>
    </View>
  );
}
