import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from "./profileScreen.styles";
import { HomeStackParamList, HomeStackparamListProps } from "../../../global";
import { useNavigation } from "@react-navigation/native";
import { signout } from "../../functions/authention.firebase";
import { Badge, Box, HStack, Image } from "native-base";
import { colors, fontSize, fullWidth } from "../../styles/global.styles";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import ProfileHeader from "../../components/profileHeader/ProfileHeader";
import EditProfileModal from "../../components/editProfileModal/EditProfileModal";

export default function ProfileScreen() {
  const [isEditProfileModal, setIsEditProfileModal] = useState(false);
  const navigation = useNavigation<HomeStackparamListProps>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.navigationButton}>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => {
                signout()
                  .then((res) => console.log(res))
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
    <View style={styles.container}>
      <ScrollView>
        <ProfileHeader />

        {/* EDIT MODAL PROFILE */}
        <Modal
          animationType="slide"
          visible={isEditProfileModal}
          statusBarTranslucent={true}
        >
          <EditProfileModal setIsEditProfileModal={setIsEditProfileModal} />
        </Modal>
      </ScrollView>
    </View>
  );
}
