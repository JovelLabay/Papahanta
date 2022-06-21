import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { genders } from "../../modules/StaticList";
import { colors, fontSize, fullHeight } from "../../styles/global.styles";
import styles from "./setupForm.styles";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { auth } from "../../../firebase/firebase.config";
import { reload, updateCurrentUser, User } from "firebase/auth";
import { FormikErrors, FormikTouched } from "formik";
import { SetUpFormAnnotationProps } from "../../../global";

export default function SetUpForm({
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
}: SetUpFormAnnotationProps) {
  const [countryLists, setCountryList] = useState([]);
  const [searchValue, setSeachValue] = useState("");
  const m_n = useRef<TextInput | null>(null);

  const controller = new AbortController();

  const fetchCountries = () => {
    axios
      .get("https://disease.sh/v3/covid-19/countries", {
        signal: controller.signal,
      })
      .then((res) => {
        setCountryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCountries();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <View style={styles.form}>
      {/* NAME */}
      <Text style={styles.textForm}>
        First Name <Text>{touched.firstName && errors.firstName}</Text>
      </Text>
      <TextInput
        style={styles.textBoxes}
        placeholderTextColor={colors.secondary}
        placeholder="First Name"
        value={values.firstName}
        onChangeText={handleChange("firstName")}
        onSubmitEditing={() => {
          lastNameTextInput.current?.focus();
        }}
        onBlur={handleBlur("firstName")}
      />
      {/* NAME */}
      <Text style={styles.textForm}>
        Last Name <Text>{touched.lastName && errors.lastName}</Text>
      </Text>
      <TextInput
        ref={lastNameTextInput}
        style={styles.textBoxes}
        placeholderTextColor={colors.secondary}
        placeholder="Last Name"
        value={values.lastName}
        onChangeText={handleChange("lastName")}
        onSubmitEditing={() => {
          numberTextInput.current?.focus();
        }}
        onBlur={handleBlur("lastName")}
      />
      {/* PHONE NUMBER */}
      <Text style={styles.textForm}>
        Phone Number
        <Text>{touched.phone && errors.phone}</Text>
      </Text>
      <TextInput
        ref={numberTextInput}
        keyboardType="number-pad"
        style={styles.textBoxes}
        placeholderTextColor={colors.secondary}
        placeholder="0987***"
        value={values.phone}
        onChangeText={handleChange("phone")}
        onSubmitEditing={async () => {
          await SheetManager.show("gender_sheet");
        }}
        onBlur={handleBlur("phone")}
      />
      {/* GENDER */}
      <Text style={styles.textForm}>
        Sexual Identity <Text>{touched.gender && errors.gender}</Text>
      </Text>
      <TouchableOpacity
        style={styles.textFormOption}
        onPress={async () => {
          await SheetManager.show("gender_sheet");
        }}
      >
        <Text style={styles.textFormName}>{myGender}</Text>
      </TouchableOpacity>
      {/* Availability */}
      <Text style={styles.textForm}>
        Availability <Text>{touched.availability && errors.availability}</Text>
      </Text>
      <TouchableOpacity
        style={styles.textFormOption}
        onPress={async () => {
          await SheetManager.show("availability_sheet");
          m_n.current?.focus();
        }}
      >
        <Text style={styles.textFormName}>{isAvailable}</Text>
      </TouchableOpacity>
      {/* MUNICIPALITY */}
      <Text style={styles.textForm}>
        City or Municipality
        <Text>{touched.municipality_city && errors.municipality_city}</Text>
      </Text>
      <TextInput
        ref={m_n}
        style={styles.textBoxes}
        placeholderTextColor={colors.secondary}
        placeholder="City or Municipality"
        value={values.municipality_city}
        onChangeText={handleChange("municipality_city")}
        onBlur={handleBlur("municipality_city")}
        onSubmitEditing={async () => {
          await SheetManager.show("sheet_country");
        }}
      />
      {/* COUNTRY */}
      <Text style={styles.textForm}>
        Country <Text>{touched.country && errors.country}</Text>
      </Text>
      <TouchableOpacity
        style={styles.textFormOption}
        onPress={async () => {
          await SheetManager.show("sheet_country");
        }}
      >
        <Text style={styles.textFormName}>{userCountry}</Text>
      </TouchableOpacity>
      {/* SAVE */}
      {auth.currentUser?.emailVerified === false ? (
        <Text
          style={{
            fontWeight: "400",
            color: colors.alert,
            fontSize: fontSize.medium,
            textAlign: "center",
          }}
        >
          *Must verfiy first your account first. You may close and open again
          the app if it does nothing
        </Text>
      ) : (
        <>
          {isSuccess && (
            <TouchableOpacity
              style={styles.save}
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text style={styles.verificationButtonText}>Save</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {/* BOTTOM GENDER */}
      <ActionSheet id="gender_sheet" containerStyle={styles.sheetContainer}>
        <Text style={styles.sheetTitle}>Select your Gender</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {genders.map((gender, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.optionContainer}
                onPress={async () => {
                  setMyGender(gender.name);
                  values.gender = gender.name;
                  await SheetManager.hide("gender_sheet");
                  SheetManager.show("availability_sheet");
                }}
              >
                <Image
                  source={
                    gender.name === "Straigt"
                      ? {
                          uri: gender.imageSource,
                        }
                      : gender.name === "Rebooted"
                      ? {
                          uri: gender.imageSource,
                        }
                      : gender.name === "Trans"
                      ? {
                          uri: gender.imageSource,
                        }
                      : gender.name == "Intersex"
                      ? {
                          uri: gender.imageSource,
                        }
                      : gender.name == "Bisexual"
                      ? {
                          uri: gender.imageSource,
                        }
                      : gender.name == "Pansexual"
                      ? {
                          uri: gender.imageSource,
                        }
                      : gender.name == "Nonbinary"
                      ? {
                          uri: gender.imageSource,
                        }
                      : gender.name == "Asexual"
                      ? {
                          uri: gender.imageSource,
                        }
                      : gender.name == "Genderfluid"
                      ? {
                          uri: gender.imageSource,
                        }
                      : gender.name == "Genderqueer"
                      ? {
                          uri: gender.imageSource,
                        }
                      : gender.name == "Lesbian"
                      ? {
                          uri: gender.imageSource,
                        }
                      : {
                          uri: gender.imageSource,
                        }
                  }
                  style={styles.genderImage}
                  resizeMode="cover"
                />
                <Text style={styles.textGenderName}>{gender.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ActionSheet>

      {/* BOTTOM AVAILABILITY */}
      <ActionSheet
        id="availability_sheet"
        containerStyle={styles.sheetContainer}
      >
        <Text style={styles.sheetTitle}>Your Availability</Text>
        <View style={styles.availableContainer}>
          <TouchableOpacity
            style={styles.availableOptionContainer}
            onPress={() => {
              setIsAvailable("Available");
              SheetManager.hide("availability_sheet");
              values.availability = "Available";
            }}
          >
            <AntDesign
              style={styles.availableIcon1}
              name="checkcircleo"
              size={30}
              color={colors.primary}
            />
            <Text>Available</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.availableOptionContainer}
            onPress={() => {
              setIsAvailable("Not Available");
              SheetManager.hide("availability_sheet");
              values.availability = "Not Available";
            }}
          >
            <AntDesign
              style={styles.availableIcon2}
              name="closecircleo"
              size={30}
              color={colors.primary}
            />
            <Text>Not Available</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>

      {/* BOTTOM COUNTRIES */}
      <ActionSheet
        id="sheet_country"
        statusBarTranslucent={false}
        containerStyle={styles.countriesContainer}
      >
        <Text style={styles.sheetTitle}>Your Availability</Text>
        <TextInput
          style={styles.textBoxes}
          placeholder="Search here..."
          value={searchValue}
          onChangeText={(val) => {
            setSeachValue(val);
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {countryLists
            .filter(({ country }: { country: string }) => {
              if (searchValue === "") {
                return country;
              }
              if (country.toLowerCase().includes(searchValue.toLowerCase())) {
                return country;
              }
            })
            .map(({ country }, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.myCountries}
                  onPress={() => {
                    setUserCountry(country);
                    values.country = country;
                    SheetManager.hide("sheet_country");
                  }}
                >
                  <Text>{country}</Text>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </ActionSheet>
    </View>
  );
}
