import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Box,
  Text,
  View,
  Image,
  CheckIcon,
  Select,
  Button,
  FormControl,
  Input,
  Icon,
  ScrollView,
} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import Logo from "../assets/logo.png";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  Foundation,
} from "@expo/vector-icons";
import { Footer, Header } from "../components";
import {
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { authUser, PREDICTIONS_URL } from "../constants";
import axios from "axios";

const s = require("../style");
export const Predict = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    id: 0,
    fullname: "",
    email: "",
    gender: "",
    age: "",
  });
  const [selected, setSelected] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(async () => {
    let auser = await authUser();
    if (!auser || typeof auser == undefined) {
      alert("Please login or register to continue");
      navigation.navigate("Login");
    }
    setUser(auser);

    if (user.age === null || user.gender === null) {
      alert("Please update your age and gender to continue");
      navigation.navigate("Profile");
    }
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={s.contain}>
        <Header navigation={navigation} title="Diagnose" />

        <View style={s.main}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Formik
              initialValues={{
                age: "",
                sex: "",
                cp: "", //Chest Pain
                trestbps: "", //Resting blood pressure
                chol: "", //serum cholesterol
                fbs: "", //fasting blood pressure
                restecg: "", //resting electrocardiographic results
                thalach: "", //maximum heart rate achieved
                exang: "", //exercise induced angina
                oldpeak: "", //ST depression
                slope: "", //slope of the peak exercise
                ca: "", //major vessels
                thal: "", //thalassemia
              }}
              validationSchema={Yup.object({
                age: Yup.number().required("Age is required"),
                sex: Yup.number().required("Please select a gender"),
                cp: Yup.number().required("Please enter cp"),
                trestbps: Yup.number().required("Please enter trestbps"),
                chol: Yup.number().required("Please enter chol"),
                fbs: Yup.number().required("Please enter fbs"),
                restecg: Yup.number().required("Please enter restecg"),
                thalach: Yup.number().required("Please enter thalach"),
                exang: Yup.number().required("Please enter exang"),
                oldpeak: Yup.number().required("Please enter oldpeak"),
                slope: Yup.number().required("Please enter slope"),
                ca: Yup.number().required("Please enter ca"),
                thal: Yup.number().required("Please enter thal"),
              })}
              onSubmit={(values, formikActions) => {
                console.log(values);
                setIsSubmitting(true);
                setTimeout(() => {
                  formikActions.setSubmitting(false);
                }, 5000);

                setIsSubmitting(false);
              }}
            >
              {(props) => (
                <View>
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
                      <Select.Item label="Male" value="1" />
                      <Select.Item label="Female" value="0" />
                    </Select>

                    {props.touched.gender && props.errors.gender ? (
                      <FormControl.ErrorMessage>
                        {props.errors.gender}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>

                  <FormControl>
                    <FormControl.Label mt="2" fontWeight="extrabold">
                      Chest Pain
                    </FormControl.Label>
                    <Input
                      value={props.values.cp}
                      InputLeftElement={
                        <Icon
                          as={<MaterialIcons name="email" />}
                          size={5}
                          ml="2"
                          color="muted.400"
                        />
                      }
                      onChangeText={props.handleChange("cp")}
                      onBlur={props.handleBlur("cp")}
                      placeholder="2"
                      width="100%"
                    />

                    {props.touched.cp && props.errors.cp ? (
                      <FormControl.ErrorMessage>
                        {props.errors.cp}
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
                    {isSubmitting && (
                      <ActivityIndicator color="white" size="small" />
                    )}
                    {!isSubmitting && "Submit"}
                  </Button>
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>

        <Footer navigation={navigation} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
