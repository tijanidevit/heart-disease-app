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
export const Predict = ({ navigation }) => {
  useEffect(async () => {
    console.clear();
    const userToken = await AsyncStorage.getItem("userToken");
    if (!userToken || userToken == undefined) {
      alert("Please login or register to continue");
      navigation.navigate("Login");
    }
  }, []);

  const [selected, setSelected] = useState(0);

  return (
    <SafeAreaView style={s.contain}>
      <Header navigation={navigation} title="Diagnose" />

      <View style={s.main}>
        <GreetingsCard />
      </View>

      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};
