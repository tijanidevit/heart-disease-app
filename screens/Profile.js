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
  Center,
  CheckIcon,
  Select,
  Button,
  FormControl,
  Input,
  Icon,
} from "native-base";
import { MaterialIcons, Foundation, AntDesign } from "@expo/vector-icons";
import {
  Footer,
  Header,
  GreetingsCard,
  DiagnoseCard,
  PreviousTestsCard,
  CenterLogo,
} from "../components";

const s = require("../style");
export const Profile = ({ navigation }) => {
  useEffect(async () => {
    console.clear();
    const userToken = await AsyncStorage.getItem("userToken");
    if (!userToken || userToken == undefined) {
      alert("Please login or register to continue");
      navigation.navigate("Login");
    }
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
          initialValues={{ age: "", gender: "" }}
          validationSchema={Yup.object({
            age: Yup.number().required("Age is required"),
            gender: Yup.string().required("Please select a gender"),
          })}
          onSubmit={(values, formikActions) => {
            console.log(values);
            setTimeout(() => {
              formikActions.setSubmitting(false);
            }, 500);
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
                  value="Xpat"
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
                  value="Xpat"
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
                  value={props.values.age}
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
                  <Select.Item label="Male" value="M" />
                  <Select.Item label="Female" value="F" />
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
