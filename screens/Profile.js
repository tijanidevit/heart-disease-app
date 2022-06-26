import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  Box,
  CheckIcon,
  Select,
  Button,
  FormControl,
  Input,
  Icon,
} from "native-base";
import { MaterialIcons, Foundation, AntDesign } from "@expo/vector-icons";
import { Footer, Header, CenterLogo } from "../components";

import { ActivityIndicator } from "react-native";
import { USER_URL } from "../constants";
import axios from "axios";
const s = require("../style");

export const Profile = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState(null);
  const [user, setUser] = useState({
    id: 0,
    fullname: "",
    email: "",
    gender: "",
    age: "",
  });
  useEffect(async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const authUser = JSON.parse(userToken);
    setUser(authUser);
    if (!userToken || userToken == undefined) {
      alert("Please login or register to continue");
      navigation.navigate("Login");
    }
    setLoading(false);
  }, []);

  const [selected, setSelected] = useState(0);

  return (
    <SafeAreaView style={s.contain}>
      <Header navigation={navigation} title="Profile" />

      <View style={s.main} pt="5">
        <CenterLogo />
        <Text textAlign="center" bold fontSize="lg">
          Update Your Profile
        </Text>

        <Formik
          initialValues={{ age: "", gender: "", email: user.email }}
          validationSchema={Yup.object({
            age: Yup.number().required("Age is required"),
            email: Yup.string().required("Email is required"),
            gender: Yup.string().required("Please select a gender"),
          })}
          onSubmit={(values, formikActions) => {
            setLoading(true);
            setApiMessage(null);
            setTimeout(() => {
              axios
                .post(`${USER_URL}/update`, values)
                .then(async (res) => {
                  let resp = res.data;
                  console.log("resp", resp);
                  // if (resp.success == "true") {
                  //   await AsyncStorage.setItem(
                  //     "userToken",
                  //     JSON.stringify(resp.data)
                  //   );
                  // } else {
                  //   setApiMessage(resp.message);
                  // }
                })
                .catch((err) => {
                  setApiMessage(err.toString());
                  console.log(err);
                })
                .finally(() => {
                  setLoading(false);
                  formikActions.setSubmitting(false);
                });
            }, 1);
          }}
        >
          {(props) => (
            <View>
              {apiMessage != null && (
                <Box px="3" bg="danger.600" mt="2" py="2">
                  <Text color="white">{apiMessage}</Text>
                </Box>
              )}
              <FormControl>
                <FormControl.Label mt="7" fontWeight="extrabold">
                  Fullname
                </FormControl.Label>
                <Input
                  isReadOnly
                  value={user.fullname}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="person" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                  width="100%"
                />

                {props.touched.email && props.errors.email ? (
                  <FormControl.ErrorMessage>
                    {props.errors.email}
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>

              <FormControl>
                <FormControl.Label mt="2" fontWeight="extrabold">
                  Email Address
                </FormControl.Label>
                <Input
                  isReadOnly
                  value={user.email}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="email" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                  onChangeText={props.handleChange("email")}
                  onBlur={props.handleBlur("email")}
                  placeholder="Email Address"
                  width="100%"
                />

                {props.touched.email && props.errors.email ? (
                  <FormControl.ErrorMessage>
                    {props.errors.email}
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>

              <FormControl isRequired>
                <FormControl.Label mt="2" fontWeight="bold">
                  Age
                </FormControl.Label>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<AntDesign name="calculator" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                  keyboardType="numeric"
                  onChangeText={props.handleChange("age")}
                  onBlur={props.handleBlur("age")}
                  value={props.values.age || user.age}
                  placeholder="20"
                  width="100%"
                  type="number"
                />

                {props.touched.age && props.errors.age ? (
                  <FormControl.ErrorMessage>
                    {props.errors.age}
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>

              <FormControl isRequired>
                <FormControl.Label mt="2" fontWeight="bold">
                  Gender
                </FormControl.Label>
                <Select
                  InputLeftElement={
                    <Icon
                      as={<Foundation name="torsos-male-female" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                  selectedValue={props.values.gender}
                  onBlur={props.handleBlur("gender")}
                  value={props.values.gender}
                  width="100%"
                  accessibilityLabel="Select Gender"
                  placeholder="Select Gender"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  onValueChange={props.handleChange("gender")}
                >
                  {/* {user.gender !== "" && (
                    <Select.Item label={user.gender} value="user.gender" />
                  )} */}
                  <Select.Item label="Male" value="male" />
                  <Select.Item label="Female" value="femaile" />
                </Select>

                {props.touched.gender && props.errors.gender ? (
                  <FormControl.ErrorMessage>
                    {props.errors.gender}
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>

              <Button
                onPress={props.handleSubmit}
                colorScheme="danger"
                loading={props.isSubmitting}
                disabled={props.isSubmitting}
                mt="3"
              >
                {loading && <ActivityIndicator size="small" color="white" />}
                Submit
              </Button>
            </View>
          )}
        </Formik>
      </View>

      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};
