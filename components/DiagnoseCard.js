import React, { useState, useEffect } from "react";
import { Text, View, Image, Spacer, Box, Icon, Pressable } from "native-base";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const s = require("../style");
export const DiagnoseCard = ({ navigation }) => {
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };
  return (
    <View>
      <Box mt="4" py="6" px="6" minW="100%" bg="red.600" borderRadius="25">
        <TouchableOpacity
          onPress={() => {
            navigateTo("Predict");
          }}
        >
          <Box py="5" px="3" maxW="30%" bg="white" borderRadius="10">
            <Icon
              alignSelf="center"
              as={<MaterialCommunityIcons name="heart" />}
              size="2xl"
              style={{ color: "red" }}
            />
          </Box>
          <Text bold mt="12%" color="white" fontSize="lg">
            Run Diagnosis
          </Text>
        </TouchableOpacity>
      </Box>
    </View>
  );
};
