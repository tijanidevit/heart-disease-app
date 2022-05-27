import React, { useState } from "react";
import { Text, Center, HStack, Pressable, Icon } from "native-base";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";

const s = require("../style");
export const Footer = ({ navigation }) => {
  const [selected, setSelected] = useState(0);
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };
  return (
    <HStack
      style={s.footer}
      bg="danger.600"
      alignItems="center"
      safeAreaBottom
      shadow={6}
    >
      <Pressable
        opacity={selected === 0 ? 1 : 0.7}
        py="3"
        flex={1}
        onPress={(navigation) => {
          setSelected(0);
          navigateTo("Home");
        }}
      >
        <Center>
          <Icon
            mb="1"
            as={
              <MaterialCommunityIcons
                name={selected === 0 ? "home" : "home-outline"}
              />
            }
            color="white"
            size="md"
          />
          <Text color="white" fontSize="12">
            Home
          </Text>
        </Center>
      </Pressable>
      <Pressable
        opacity={selected === 1 ? 1 : 0.7}
        py="2"
        flex={1}
        onPress={(navigation) => {
          setSelected(1);
          navigateTo("Predict");
        }}
      >
        <Center>
          <Icon
            mb="1"
            as={<Fontisto name="doctor" />}
            color="white"
            size="md"
          />
          <Text color="white" fontSize="12">
            Diagnose
          </Text>
        </Center>
      </Pressable>
      <Pressable
        opacity={selected === 2 ? 1 : 0.6}
        py="2"
        flex={1}
        onPress={() => {
          setSelected(2);
          navigateTo("Predictions");
        }}
      >
        <Center>
          <Icon
            mb="1"
            as={
              <MaterialCommunityIcons
                name={selected === 2 ? "book" : "book-outline"}
              />
            }
            color="white"
            size="md"
          />
          <Text color="white" fontSize="12">
            Predictions
          </Text>
        </Center>
      </Pressable>
      <Pressable
        opacity={selected === 3 ? 1 : 0.7}
        py="2"
        flex={1}
        onPress={() => {
          setSelected(3);
          navigateTo("Profile");
        }}
      >
        <Center>
          <Icon
            mb="1"
            as={
              <MaterialCommunityIcons
                name={selected === 3 ? "account" : "account-outline"}
              />
            }
            color="white"
            size="md"
          />
          <Text color="white" fontSize="12">
            Account
          </Text>
        </Center>
      </Pressable>
    </HStack>
  );
};
