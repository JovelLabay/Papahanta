import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { storeData, getData } from "../../functions/asyncStorage";

import styles from "./loginScreen.styles";

import WelcomeScreen from "../welcomeScreen/WelcomeScreen";
import Banner from "../../components/banner/Banner";
import { Login } from "../../components/authForm/AuthForm";

export default function LoginScreen() {
  const [welcomeSreenState, setWelcomeScreenState] = useState<
    boolean | undefined
  >();

  useEffect(() => {
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
  }, []);

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
