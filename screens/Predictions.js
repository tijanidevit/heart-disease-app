import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Spacer, Text, View, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import Logo from "../assets/logo.png";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Footer, Header, AllPredictions, CenterLogo } from "../components";

const s = require("../style");
export const Predictions = ({ navigation }) => {
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
      disease: "Hello There",
      status: 1,
    },
    {
      id: 6,
      disease: "Hello There",
      status: 1,
    },
    {
      id: 7,
      disease: "Hello There",
      status: 1,
    },
    {
      id: 8,
      disease: "Hello There",
      status: 1,
    },
    {
      id: 9,
      disease: "Hello There",
      status: 1,
    },
    {
      id: 10,
      disease: "Hello There",
      status: 1,
    },
    {
      id: 11,
      disease: "Hello There",
      status: 1,
    },
    {
      id: 12,
      disease: "Hello There",
      status: 1,
    },
    {
      id: 13,
      disease: "Hello There",
      status: 1,
    },
    {
      id: 14,
      disease: "Hello There",
      status: 1,
    },
    {
      id: 15,
      disease: "Hello There",
      status: 1,
    },
    {
      id: 16,
      disease: "Hello There",
      status: 1,
    },
  ];
  useEffect(async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (!userToken || userToken == undefined) {
      alert("Please login or register to continue");
      navigation.navigate("Login");
    }
  }, []);

  return (
    <SafeAreaView style={s.contain}>
      <Header navigation={navigation} title="Previous Predictions" />

      <View style={s.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CenterLogo />
          <Text textAlign="center" mb="2" bold fontSize="lg">
            Previous Predictions
          </Text>
          <AllPredictions navigation={navigation} result={result} />
          <Spacer />
          <Spacer />
        </ScrollView>
      </View>

      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};
