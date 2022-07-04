import React from "react";
import {
  View,
  Image,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, Button, FormControl, Input, Icon, Box } from "native-base";
import Logo from "../assets/logo.png";
const s = require("../style");
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { setAuthUser, USER_URL } from "../constants";
import axios from "axios";

export const Login = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState(null);
  useEffect(async () => {
    await AsyncStorage.removeItem("userToken");
    const userToken = await AsyncStorage.getItem("userToken");
    if (userToken && userToken != undefined) {
      alert("Please login or register to continue");
      await navigation.navigate("Home");
    }
  }, []);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView
        style={(s.contain, { paddingVertical: 90, paddingHorizontal: 18 })}
      >
        <View mt="9" p="5">
          <Image source={Logo} style={s.logoSm}></Image>
          <Text span color="red.100" fontSize="xl">
            Welcome Back
          </Text>
          <Text span color="gray.600" fontSize="md">
            Login to your account
          </Text>
        </View>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string().email("Invalid Email").required("Required"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={(values, formikActions) => {
            setApiMessage(null);
            setIsLoading(true);
            setTimeout(() => {
              formikActions.setSubmitting(true);
              axios
                .post(`${USER_URL}/login`, values)
                .then(async (res) => {
                  let resp = res.data;
                  if (resp.success == "true") {
                    setAuthUser(JSON.stringify(resp.data));
                    await navigation.navigate("Home");
                  } else {
                    setApiMessage(resp.message);
                  }
                })
                .catch((err) => {
                  setApiMessage(err.toString());
                })
                .finally(() => {
                  setIsLoading(false);
                });
              formikActions.setSubmitting(false);
            }, 500);
          }}
        >
          {(props) => (
            <View>
              {apiMessage != null && (
                <Box px="3" bg="danger.600" mt="2" py="2">
                  <Text color="white">{apiMessage}</Text>
                </Box>
              )}

              <FormControl isRequired>
                <FormControl.Label mt="7" fontWeight="extrabold">
                  Email Address
                </FormControl.Label>
                <Input
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
                  value={props.values.email}
                  placeholder="Email Address"
                  width="100%"
                  keyboardType="email-address"
                />

                {props.touched.email && props.errors.email ? (
                  <FormControl.ErrorMessage>
                    {props.errors.email}
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>

              <FormControl isRequired>
                <FormControl.Label mt="2" fontWeight="bold">
                  Password
                </FormControl.Label>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="lock" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                  onChangeText={props.handleChange("password")}
                  onBlur={props.handleBlur("password")}
                  value={props.values.password}
                  placeholder="********"
                  width="100%"
                  type={show ? "text" : "password"}
                  InputRightElement={
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? "visibility" : "visibility-off"}
                        />
                      }
                      size={5}
                      mr="2"
                      color="muted.400"
                      onPress={() => setShow(!show)}
                    />
                  }
                />

                {props.touched.password && props.errors.password ? (
                  <FormControl.ErrorMessage>
                    {props.errors.password}
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>

              <View>
                <Text textAlign="right" color="red.100" mt="2" fontSize="md">
                  Forget Password
                </Text>
              </View>

              <Button
                onPress={props.handleSubmit}
                colorScheme="danger"
                loading={props.isSubmitting}
                disabled={props.isSubmitting}
                mt="3"
              >
                {isLoading && <ActivityIndicator size="small" color="white" />}
                Submit
              </Button>
            </View>
          )}
        </Formik>

        <Text
          style={s.txCenter}
          mt="8"
          color="gray.600"
          colorScheme="danger"
          onPress={() => {
            navigation.navigate("Register");
          }}
          fontSize="md"
          fontFamily="mono"
        >
          Need a new account? Register Here
        </Text>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
