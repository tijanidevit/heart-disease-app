import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "native-base";
import {
  Footer,
  GreetingsCard,
  DiagnoseCard,
  PreviousTestsCard,
} from "../components";
import { ActivityIndicator } from "react-native";

const s = require("../style");
export const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    id: 0,
    fullname: "",
    email: "",
    gender: "",
    age: "",
  });
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
    setLoading(true);
    const userToken = await AsyncStorage.getItem("userToken");
    const authUser = JSON.parse(userToken);
    setUser(authUser);
    if (!userToken || userToken == undefined) {
      alert("Please login or register to continue");
      navigation.navigate("Login");
    }
    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={s.contain}>
      {/* <Header navigation={navigation} title="Home" /> */}

      <View style={s.main9}>
        {loading && <ActivityIndicator size={"large"} color={"#234e33"} />}
        {!loading && (
          <View>
            <GreetingsCard name={user.fullname} />

            <DiagnoseCard navigation={navigation} />
            <Text mt="5%" color="black" bold fontSize="xl">
              Previous Tests' Results
            </Text>
            <PreviousTestsCard navigation={navigation} result={result} />
          </View>
        )}
      </View>

      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};
