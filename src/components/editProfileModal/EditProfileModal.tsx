import { View, Text, Button } from "react-native";
import React from "react";
import styles from "./editProfileModal.styles";

export default function EditProfileModal({
  setIsEditProfileModal,
}: {
  setIsEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <View style={styles.container}>
      <Text>EditProfileModal</Text>
      <Button title="sdf" onPress={() => setIsEditProfileModal(false)} />
    </View>
  );
}
