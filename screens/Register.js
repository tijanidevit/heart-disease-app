import React from "react";
import { View, Image, Alert } from "react-native";
import { Text, Button, FormControl, Input, Icon, Box } from "native-base";
import Logo from "../assets/logo.png";
const s = require("../style");
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios, { AxiosError } from "axios";
import { USER_URL } from "../constants";

export const Register = ({ navigation }) => {
  const [show, setShow] = useState(false);
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
    <SafeAreaView
      style={(s.contain, { paddingVertical: 60, paddingHorizontal: 18 })}
    >
      <Image source={Logo} style={s.logoSm}></Image>
      <Text span color="red.100" fontSize="xl">
        Hi, register
      </Text>
      <Text span color="gray.600" fontSize="md">
        to start your free diagnosis
      </Text>

      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          email: Yup.string().email("Invalid Email").required("Required"),
          password: Yup.string().required("Password is required").min(8),
        })}
        onSubmit={(values, formikActions) => {
          setApiMessage(null);
          setTimeout(() => {
            formikActions.setSubmitting(true);

            axios
              .post(`${USER_URL}/register`, values)
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                setApiMessage(err.toString());
                console.log(err);
              })
              .finally(() => {
                alert("done");

                console.log(`${USER_URL}/register`);
              });

            formikActions.setSubmitting(false);
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

            <FormControl isRequired>
              <FormControl.Label mt="4" fontWeight="extrabold">
                Fullname
              </FormControl.Label>

              <Input
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                onChangeText={props.handleChange("name")}
                onBlur={props.handleBlur("name")}
                value={props.values.name}
                autoFocus
                placeholder="Your Name"
                width="100%"
                onSubmitEditing={() => {
                  // emailInput.focus();
                }}
              />

              {props.touched.name && props.errors.name ? (
                <FormControl.ErrorMessage>
                  {props.errors.name}
                </FormControl.ErrorMessage>
              ) : null}
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label mt="2" fontWeight="extrabold">
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

            <Button
              onPress={props.handleSubmit}
              colorScheme="danger"
              loading={props.isSubmitting}
              disabled={props.isSubmitting}
              mt="3"
            >
              Register
            </Button>
            <Button
              onPress={props.handleReset}
              colorScheme="warning"
              mode="outlined"
              disabled={props.isSubmitting}
              mt="3"
            >
              Reset
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
          navigation.navigate("Login");
        }}
        fontSize="md"
        fontFamily="mono"
      >
        Already have an account? Login
      </Text>
    </SafeAreaView>
  );
};
