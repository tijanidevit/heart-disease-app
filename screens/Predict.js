import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  View,
  Button,
  FormControl,
  Input,
  Icon,
  ScrollView,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Footer, Header, ModalMi } from "../components";
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
  const [result, setResult] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(async () => {
    setPageLoaded(false);
    let auser = await authUser();
    setUser(auser);
    if (!auser || typeof auser == undefined) {
      alert("Please login or register to continue");
      navigation.navigate("Login");
    }
    setUser(auser);

    if (user.age === null || user.gender === null) {
      alert("Please update your age and gender to continue");
      navigation.navigate("Profile");
    }

    console.log("user", user);
    setPageLoaded(true);
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
          {!pageLoaded && <ActivityIndicator color="red" size="large" />}
          {pageLoaded && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Formik
                // enableReinitialize
                initialValues={{
                  cp: 0, //Chest Pain
                  trestbps: 0, //Resting blood pressure
                  chol: 0, //serum cholesterol
                  fbs: 0, //fasting blood pressure
                  restecg: 0, //resting electrocardiographic results
                  thalach: 0, //maximum heart rate achieved
                  exang: 0, //exercise induced angina
                  oldpeak: 0, //ST depression
                  slope: 0, //slope of the peak exercise
                  ca: 0, //major vessels
                  thal: 0, //thalassemia
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
                  setIsSubmitting(true);
                  setTimeout(() => {
                    axios
                      .post(`${PREDICTIONS_URL}/${user.id}`, values)
                      .then(async (res) => {
                        let resp = res.data;
                        console.log("resp", resp);
                        if (resp.success == "true") {
                          setResult(resp.data);
                        } else {
                          alert(resp.message);
                        }
                      })
                      .catch((err) => {
                        alert(err.toString());
                        console.log(err);
                      })
                      .finally(() => {
                        setIsSubmitting(false);
                        formikActions.setSubmitting(false);
                      });
                  }, 1);
                }}
              >
                {(props) => (
                  <View>
                    {result.length > 0 && (
                      <ModalMi
                        showModal={true}
                        navigation={navigation}
                        result={result}
                      />
                    )}
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
                      />

                      {props.touched.ca && props.errors.ca ? (
                        <InputHelper text={props.errors.ca} />
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
                        <ActivityIndicator color="white" size="large" />
                      )}
                      Submit
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
