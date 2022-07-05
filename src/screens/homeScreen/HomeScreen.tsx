import {
  View,
  Text,
  Button,
  Modal,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { context } from "../../context/context";
import styles from "./homeScreen.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  colors,
  fontSize,
  fullHeight,
  fullWidth,
} from "../../styles/global.styles";

import EmailVerification from "../../components/emailVerification/EmailVerification";
import {
  auth,
  realtimeDatabase,
  storage,
} from "../../../firebase/firebase.config";
import { Badge, Box, HStack, Image, VStack } from "native-base";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { DarkMode, UsersInfo, UsersInfoList } from "../../../global";
import { collection, doc, DocumentData, onSnapshot } from "firebase/firestore";
import ViewProfile from "../../components/viewProfile/ViewProfile";
import HomeScreenLoading from "../../components/loading/homeScreenLoading/HomeScreenLoading";
import Message from "../../components/message/Message";
import { onValue, ref } from "firebase/database";

export default function HomeScreen() {
  const myContext = useContext(context);

  const myName = auth.currentUser?.displayName === null ? false : true;
  const [isVerifiedAccount, setIsVerfiedAccunt] = useState(myName);

  const [people, setPeople] = useState<DocumentData[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [viewPeople, setViewPeople] = useState(false);
  const [information, setInformation] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    municipality_city: "",
    country: "",
    about: "",
    uuid: "",
  });

  useEffect(() => {
    const starCountRef = ref(realtimeDatabase, "users/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const ar = [];
      for (const item in data) {
        ar.push(data[item]);
      }

      setPeople(ar);
    });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: myContext?.isDarkMode
          ? colors.darkMode
          : colors.primary,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* BODY */}
        <View style={styles.body}>
          {people.length <= 0 ? (
            <HomeScreenLoading />
          ) : (
            <FlatList
              bounces={false}
              style={styles.list}
              data={people}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => {
                const props = {
                  item,
                  myContext,
                  viewPeople,
                  setViewPeople,
                  information,
                  setInformation,
                };
                return <TheLista {...props} />;
              }}
              horizontal
              snapToInterval={fullWidth}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )}
        </View>
        {/* MODAL TO VERFIY YOUR ACCOUNT */}
        <Modal
          visible={!isVerifiedAccount}
          animationType="none"
          statusBarTranslucent={true}
        >
          <EmailVerification setIsVerfiedAccunt={setIsVerfiedAccunt} />
        </Modal>
      </SafeAreaView>
    </View>
  );
}

function TheLista({
  item,
  myContext,
  viewPeople,
  setViewPeople,
  information,
  setInformation,
}: UsersInfoList) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.viewerContainer}>
        <Image
          source={{
            uri: item.photoUri,
          }}
          alt="Alternate Text"
          size="sm"
          borderRadius="xl"
          h="full"
          w="full"
        />
        <View style={styles.choseContainer}>
          {/* NAMES */}
          <View style={styles.actualContainer1}>
            <Box flexDirection="row">
              {/* LOCATION */}
              <Box flexDirection="row" alignItems="center">
                <MaterialCommunityIcons
                  name="city-variant-outline"
                  size={22}
                  color="dodgerblue"
                />
                <Badge colorScheme="blue" borderRadius="full">
                  {item.municipality_city}
                </Badge>
              </Box>
              {/* GENDER */}
              <Box marginLeft={2} flexDirection="row" alignItems="center">
                <FontAwesome name="intersex" size={20} color="orange" />
                <Badge colorScheme="orange" borderRadius="full">
                  {item.gender}
                </Badge>
              </Box>
              {/* AVAILABILITY */}
              <Box marginLeft={2} flexDirection="row" alignItems="center">
                <MaterialIcons name="event-available" size={20} color="green" />
                <Badge colorScheme="green" borderRadius="full">
                  {item.availability}
                </Badge>
              </Box>
            </Box>
            <Box
              backgroundColor={
                myContext?.isDarkMode ? colors.lightMode : colors.primary
              }
              marginY="2"
              paddingY="2"
              paddingX="2"
              borderRadius="full"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                source={require("../../../assets/icon.png")}
                alt="Alternate Text"
                h={8}
                w={8}
                borderRadius={100}
              />
              <Text
                style={{
                  marginHorizontal: 5,
                  fontSize: fontSize.medium,
                  fontWeight: "bold",
                  color: !myContext?.isDarkMode
                    ? colors.tertiary
                    : colors.primary,
                }}
              >
                {`${item.firstName} ${item.lastName}`}
                {item.userId === auth.currentUser?.uid ? (
                  <Text>{" | "}You</Text>
                ) : null}
              </Text>
            </Box>
          </View>
          {/* OPTIONS */}
          <View style={styles.actualContainer2}>
            <TouchableOpacity
              style={{
                backgroundColor: myContext?.isDarkMode
                  ? colors.lightMode
                  : colors.primary,
                marginHorizontal: 10,
                padding: 16,
                borderRadius: 100,
                elevation: 10,
                shadowColor: colors.tertiary,
              }}
            >
              <AntDesign
                name="book"
                size={36}
                color={
                  !myContext?.isDarkMode ? colors.tertiary : colors.primary
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: myContext?.isDarkMode
                  ? colors.lightMode
                  : colors.primary,
                marginHorizontal: 10,
                padding: 16,
                borderRadius: 100,
                elevation: 10,
                shadowColor: colors.tertiary,
              }}
            >
              <AntDesign
                name="hearto"
                size={48}
                color={
                  !myContext?.isDarkMode ? colors.tertiary : colors.primary
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setViewPeople(true);
                setInformation((prev) => {
                  return {
                    ...information,
                    firstName: (prev.firstName = item.firstName),
                    lastName: (prev.lastName = item.lastName),
                    gender: (prev.gender = item.gender),
                    phone: (prev.phone = item.phone),
                    municipality_city: (prev.municipality_city =
                      item.municipality_city),
                    country: (prev.country = item.country),
                    about: (prev.about = item.about),
                    uuid: (prev.uuid = item.userId),
                  };
                });
              }}
              style={{
                backgroundColor: myContext?.isDarkMode
                  ? colors.lightMode
                  : colors.primary,
                marginHorizontal: 10,
                padding: 16,
                borderRadius: 100,
                elevation: 10,
                shadowColor: colors.tertiary,
              }}
            >
              <AntDesign
                name="eyeo"
                size={36}
                color={
                  !myContext?.isDarkMode ? colors.tertiary : colors.primary
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* MODAL VIEW FOR THE USERS */}
      <Modal
        visible={viewPeople}
        animationType="slide"
        statusBarTranslucent={true}
      >
        <View
          style={{
            backgroundColor: myContext?.isDarkMode
              ? colors.darkMode
              : colors.primary,
            flex: 1,
          }}
        >
          <ScrollView>
            <ViewProfile
              setViewPeople={setViewPeople}
              information={information}
              myContext={myContext}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
