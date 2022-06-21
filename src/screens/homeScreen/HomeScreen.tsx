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
import { auth, storage } from "../../../firebase/firebase.config";
import { Badge, Box, HStack, Image, VStack } from "native-base";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { DarkMode, UsersInfo } from "../../../global";
import { collection, doc, onSnapshot } from "firebase/firestore";

interface Nau {
  id: number;
  name: string;
  imageSource: string;
}

export default function HomeScreen() {
  const myName = auth.currentUser?.displayName === null ? false : true;
  const [isVerifiedAccount, setIsVerfiedAccunt] = useState(myName);

  const myContext = useContext(context);

  const [lista, setLista] = useState([
    {
      id: 0,
      name: "Straigt",
      imageSource:
        "https://images.pexels.com/photos/4775198/pexels-photo-4775198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 1,
      name: "Rebooted",
      imageSource:
        "https://images.pexels.com/photos/4167729/pexels-photo-4167729.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 2,
      name: "Trans",
      imageSource:
        "https://images.pexels.com/photos/4992382/pexels-photo-4992382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ]);

  const [people, setPeople] = useState([]);

  useEffect(() => {
    onSnapshot(collection(storage, "users"), (thePeople) => {
      const PEOPLE: any = [];
      thePeople.forEach((doc) => {
        PEOPLE.unshift({ ...doc.data() });
      });
      setPeople(PEOPLE);
    });
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);
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
        paddingTop: StatusBar.currentHeight,
      }}
    >
      {/* HEADER */}
      <HStack
        alignItems="center"
        justifyContent="space-between"
        backgroundColor={colors.tertiary}
        borderRadius={10}
        marginX={2}
        marginY={2}
      >
        <Image
          source={require("../../../assets/icon.png")}
          alt="Alternate Text"
          size="sm"
          borderRadius={100}
        />
        <Text style={styles.header}>Papahanta</Text>
      </HStack>
      {/* BODY */}
      <View style={styles.body}>
        <FlatList
          style={styles.list}
          data={people}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TheLista item={item} myContext={myContext} />
          )}
          horizontal
          snapToInterval={fullWidth}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      {/* MODAL TO VERFIY YOUR ACCOUNT */}
      <Modal
        visible={!isVerifiedAccount}
        animationType="none"
        statusBarTranslucent={true}
      >
        <EmailVerification setIsVerfiedAccunt={setIsVerfiedAccunt} />
      </Modal>
    </View>
  );
}
interface Yawa {
  item: UsersInfo;
  myContext: DarkMode | null;
}

function TheLista({ item, myContext }: Yawa) {
  return (
    <View
      style={{
        flex: 1,
        width: fullWidth,
      }}
    >
      <View style={styles.viewerContainer}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/4167729/pexels-photo-4167729.jpeg?auto=compress&cs=tinysrgb&w=1600",
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
            <Box
              backgroundColor={
                myContext?.isDarkMode ? colors.lightMode : colors.primary
              }
              paddingY="2"
              paddingX="3"
              borderRadius="lg"
            >
              <Text
                style={{
                  fontSize: fontSize.medium,
                  fontWeight: "bold",
                  color: !myContext?.isDarkMode
                    ? colors.tertiary
                    : colors.primary,
                }}
              >
                {item.firstName}
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
      <Modal visible={false} animationType="slide"></Modal>
    </View>
  );
}
function wait(arg0: number) {
  throw new Error("Function not implemented.");
}
