import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Box,
  Text,
  View,
  Image,
  Center,
  HStack,
  Pressable,
  Icon,
} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import Logo from "../assets/logo.png";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Footer,
  Header,
  GreetingsCard,
  DiagnoseCard,
  PreviousTestsCard,
} from "../components";

const s = require("../style");
export const Home = ({ navigation }) => {
  const result = [
    {
      id: 0,
      disease: "Hello There 1",
      status: 1,
    },
    {
      id: 1,
      disease: "Hello There 2",
      status: 0,
    },
    {
      id: 2,
      disease: "Hello There 3",
      status: 0,
    },
    {
      id: 3,
      disease: "Hello There",
      status: 1,
    },
    {
      id: 4,
      disease: "Hello There",
      status: 1,
    },
    {
      id: 5,
      disease: "Hello There 6",
      status: 1,
    },
    {
      id: 6,
      disease: "Hello There",
      status: 1,
    },
    {
      id: 7,
      disease: "Hello There 8",
      status: 1,
    },
  ];
  useEffect(async () => {
    console.clear();
    const userToken = await AsyncStorage.getItem("userToken");
    if (!userToken || userToken == undefined) {
      alert("Please login or register to continue");
      navigation.navigate("Login");
    }
  }, []);

  return (
    <SafeAreaView style={s.contain}>
      {/* <Header navigation={navigation} title="Home" /> */}

      <View style={s.main9}>
        <GreetingsCard />

        <DiagnoseCard navigation={navigation} />
        <Text mt="5%" color="black" bold fontSize="xl">
          Previous Tests' Results
        </Text>
        <PreviousTestsCard navigation={navigation} result={result} />
      </View>

      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};
