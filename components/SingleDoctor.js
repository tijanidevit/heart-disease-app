import React, { useState, useEffect } from "react";
import { Text, Image, View, Center } from "native-base";
import { Linking, Platform, TouchableOpacity } from "react-native";
const s = require("../style");
export const SingleDoctor = ({ doctor }) => {
  const openDialScreen = (numberC) => {
    if (Platform.OS === "ios") {
      numberC = `telprompt:${numberC}`;
    } else {
      numberC = `tel:${numberC}`;
    }
    Linking.openURL(numberC);
  };

  return (
    <View
      size="16"
      width={40}
      mr={2}
      bg="danger.100"
      _text={{
        color: "coolGray.800",
      }}
      height={250}
      p={4}
      borderRadius={5}
    >
      <Center>
        <Image
          source={{
            uri: doctor.image,
          }}
          alt="Alternate Text"
          size="xl"
        />
        <Text textAlign="center" mt="2" bold fontSize="md">
          {doctor.fullname}
        </Text>
        <TouchableOpacity onPress={() => openDialScreen(doctor.phone)}>
          <Text my="1" color="gray.500" ml={2} fontSize="sm">
            {doctor.phone}
          </Text>
        </TouchableOpacity>
        <Text my="1" color="gray.500" ml={2} fontSize="xs">
          {doctor.email}
        </Text>
      </Center>
    </View>
  );
};
