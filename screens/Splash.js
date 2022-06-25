import React from "react";
import { StyleSheet, Image } from "react-native";
import { Text, Button, View, Box, Center } from "native-base";
import Logo from "../assets/logo.png";
const s = require("../style");
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Splash = ({ navigation }) => {
  useEffect(async () => {
    setTimeout(async () => {
      // await AsyncStorage.setItem("userToken", "123456789");
      await AsyncStorage.removeItem("userToken");
      const userToken = await AsyncStorage.getItem("userToken");
      if (!userToken || userToken == undefined) {
        alert("Please login or register to continue");
        await navigation.navigate("Login");
      } else {
        await navigation.navigate("Home");
      }
    }, 2000);
  }, []);

  return (
    <View backgroundColor="danger.600" style={styles.container}>
      <Box backgroundColor="white" maxWidth="40">
        <Center py="5">
          <Image source={Logo} style={s.logo}></Image>
        </Center>
      </Box>
      <Text color="white" fontSize="3xl">
        iPredict Heart
      </Text>
      <Text color="white" fontSize="md">
        The best heart disease prediction app
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#ffffff",
  },
});
