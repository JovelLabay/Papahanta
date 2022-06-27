import {
  View,
  Text,
  Button,
  StatusBar,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { context } from "../../context/context";
import { colors } from "../../styles/global.styles";
import { auth, photoStorage } from "../../../firebase/firebase.config";
import { onAuthStateChanged, reload, updateProfile, User } from "firebase/auth";
import {
  createAccountDb,
  verifyEmail,
  createFirestoreStorage,
} from "../../functions/authention.firebase";
import styles from "./emailVerification.styles";
import { Formik, validateYupSchema } from "formik";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { genders } from "../../modules/StaticList";
import { AntDesign } from "@expo/vector-icons";
import SetUpForm from "../setupForm/SetUpForm";
import * as yup from "yup";
import {
  NotificationError,
  NotificationSuccess,
} from "../notification/Notification";

const dataValidation = yup.object({
  firstName: yup.string().required("This is required"),
  lastName: yup.string().required("This is required"),
  gender: yup.string().required(),
  availability: yup.string().required(),
  phone: yup.string().required().max(11).min(11),
  country: yup.string().required(),
  municipality_city: yup.string().required(),
});

export default function EmailVerification({
  setIsVerfiedAccunt,
}: {
  setIsVerfiedAccunt: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const UserProfile: any = auth.currentUser;
  const [isSuccess, setIsSuccess] = useState(true);

  const numberTextInput = useRef<null | TextInput>(null);
  const lastNameTextInput = useRef<null | TextInput>(null);
  const [myGender, setMyGender] = useState("Select Indenty");
  const [isAvailable, setIsAvailable] = useState("Select Availability");
  const [userCountry, setUserCountry] = useState("Select Country");

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior="height"
        keyboardVerticalOffset={30}
      >
        <View style={styles.header}>
          <Text style={styles.headerVerficationTitle}>Verfication</Text>
          {!auth.currentUser?.emailVerified && (
            <TouchableOpacity
              style={styles.verificationButton}
              onPress={() => {
                verifyEmail()
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err));
              }}
            >
              <Text style={styles.verificationButtonText}>Get Verified</Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView>
          <Formik
            validationSchema={dataValidation}
            initialValues={{
              firstName: "",
              lastName: "",
              gender: "",
              availability: "",
              phone: "",
              country: "",
              municipality_city: "",
              photoUri:
                "https://firebasestorage.googleapis.com/v0/b/express-app-b8221.appspot.com/o/default%2Ficon.png?alt=media&token=7e429259-6262-4012-ac5b-49a82180e81c",
              about: "",
              theImages: [],
            }}
            onSubmit={(values, actions) => {
              // UPDATE THE DISPLAY NAME
              updateProfile(UserProfile, {
                displayName: `${values.firstName} ${values.lastName}`,
              })
                .then(() => {
                  const myUniqueId =
                    auth.currentUser?.uid !== undefined
                      ? auth.currentUser?.uid
                      : JSON.stringify(Math.random());
                  // CREATE FIRESTORE RECORD
                  createFirestoreStorage(
                    myUniqueId,
                    values.firstName,
                    values.lastName,
                    values.gender,
                    values.phone,
                    values.availability,
                    values.country,
                    values.municipality_city,
                    values.photoUri,
                    values.about,
                    values.theImages
                  )
                    .then(() => {
                      // LASTLY, UPDATE PHOT URL
                      updateProfile(UserProfile, {
                        photoURL: values.photoUri,
                      })
                        .then(() => {
                          setIsSuccess(false);
                          setIsVerfiedAccunt(true);
                        })
                        .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
            }}
          >
            {({
              values,
              handleSubmit,
              handleChange,
              errors,
              touched,
              handleBlur,
            }) => {
              const props = {
                values,
                handleSubmit,
                handleChange,
                numberTextInput,
                lastNameTextInput,
                myGender,
                setMyGender,
                isAvailable,
                setIsAvailable,
                userCountry,
                setUserCountry,
                errors,
                touched,
                handleBlur,
                isSuccess,
              };
              return <SetUpForm {...props} />;
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
