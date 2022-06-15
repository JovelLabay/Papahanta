import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { WelcomeScreenProps } from "../../../global";
import { colors } from "../../styles/global.styles";
import styles from "./welcomeScreen.styles";

export default function WelcomeScreen({
  setWelcomeScreenState,
  storeData,
}: WelcomeScreenProps) {
  const [welcomeImages, setWelcomeImages] = useState({
    firstImage: {
      description: "Find people who match with you",
      state: true,
    },
    secondImage: {
      description: "Easily sent a message to the people you like",
      state: false,
    },
    thirdImage: {
      description: "Don't wait anymore, find out your soul mate now",
      state: false,
    },
  });

  // NEXT WELCOME COMPONENT FUNCTION
  function next2() {
    setWelcomeImages((prevValues) => {
      return {
        ...welcomeImages,
        theFirstImage: (prevValues.firstImage.state = false),
        theSecondImage: (prevValues.secondImage.state = true),
      };
    });
  }
  function next3() {
    setWelcomeImages((prevValues) => {
      return {
        ...welcomeImages,
        theSecondImage: (prevValues.secondImage.state = false),
        theThirdImage: (prevValues.thirdImage.state = true),
      };
    });
  }

  const one = !welcomeImages.firstImage.state ? colors.other : colors.tertiary;
  const two = !welcomeImages.secondImage.state ? colors.other : colors.tertiary;
  const three = !welcomeImages.thirdImage.state
    ? colors.other
    : colors.tertiary;

  return (
    <View style={styles.container}>
      {/* WELCOME SCREEN */}
      <View style={styles.indicators}>
        <View
          style={{
            height: 2,
            backgroundColor: one,
            width: 100,
          }}
        />
        <View
          style={{
            height: 2,
            backgroundColor: two,
            width: 100,
          }}
        />
        <View
          style={{
            height: 2,
            backgroundColor: three,
            width: 100,
          }}
        />
      </View>
      <View style={styles.mainContainer}>
        {welcomeImages.firstImage.state ? (
          <>
            <View style={styles.imageAndDescriptionContainer}>
              <Image
                fadeDuration={1000}
                resizeMode="cover"
                style={styles.image}
                source={require("../../../assets/images/welcomeImages/image1.jpg")}
              />
              <Text style={styles.description}>
                {welcomeImages.firstImage.description}
              </Text>
            </View>
            <View style={styles.nextContainer}>
              <TouchableOpacity style={styles.skipTouchable2} onPress={next2}>
                <Text style={styles.skipText2}>Next</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : welcomeImages.secondImage.state ? (
          <>
            <View style={styles.imageAndDescriptionContainer}>
              <Image
                fadeDuration={1000}
                resizeMode="cover"
                style={styles.image}
                source={require("../../../assets/images/welcomeImages/image2.jpg")}
              />
              <Text style={styles.description}>
                {welcomeImages.secondImage.description}
              </Text>
            </View>
            <View style={styles.nextContainer}>
              <TouchableOpacity style={styles.skipTouchable2} onPress={next3}>
                <Text style={styles.skipText2}>Next</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.imageAndDescriptionContainer}>
              <Image
                fadeDuration={1000}
                resizeMode="cover"
                style={styles.image}
                source={require("../../../assets/images/welcomeImages/image3.jpg")}
              />
              <Text style={styles.description}>
                {welcomeImages.thirdImage.description}
              </Text>
            </View>
          </>
        )}
      </View>
      {/* BUTTON TO NEXT TO LOGIN SCREEN */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.skipTouchable}
          onPress={() => {
            setWelcomeScreenState(true);
            storeData(JSON.stringify(true));
          }}
        >
          <Text style={styles.skipText}>
            {!welcomeImages.thirdImage.state ? "Skip" : "Create your Account"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
