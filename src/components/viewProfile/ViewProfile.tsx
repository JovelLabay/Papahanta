import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { auth, photoStorage } from "../../../firebase/firebase.config";
import { Badge, Box, Button, HStack, Image, VStack } from "native-base";
import { AntDesign, FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import { colors, fontSize, fullWidth } from "../../styles/global.styles";
import PagerView from "react-native-pager-view";
import {
  DocumentData,
  onSnapshot,
  collection,
  getDoc,
  doc,
} from "firebase/firestore";
import { storage } from "../../../firebase/firebase.config";
import styles from "./viewProfile.styles";
import { DarkMode, HomeTabParamListprops } from "../../../global";
import { ViewImageLoading } from "../loading/homeScreenLoading/HomeScreenLoading";
import { useNavigation } from "@react-navigation/native";

export default function ViewProfile({
  setViewPeople,
  information,
  myContext,
}: {
  setViewPeople: React.Dispatch<React.SetStateAction<boolean>>;
  information: {
    firstName: string;
    lastName: string;
    gender: string;
    phone: string;
    municipality_city: string;
    country: string;
    about: string;
    uuid: string;
  };
  myContext: DarkMode | null;
}) {
  const navigation = useNavigation<HomeTabParamListprops>();
  const [sample, setSample] = useState<string[]>([]);

  async function yawa() {
    const docRef = doc(storage, "displayImages", information.uuid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setSample(docSnap.data().theImages);
    } else {
      console.log("No such document!");
    }
  }

  useEffect(() => {
    yawa();
  }, []);

  return (
    <View>
      {/* IMAGES */}
      <Box h={400}>
        <Button
          onPress={() => setViewPeople(false)}
          position="absolute"
          top={12}
          left={5}
          zIndex={5}
          variant="solid"
          backgroundColor={colors.tertiary}
          borderRadius="lg"
        >
          <AntDesign name="closecircleo" size={24} color={colors.primary} />
        </Button>

        <PagerView style={{ height: "100%" }}>
          {sample.length <= 0 ? (
            <ViewImageLoading />
          ) : (
            sample.map((list, index) => {
              return (
                <Image
                  key={index}
                  h="full"
                  width={fullWidth}
                  resizeMode="cover"
                  alt="users_images_display"
                  source={{
                    uri:
                      list === undefined
                        ? "https://firebasestorage.googleapis.com/v0/b/express-app-b8221.appspot.com/o/default%2Ficon.png?alt=media&token=7e429259-6262-4012-ac5b-49a82180e81c"
                        : list,
                  }}
                />
              );
            })
          )}
        </PagerView>
      </Box>

      {/* INFORMATION */}
      <View style={{ flex: 1 }}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          paddingX={4}
          paddingY={7}
        >
          <Box>
            <Text style={styles.header}>
              {`${information.firstName} ${information.lastName}`}
            </Text>
            <HStack space={5} width={fullWidth - 100} flexWrap="wrap">
              <Box marginY={2} flexDirection="row" alignItems="center">
                <Feather name="phone" size={20} color="purple" />
                <Badge colorScheme="purple" borderRadius="full">
                  {information.phone}
                </Badge>
              </Box>
              <Box marginY={2} flexDirection="row" alignItems="center">
                <Ionicons name="location-outline" size={20} color="gray" />
                <Badge colorScheme="gray" borderRadius="full">
                  {information.country}
                </Badge>
              </Box>
              <Box marginY={2} flexDirection="row" alignItems="center">
                <FontAwesome name="intersex" size={20} color="orange" />
                <Badge colorScheme="orange" borderRadius="full">
                  {information.gender}
                </Badge>
              </Box>
            </HStack>
          </Box>

          {information.uuid === auth.currentUser?.uid ? null : (
            <Button
              variant="solid"
              colorScheme="green"
              borderRadius={100}
              onPress={() => {
                setViewPeople(false);
                navigation.navigate("MessageScreenHome");
              }}
            >
              <AntDesign name="message1" size={30} color={colors.primary} />
            </Button>
          )}
        </HStack>

        {/* PERSONAL DESCRIPTION */}
        <VStack paddingX={4}>
          {/* ABOUT */}
          <Box>
            <Text style={styles.header2}>About</Text>
            <Box>
              <Text
                style={{
                  fontSize: fontSize.normal,
                  fontWeight: "400",
                  color: !myContext?.isDarkMode
                    ? colors.secondary
                    : colors.primary,
                }}
              >
                {information.about}
              </Text>
            </Box>
          </Box>

          <Box marginY={8}>
            {/* PERSONAL INTEREST */}
            <Text style={styles.header3}>Interest</Text>
            <HStack space={3} w={"100%"} flexWrap="wrap">
              <Text style={styles.banners}>Killing</Text>
              <Text style={styles.banners}>Gaming</Text>
              <Text style={styles.banners}>Kissing</Text>
              <Text style={styles.banners}>Dating</Text>
            </HStack>
          </Box>
        </VStack>
      </View>
    </View>
  );
}
