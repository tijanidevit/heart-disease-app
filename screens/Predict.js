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
import InputHelper from "../components/InputHelper";

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
  const [pageLoaded, setPageLoaded] = useState(false);

  const [apiMessage, setApiMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(async () => {
    setPageLoaded(false);
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

    setPageLoaded(true);
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log("djdkjjkdjk");
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={s.contain}>
        <Header navigation={navigation} title="Diagnose" />

        <View style={s.main}>
          {!pageLoaded && <ActivityIndicator color="red" size="large" />}
          {pageLoaded && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Formik
                // enableReinitialize
                initialValues={{
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
                  setLoading(true);
                  setApiMessage(null);
                  setSuccessMessage(null);
                  setTimeout(() => {
                    axios
                      .post(`${PREDICTIONS_URL}/${user.id}`, values)
                      .then(async (res) => {
                        let resp = res.data;
                        console.log("resp", resp);
                        if (resp.success == "true") {
                          await AsyncStorage.setItem(
                            "userToken",
                            JSON.stringify(resp.data)
                          );
                          setSuccessMessage(resp.message);
                        } else {
                          setApiMessage(resp.message);
                        }
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
                    <FormControl isRequired>
                      <FormControl.Label mt="2" fontWeight="extrabold">
                        Chest Pain
                      </FormControl.Label>
                      <Input
                        keyboardType="numeric"
                        value={props.values.cp}
                        InputLeftElement={
                          <Icon
                            as={<MaterialIcons name="list" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                          />
                        }
                        onChangeText={props.handleChange("cp")}
                        onBlur={props.handleBlur("cp")}
                        placeholder="2"
                        width="100%"
                        type="number"
                      />

                      {props.touched.cp && props.errors.cp ? (
                        <InputHelper text={props.errors.cp} />
                      ) : null}
                    </FormControl>

                    <FormControl isRequired>
                      <FormControl.Label mt="2" fontWeight="extrabold">
                        Resting Blood Pressure
                      </FormControl.Label>
                      <Input
                        keyboardType="numeric"
                        value={props.values.trestbps}
                        InputLeftElement={
                          <Icon
                            as={<MaterialIcons name="list" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                          />
                        }
                        onChangeText={props.handleChange("trestbps")}
                        onBlur={props.handleBlur("trestbps")}
                        placeholder="160"
                        width="100%"
                        type="number"
                      />

                      {props.touched.trestbps && props.errors.trestbps ? (
                        <InputHelper text={props.errors.trestbps} />
                      ) : null}
                    </FormControl>

                    <FormControl isRequired>
                      <FormControl.Label mt="2" fontWeight="extrabold">
                        Serum Cholesterol
                      </FormControl.Label>
                      <Input
                        keyboardType="numeric"
                        value={props.values.chol}
                        InputLeftElement={
                          <Icon
                            as={<MaterialIcons name="list" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                          />
                        }
                        onChangeText={props.handleChange("chol")}
                        onBlur={props.handleBlur("chol")}
                        placeholder="286"
                        width="100%"
                        type="number"
                      />

                      {props.touched.chol && props.errors.chol ? (
                        <InputHelper text={props.errors.chol} />
                      ) : null}
                    </FormControl>

                    <FormControl isRequired>
                      <FormControl.Label mt="2" fontWeight="extrabold">
                        Fasting Blood Pressure
                      </FormControl.Label>
                      <Input
                        keyboardType="numeric"
                        value={props.values.fbs}
                        InputLeftElement={
                          <Icon
                            as={<MaterialIcons name="list" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                          />
                        }
                        onChangeText={props.handleChange("fbs")}
                        onBlur={props.handleBlur("fbs")}
                        placeholder="0"
                        width="100%"
                        type="number"
                      />

                      {props.touched.fbs && props.errors.fbs ? (
                        <InputHelper text={props.errors.fbs} />
                      ) : null}
                    </FormControl>

                    <FormControl isRequired>
                      <FormControl.Label mt="2" fontWeight="extrabold">
                        Resting Electrocardiographic Results
                      </FormControl.Label>
                      <Input
                        keyboardType="numeric"
                        value={props.values.restecg}
                        InputLeftElement={
                          <Icon
                            as={<MaterialIcons name="list" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                          />
                        }
                        onChangeText={props.handleChange("restecg")}
                        onBlur={props.handleBlur("restecg")}
                        placeholder="2"
                        width="100%"
                        type="number"
                      />

                      {props.touched.restecg && props.errors.restecg ? (
                        <InputHelper text={props.errors.restecg} />
                      ) : null}
                    </FormControl>

                    <FormControl isRequired>
                      <FormControl.Label mt="2" fontWeight="extrabold">
                        Maximum heart rate achieved
                      </FormControl.Label>
                      <Input
                        keyboardType="numeric"
                        value={props.values.thalach}
                        InputLeftElement={
                          <Icon
                            as={<MaterialIcons name="list" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                          />
                        }
                        onChangeText={props.handleChange("thalach")}
                        onBlur={props.handleBlur("thalach")}
                        placeholder="108"
                        width="100%"
                        type="number"
                      />

                      {props.touched.thalach && props.errors.thalach ? (
                        <InputHelper text={props.errors.thalach} />
                      ) : null}
                    </FormControl>

                    <FormControl isRequired>
                      <FormControl.Label mt="2" fontWeight="extrabold">
                        Exercise induced angina
                      </FormControl.Label>
                      <Input
                        keyboardType="numeric"
                        value={props.values.exang}
                        InputLeftElement={
                          <Icon
                            as={<MaterialIcons name="list" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                          />
                        }
                        onChangeText={props.handleChange("exang")}
                        onBlur={props.handleBlur("exang")}
                        placeholder="1"
                        width="100%"
                        type="number"
                      />

                      {props.touched.exang && props.errors.exang ? (
                        <InputHelper text={props.errors.exang} />
                      ) : null}
                    </FormControl>

                    <FormControl isRequired>
                      <FormControl.Label mt="2" fontWeight="extrabold">
                        ST depression
                      </FormControl.Label>
                      <Input
                        keyboardType="numeric"
                        value={props.values.oldpeak}
                        InputLeftElement={
                          <Icon
                            as={<MaterialIcons name="list" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                          />
                        }
                        onChangeText={props.handleChange("oldpeak")}
                        onBlur={props.handleBlur("oldpeak")}
                        placeholder="2"
                        width="100%"
                        type="number"
                      />

                      {props.touched.oldpeak && props.errors.oldpeak ? (
                        <InputHelper text={props.errors.oldpeak} />
                      ) : null}
                    </FormControl>

                    <FormControl isRequired>
                      <FormControl.Label mt="2" fontWeight="extrabold">
                        Slope of the peak exercise
                      </FormControl.Label>
                      <Input
                        keyboardType="numeric"
                        value={props.values.slope}
                        InputLeftElement={
                          <Icon
                            as={<MaterialIcons name="list" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                          />
                        }
                        onChangeText={props.handleChange("slope")}
                        onBlur={props.handleBlur("slope")}
                        placeholder="2"
                        width="100%"
                        type="number"
                      />

                      {props.touched.slope && props.errors.slope ? (
                        <InputHelper text={props.errors.slope} />
                      ) : null}
                    </FormControl>

                    <FormControl isRequired>
                      <FormControl.Label mt="2" fontWeight="extrabold">
                        Major vessels
                      </FormControl.Label>
                      <Input
                        keyboardType="numeric"
                        value={props.values.ca}
                        InputLeftElement={
                          <Icon
                            as={<MaterialIcons name="list" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                          />
                        }
                        onChangeText={props.handleChange("ca")}
                        onBlur={props.handleBlur("ca")}
                        placeholder="1.5"
                        width="100%"
                        type="number"
                      />

                      {props.touched.ca && props.errors.ca ? (
                        <InputHelper text={props.errors.ca} />
                      ) : null}
                    </FormControl>

                    <FormControl isRequired>
                      <FormControl.Label mt="2" fontWeight="extrabold">
                        Serum Cholesterol
                      </FormControl.Label>
                      <Input
                        keyboardType="numeric"
                        value={props.values.chol}
                        InputLeftElement={
                          <Icon
                            as={<MaterialIcons name="list" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                          />
                        }
                        onChangeText={props.handleChange("chol")}
                        onBlur={props.handleBlur("chol")}
                        placeholder="2"
                        width="100%"
                        type="number"
                      />

                      {props.touched.chol && props.errors.chol ? (
                        <InputHelper text={props.errors.chol} />
                      ) : null}
                    </FormControl>

                    <FormControl isRequired>
                      <FormControl.Label mt="2" fontWeight="extrabold">
                        Thalassemia
                      </FormControl.Label>
                      <Input
                        keyboardType="numeric"
                        value={props.values.thal}
                        InputLeftElement={
                          <Icon
                            as={<MaterialIcons name="list" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                          />
                        }
                        onChangeText={props.handleChange("thal")}
                        onBlur={props.handleBlur("thal")}
                        placeholder="3"
                        width="100%"
                        type="number"
                      />

                      {props.touched.thal && props.errors.thal ? (
                        <InputHelper text={props.errors.thal} />
                      ) : null}
                    </FormControl>
                    <Button
                      onPress={props.handleSubmit}
                      colorScheme="danger"
                      loading={props.isSubmitting}
                      disabled={props.isSubmitting}
                      my="3"
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
          )}
        </View>

        <Footer navigation={navigation} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
