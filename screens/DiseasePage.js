import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Spacer, Text, View, ScrollView } from "native-base";
import {
  Footer,
  Header,
  CenterLogo,
  DiseaseCard,
  DoctorsCard,
} from "../components";
import { authUser, DISEASES_URL } from "../constants";
import axios from "axios";
import { ActivityIndicator } from "react-native";

const s = require("../style");
export const DiseasePage = ({ navigation, route }) => {
  const { disease } = route.params;
  const [result, setResult] = useState({});
  const [user, setUser] = useState({
    id: 0,
    fullname: "",
    email: "",
    gender: "",
    age: "",
  });
  const [loading, setLoading] = useState(true);

  function getPredictionHistory(disease) {
    axios
      .get(`${DISEASES_URL}/${disease}`)
      .then(async (res) => {
        let resp = res.data;
        if (resp.success == "true") {
          setResult(resp.data);
          //   console.log("resp.data", resp.data);
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
    getPredictionHistory(disease);

    // console.log("result", result);
    // console.log("result.doctors", result.doctors);

    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={s.contain}>
      <Header navigation={navigation} title={disease} />

      <View style={s.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <CenterLogo /> */}
          <Text textAlign="center" my="2" bold fontSize="lg">
            {disease}
          </Text>
          {loading && <ActivityIndicator size={"large"} color={"#234e33"} />}
          {!loading && (
            <View>
              <DiseaseCard disease={result} />

              <DoctorsCard disease={result} />
            </View>
          )}
          <Spacer />

          <Spacer />
        </ScrollView>
      </View>

      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};
