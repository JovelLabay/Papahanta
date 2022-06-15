import { View, Text, ScrollView } from "react-native";
import React from "react";
import Banner from "../../components/banner/Banner";
import { Login, SignUp } from "../../components/authForm/AuthForm";
import styles from "./signupScreen.styles";

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Banner />
        <SignUp />
      </ScrollView>
    </View>
  );
}
