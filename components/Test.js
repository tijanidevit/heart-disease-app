import React, { useState, useEffect } from "react";
import { Text, Box, Icon, Pressable } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
const s = require("../style");
export const Test = ({ navigation, result }) => {
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigate("DiseasePage", { disease: result.keyword });
        navigation.navigate("DiseasePage", { disease: "Endocarditis" });
      }}
    >
      <Box
        borderColor="gray.300"
        borderStyle="solid"
        borderWidth="2"
        bg="gray.100"
        mt="2%"
        borderRadius="10"
        px="2"
        py="1.5"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box bg="gray.50" p="1.5" borderRadius="10">
          <Icon
            as={AntDesign}
            name={result.status == 1 ? "frowno" : "smileo"}
            size="md"
            style={result.status == 1 ? s.textRed : s.textGreen}
          />
        </Box>
        <Text
          style={{ marginLeft: -50, flexWrap: "wrap" }}
          maxW="60%"
          fontSize="sm"
        >
          {result.keyword}
        </Text>
        <Box bg="gray.50" p="1.5" borderRadius="10">
          <Icon as={AntDesign} name="rightcircleo" size="md" color="red" />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
