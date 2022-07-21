import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Spacer, Text, View, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import Logo from "../assets/logo.png";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Footer, Header, AllPredictions, CenterLogo } from "../components";
import { authUser, PREDICTIONS_URL } from "../constants";
import axios from "axios";
import { ActivityIndicator } from "react-native";

const s = require("../style");
export const DiseasePage = ({ navigation, disease }) => {
  console.log("disease", disease);
  const [result, setResult] = useState({});
  const [user, setUser] = useState({
    id: 0,
    fullname: "",
    email: "",
    gender: "",
    age: "",
  });
  const [loading, setLoading] = useState(true);

  function getPredictionHistory(auser) {
    axios
      .get(`${PREDICTIONS_URL}/history/${auser.id}`)
      .then(async (res) => {
        let resp = res.data;
        console.log("res", res);
        console.log("resp", resp);
        if (resp.success == "true") {
          setResult(resp.data);
          console.log("resp.data", resp.data);
        } else {
        }
      })
      .catch((err) => {
        console.log("err", err.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(async () => {
    setLoading(true);
    let auser = await authUser();
    if (!auser || typeof auser == undefined) {
      alert("Please login or register to continue");
      navigation.navigate("Login");
    }

    setUser(auser);
    getPredictionHistory(auser);

    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={s.contain}>
      <Header navigation={navigation} title={disease} />

      <View style={s.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CenterLogo />
          <Text textAlign="center" mb="2" bold fontSize="lg">
            {disease}
          </Text>
          {loading && <ActivityIndicator size={"large"} color={"#234e33"} />}
          {!loading && (
            <AllPredictions navigation={navigation} result={result} />
          )}
          <Spacer />
          <Spacer />
        </ScrollView>
      </View>

      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};
