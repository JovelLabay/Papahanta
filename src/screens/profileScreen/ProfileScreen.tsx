import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import styles from "./profileScreen.styles";
import { HomeStackParamList, HomeStackparamListProps } from "../../../global";
import { useNavigation } from "@react-navigation/native";
import { signout } from "../../functions/authention.firebase";
import { Badge, Box, HStack, Image } from "native-base";
import { colors, fontSize, fullWidth } from "../../styles/global.styles";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import ProfileHeader from "../../components/profileHeader/ProfileHeader";
import EditProfileModal from "../../components/editProfileModal/EditProfileModal";
import { auth } from "../../../firebase/firebase.config";
import ProfileOptions from "../../components/profileOptions/ProfileOptions";
import { context } from "../../context/context";
import { color } from "native-base/lib/typescript/theme/styled-system";

export default function ProfileScreen() {
  // DARK MODE
  const myContext = useContext(context);

  const [isEditProfileModal, setIsEditProfileModal] = useState(false);
  const navigation = useNavigation<HomeStackparamListProps>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <View style={styles.navigation}>
            <Image
              size="xs"
              rounded="full"
              borderWidth={3}
              borderColor={colors.tertiary}
              alt="profile_image"
              source={require("../../../assets/icon.png")}
            />
            <Text style={styles.headerTitle}>Profile</Text>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View style={styles.navigation}>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => {
                signout()
                  .then((res) => null)
                  .catch((err) => console.log(err));
              }}
            >
              <MaterialIcons name="logout" size={22} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => setIsEditProfileModal(true)}
            >
              <AntDesign name="edit" size={22} color={colors.primary} />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}
    >
      {/* PROFILE HEADER */}
      <ProfileHeader />
      {/* PROFILE OPTION LISTS */}
      <ProfileOptions setIsEditProfileModal={setIsEditProfileModal} />
      {/* EDIT MODAL PROFILE */}
      <Modal
        animationType="slide"
        visible={isEditProfileModal}
        statusBarTranslucent={true}
      >
        <EditProfileModal setIsEditProfileModal={setIsEditProfileModal} />
      </Modal>
    </View>
  );
}
