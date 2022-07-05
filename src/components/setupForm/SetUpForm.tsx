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
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";
import axios from "axios";
import { auth, photoStorage } from "../../../firebase/firebase.config";
import { reload, updateCurrentUser, User } from "firebase/auth";
import { FormikErrors, FormikTouched } from "formik";
import { SetUpFormAnnotationProps } from "../../../global";
import { Box, Button, HStack, VStack } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

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
  const [photoUriState, setPhotoUriState] = useState(
    "https://firebasestorage.googleapis.com/v0/b/express-app-b8221.appspot.com/o/default%2Ficon.png?alt=media&token=7e429259-6262-4012-ac5b-49a82180e81c"
  );
  const [loading, setLoading] = useState(0);
  const [searchValue, setSeachValue] = useState("");
  const [isPhotoDone, setIsPhotoDonw] = useState(false);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

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

  const uploadPhoto = async (
    folderName: string,
    nameOfPhoto: string,
    imageNumber: string
  ) => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    //   IF CANCELLED
    console.log(result);

    //   IF PICKED
    if (!result.cancelled) {
      const storageRef = ref(
        photoStorage,
        imageNumber === ""
          ? `${folderName}/${nameOfPhoto}`
          : `${folderName}/${nameOfPhoto}/${imageNumber}`
      );
      const img = await fetch(result.uri);
      const blob = await img.blob();

      // imageNumber === "" ? (values.photoUri = result.uri) : null;
      // imageNumber === "" ? setPhotoUriState(result.uri) : null;

      imageNumber === "image1"
        ? setImage1(result.uri)
        : imageNumber === "image2"
        ? setImage2(result.uri)
        : imageNumber === "image3"
        ? setImage3(result.uri)
        : imageNumber === "image4"
        ? setImage4(result.uri)
        : setPhotoUriState(result.uri);

      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        "state_changed",
        (snap) => {
          const progress = (snap.bytesTransferred / snap.totalBytes) * 100;
          setLoading(progress);
          switch (snap.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (err) => {
          switch (err.code) {
            case "storage/unauthorized":
              console.log("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              console.log("User canceled the upload");
              break;
            case "storage/unknown":
              console.log(
                "Unknown error occurred, inspect error.serverResponse"
              );
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if (imageNumber === "none") {
              values.photoUri = downloadURL;
              setPhotoUriState(downloadURL);
            }
            if (imageNumber === "image1") {
              values.theImages.push(downloadURL);
              setImage1(downloadURL);
              setLoading(0);
            }
            if (imageNumber === "image2") {
              values.theImages.push(downloadURL);
              setImage2(downloadURL);
              setLoading(0);
            }
            if (imageNumber === "image3") {
              values.theImages.push(downloadURL);
              setImage3(downloadURL);
              setLoading(0);
            }
            if (imageNumber === "image4") {
              values.theImages.push(downloadURL);
              setImage4(downloadURL);
              setLoading(0);
            }
          });
        }
      );
    }
  };

  return (
    <View style={styles.form}>
      {!isPhotoDone ? (
        <>
          <Text style={styles.textForm}>Add the best photo that you have</Text>
          {/* LOADING */}
          <View
            style={{
              marginVertical: 10,
              borderRadius: 10,
              zIndex: 5,
              width: "100%",
              height: 10,
              backgroundColor: "gray",
              opacity: 0.3,
            }}
          >
            <View
              style={{
                position: "absolute",
                borderRadius: 10,
                zIndex: 5,
                width: `${Math.round(loading).toString()}%`,
                height: 10,
                backgroundColor: colors.tertiary,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: 5,
            }}
          >
            {/* IMAGE 2 */}
            {values.theImages.length <= 1 || values.theImages.length >= 1 ? (
              <TouchableOpacity
                disabled={image1 !== "" ? true : false}
                onPress={() =>
                  uploadPhoto(
                    "usersPhoto",
                    `${auth.currentUser?.uid}`,
                    "image1"
                  )
                }
                style={{
                  borderWidth: 2,
                  borderStyle: "dashed",
                  height: 300,
                  width: "45%",
                  backgroundColor: colors.opccityColor,
                  borderRadius: 10,
                  marginHorizontal: 5,
                  marginVertical: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {image1 !== "" ? (
                  <Image
                    source={{
                      uri: image1,
                    }}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 10,
                    }}
                  />
                ) : (
                  <Feather
                    name="plus-circle"
                    size={40}
                    color={colors.tertiary}
                  />
                )}
              </TouchableOpacity>
            ) : null}

            {/* IMAGE 2 */}
            {values.theImages.length >= 1 ? (
              <TouchableOpacity
                disabled={image2 !== "" ? true : false}
                onPress={() =>
                  uploadPhoto(
                    "usersPhoto",
                    `${auth.currentUser?.uid}`,
                    "image2"
                  )
                }
                style={{
                  borderWidth: 2,
                  borderStyle: "dashed",
                  height: 300,
                  width: "45%",
                  backgroundColor: colors.opccityColor,
                  borderRadius: 10,
                  marginHorizontal: 5,
                  marginVertical: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {image2 !== "" ? (
                  <Image
                    source={{
                      uri: image2,
                    }}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 10,
                    }}
                  />
                ) : (
                  <Feather
                    name="plus-circle"
                    size={40}
                    color={colors.tertiary}
                  />
                )}
              </TouchableOpacity>
            ) : null}

            {/* IMAGE 3 */}
            {values.theImages.length >= 2 ? (
              <TouchableOpacity
                disabled={image3 !== "" ? true : false}
                onPress={() =>
                  uploadPhoto(
                    "usersPhoto",
                    `${auth.currentUser?.uid}`,
                    "image3"
                  )
                }
                style={{
                  borderWidth: 2,
                  borderStyle: "dashed",
                  height: 300,
                  width: "45%",
                  backgroundColor: colors.opccityColor,
                  borderRadius: 10,
                  marginHorizontal: 5,
                  marginVertical: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {image3 !== "" ? (
                  <Image
                    source={{
                      uri: image3,
                    }}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 10,
                    }}
                  />
                ) : (
                  <Feather
                    name="plus-circle"
                    size={40}
                    color={colors.tertiary}
                  />
                )}
              </TouchableOpacity>
            ) : null}

            {/* IMAGE 4 */}
            {values.theImages.length >= 3 ? (
              <TouchableOpacity
                disabled={image4 !== "" ? true : false}
                onPress={() =>
                  uploadPhoto(
                    "usersPhoto",
                    `${auth.currentUser?.uid}`,
                    "image4"
                  )
                }
                style={{
                  borderWidth: 2,
                  borderStyle: "dashed",
                  height: 300,
                  width: "45%",
                  backgroundColor: colors.opccityColor,
                  borderRadius: 10,
                  marginHorizontal: 5,
                  marginVertical: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {image4 !== "" ? (
                  <Image
                    source={{
                      uri: image4,
                    }}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 10,
                    }}
                  />
                ) : (
                  <Feather
                    name="plus-circle"
                    size={40}
                    color={colors.tertiary}
                  />
                )}
              </TouchableOpacity>
            ) : null}
          </View>

          {/* NEXT */}
          {values.theImages.length === 4 ? (
            <Button
              onPress={() => setIsPhotoDonw(true)}
              marginY="5"
              colorScheme="green"
            >
              Next
            </Button>
          ) : (
            <Text
              style={{
                fontWeight: "400",
                color: colors.alert,
                fontSize: fontSize.medium,
                textAlign: "center",
              }}
            >
              *You must add your best 4 photos here before to proceed.
            </Text>
          )}
        </>
      ) : (
        <>
          {/* PHOTO URL */}
          <Text style={styles.textForm}>Profile Image</Text>
          {/* LOADING */}
          <View
            style={{
              marginVertical: 10,
              borderRadius: 10,
              zIndex: 5,
              width: "100%",
              height: 10,
              backgroundColor: "gray",
              opacity: 0.3,
            }}
          >
            <View
              style={{
                position: "absolute",
                borderRadius: 10,
                zIndex: 5,
                width: `${Math.round(loading).toString()}%`,
                height: 10,
                backgroundColor: colors.tertiary,
              }}
            />
          </View>
          <Box
            justifyContent="center"
            alignItems="center"
            marginBottom={3}
            marginTop={2}
          >
            <Image
              source={{
                uri: photoUriState,
              }}
              style={{
                height: 150,
                width: 150,
                borderRadius: 100,
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: "30%",
                zIndex: 5,
              }}
            >
              {auth.currentUser?.emailVerified === false ? (
                <MaterialIcons
                  name="no-photography"
                  size={24}
                  color={colors.secondary}
                />
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    uploadPhoto(
                      "profileImage",
                      `${auth.currentUser?.uid}`,
                      "none"
                    )
                  }
                >
                  <AntDesign name="edit" size={26} color={colors.secondary} />
                </TouchableOpacity>
              )}
            </View>
          </Box>
          {/* ABOUT */}
          <Text style={styles.textForm}>Describe yourself</Text>
          <TextInput
            multiline={true}
            style={styles.textBoxesAbout}
            placeholderTextColor={colors.secondary}
            placeholder="About self"
            value={values.about}
            onChangeText={handleChange("about")}
          />
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
            Availability{" "}
            <Text>{touched.availability && errors.availability}</Text>
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
              *Must verfiy first your account first. You may close and open
              again the app if it does nothing
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
