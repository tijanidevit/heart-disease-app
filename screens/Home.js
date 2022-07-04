import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "native-base";
import {
  Footer,
  GreetingsCard,
  DiagnoseCard,
  PreviousTestsCard,
} from "../components";
import { ActivityIndicator } from "react-native";
import { authUser, PREDICTIONS_URL } from "../constants";
import axios from "axios";

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
  let result = [];
  useEffect(async () => {
    setLoading(true);
    let auser = await authUser();
    if (!auser || typeof auser == undefined) {
      alert("Please login or register to continue");
      navigation.navigate("Login");
    }

    setUser(auser);

    axios
      .get(`${PREDICTIONS_URL}/history/${user.id}`)
      .then(async (res) => {
        let resp = res.data;
        console.log("res", res);
        console.log("resp", resp);
        if (resp.success == "true") {
          result = resp.data;
        } else {
        }
      })
      .catch((err) => {
        console.log("err", err.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={s.contain}>
      {/* <Header navigation={navigation} title="Home" /> */}

      <View style={s.main9}>
        <View>
          <GreetingsCard name={user.fullname} />

          <DiagnoseCard navigation={navigation} />
          <Text mt="5%" color="black" bold fontSize="xl">
            Previous Tests' Results
          </Text>
          {loading && <ActivityIndicator size={"large"} color={"#234e33"} />}
          {!loading && (
            <PreviousTestsCard navigation={navigation} result={result} />
          )}
        </View>
      </View>

      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};
