import React, { useState, useEffect } from "react";
import { Text, View, Image, Spacer, Box, Icon } from "native-base";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import Logo from "../assets/logo.png";

const s = require("../style");
export const GreetingsCard = ({ navigation }) => {
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const [time, setTime] = useState("Morning");
  useEffect(() => {
    var hours = new Date().getHours(); //Current Hours

    if (hours < 12) {
      setTime("Morning");
    } else if (hours >= 12 && hours <= 14) {
      setTime("Afternoon");
    } else {
      setTime("Evening");
    }
  }, []);
  return (
    <View>
      <Box mt="8">
        <Image source={Logo} size="sm" alt="User" />
        <Text fontSize="xl" bold color="black">
          Good {time}, Ayo
        </Text>
      </Box>
    </View>
  );
};
