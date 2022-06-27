import { View, Text } from "react-native";
import React, { useContext } from "react";
import { HStack, Skeleton, VStack } from "native-base";
import { context } from "../../../context/context";
import { colors } from "../../../styles/global.styles";

export default function HomeScreenLoading() {
  const myContext = useContext(context);

  return (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      <Skeleton
        h={"80%"}
        borderRadius={8}
        startColor={
          myContext?.isDarkMode ? colors.lightMode : colors.opccityColor
        }
      />
      <HStack h={"20%"} space={2} justifyContent="center" alignItems="center">
        <Skeleton
          size="20"
          rounded="full"
          startColor={
            myContext?.isDarkMode ? colors.lightMode : colors.opccityColor
          }
        />
        <Skeleton
          size="24"
          rounded="full"
          startColor={
            myContext?.isDarkMode ? colors.lightMode : colors.opccityColor
          }
        />
        <Skeleton
          size="20"
          rounded="full"
          startColor={
            myContext?.isDarkMode ? colors.lightMode : colors.opccityColor
          }
        />
      </HStack>
    </View>
  );
}

export function ViewImageLoading() {
  const myContext = useContext(context);

  return (
    <View>
      <Skeleton
        h={"100%"}
        startColor={
          myContext?.isDarkMode ? colors.lightMode : colors.opccityColor
        }
      />
    </View>
  );
}
