import { View, Text } from "react-native";
import { Image } from "native-base";
import React from "react";
import { Box, HStack, Badge } from "native-base";
import { colors } from "../../styles/global.styles";
import {
  AntDesign,
  MaterialIcons,
  Foundation,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import styles from "./profilerHeader.styles";

export default function ProfileHeader() {
  return (
    <Box
      h={220}
      backgroundColor={colors.opccityColor}
      alignItems="center"
      justifyContent="center"
    >
      <Image
        size="xl"
        rounded="full"
        borderWidth={3}
        borderColor={colors.tertiary}
        alt="profile_image"
        source={require("../../../assets/images/welcomeImages/image2.jpg")}
      />
      <Text style={styles.name}>Donald Trump</Text>
      <HStack justifyContent="space-evenly" w="full">
        <Box flexDirection="row" alignItems="center" paddingY={1} paddingX={2}>
          <Feather name="star" size={20} color="red" />
          <Badge colorScheme="purple" alignSelf="center">
            6/10
          </Badge>
        </Box>
        <Box flexDirection="row" alignItems="center" paddingY={1} paddingX={2}>
          <FontAwesome name="transgender-alt" size={20} color="red" />
          <Badge colorScheme="orange" alignSelf="center">
            Pansexual
          </Badge>
        </Box>
        <Box flexDirection="row" alignItems="center" paddingY={1} paddingX={2}>
          <Feather name="thumbs-up" size={20} color="red" />
          <Badge colorScheme="success" alignSelf="center">
            3
          </Badge>
        </Box>
      </HStack>
    </Box>
  );
}
