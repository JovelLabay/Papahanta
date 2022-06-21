import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useRef, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";

import { LineSeparator } from "../lineSeparator/LineSeparator";
import { NotificationError } from "../notification/Notification";
import { signin, signup } from "../../functions/authention.firebase";
import staticText from "../../modules/static.text.json";

import { AuthStackParamListProps } from "../../../global";

import { colors } from "../../styles/global.styles";
import styles from "./authForm.styles";

// LOGIN ACCOUNT
export function Login() {
  const [isError, setIsError] = useState(false);
  const [isShown, setIsShown] = useState(true);
  const nextToPassword = useRef<TextInput | null>(null);
  const navigation = useNavigation<AuthStackParamListProps>();

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>{staticText.loginTitle}</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          signin(values.email, values.password)
            .then(() => null)
            .catch((err) => {
              setIsError(true);
              actions.resetForm({
                values: {
                  email: values.email,
                  password: "",
                },
              });
              NotificationError(JSON.stringify(err));
            });
        }}
      >
        {({ values, handleSubmit, handleChange }) => {
          return (
            <>
              {/* EMAIL */}
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  marginVertical: 10,
                  backgroundColor: colors.other,
                  borderWidth: isError ? 1 : 0,
                  borderColor: isError ? colors.tertiary : undefined,
                }}
                placeholder="Email Address"
                value={values.email}
                onChangeText={handleChange("email")}
                returnKeyType="go"
                onSubmitEditing={() => nextToPassword.current?.focus()}
                keyboardType="email-address"
              />
              {/* PASSWORD */}
              <Text style={styles.label}>Password</Text>
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  marginVertical: 10,
                  backgroundColor: colors.other,
                  borderWidth: isError ? 1 : 0,
                  borderColor: isError ? colors.tertiary : undefined,
                  flexDirection: "row",
                }}
              >
                <TextInput
                  ref={nextToPassword}
                  secureTextEntry={isShown}
                  placeholder="Password"
                  style={styles.inputText2}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  returnKeyType="go"
                  onSubmitEditing={() => handleSubmit()}
                />
                <TouchableOpacity onPress={() => setIsShown(!isShown)}>
                  {!isShown ? (
                    <Ionicons name="eye-off-outline" size={24} color="black" />
                  ) : (
                    <Ionicons name="eye-outline" size={24} color="black" />
                  )}
                </TouchableOpacity>
              </View>
              {/* FORGOT PASSWORD */}
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              {/* SUBMIT */}
              <TouchableOpacity
                style={styles.loginContainerBtn}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.loginContainerText}>Login</Text>
              </TouchableOpacity>
            </>
          );
        }}
      </Formik>
      {/* CREATE ACCOUNT */}
      <LineSeparator />
      <View style={styles.createAccount}>
        <Text style={styles.authAignUp}>{"Don't have an account? "}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text style={styles.authAignUp2}>Sign Up.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// CREATE ACCOUNT
export function SignUp() {
  const [isError, setIsError] = useState(false);
  const [isShown, setIsShown] = useState(true);
  const nextToPassword = useRef<TextInput | null>(null);
  const nextToPasswordConfirm = useRef<TextInput | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>{staticText.signupTitle}</Text>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={(values, actions) => {
          if (values.password !== values.confirmPassword) {
            actions.resetForm({
              values: {
                email: values.email,
                password: "",
                confirmPassword: "",
              },
            });
            NotificationError("Passwords Mismatch");
          } else if (values.confirmPassword.length <= 5) {
            actions.resetForm({
              values: {
                email: values.email,
                password: "",
                confirmPassword: "",
              },
            });
            NotificationError("Passwords shoule be more than 6 characters");
          } else {
            signup(values.email, values.confirmPassword)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                setIsError(true);
                actions.resetForm({
                  values: {
                    email: values.email,
                    password: "",
                    confirmPassword: "",
                  },
                });
                NotificationError(JSON.stringify(err));
              });
          }
        }}
      >
        {({ values, handleSubmit, handleChange }) => {
          return (
            <>
              {/* EMAIL */}
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  marginVertical: 10,
                  backgroundColor: colors.other,
                  borderWidth: isError ? 1 : 0,
                  borderColor: isError ? colors.tertiary : undefined,
                }}
                placeholder="Email Address"
                value={values.email}
                onChangeText={handleChange("email")}
                returnKeyType="go"
                onSubmitEditing={() => nextToPassword.current?.focus()}
              />
              {/* PASSWORD */}
              <Text style={styles.label}>Password</Text>
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  marginVertical: 10,
                  backgroundColor: colors.other,
                  borderWidth: isError ? 1 : 0,
                  borderColor: isError ? colors.tertiary : undefined,
                  flexDirection: "row",
                }}
              >
                <TextInput
                  ref={nextToPassword}
                  secureTextEntry={isShown}
                  placeholder="Password"
                  style={styles.inputText2}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  returnKeyType="go"
                  onSubmitEditing={() => nextToPasswordConfirm.current?.focus()}
                />
              </View>
              {/* PASSWORD */}
              <Text style={styles.label}>Confirm Password</Text>
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  marginVertical: 10,
                  backgroundColor: colors.other,
                  borderWidth: isError ? 1 : 0,
                  borderColor: isError ? colors.tertiary : undefined,
                  flexDirection: "row",
                }}
              >
                <TextInput
                  ref={nextToPasswordConfirm}
                  secureTextEntry={isShown}
                  placeholder="Confirm Password"
                  style={styles.inputText2}
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  returnKeyType="go"
                  onSubmitEditing={() => handleSubmit()}
                />
                <TouchableOpacity onPress={() => setIsShown(!isShown)}>
                  {!isShown ? (
                    <Ionicons name="eye-off-outline" size={24} color="black" />
                  ) : (
                    <Ionicons name="eye-outline" size={24} color="black" />
                  )}
                </TouchableOpacity>
              </View>
              {/* SUBMIT */}
              <TouchableOpacity
                style={styles.loginContainerBtn}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.loginContainerText}>Create</Text>
              </TouchableOpacity>
            </>
          );
        }}
      </Formik>
    </View>
  );
}
