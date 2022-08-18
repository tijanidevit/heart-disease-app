import { Text, View, FlatList, Flex } from "native-base";
import { useState, useEffect } from "react";
import { SingleDoctor } from "./SingleDoctor";

const s = require("../style");
export const DoctorsCard = ({ disease }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (disease && disease.doctors) {
      setDoctors(disease.doctors);
    }
  }, [disease]);

  return (
    <View style={{ flexDirection: "column" }}>
      <Text fontSize="xl" bold color="black">
        Doctors
      </Text>

      <View width={100} style={{ flexDirection: "row" }} mb="2.5" mt="1.5">
        {doctors.length > 0 &&
          doctors.map((doctor, id) => (
            <SingleDoctor doctor={doctor} key={id} />
          ))}
      </View>

      {doctors.length === 0 && (
        <Text mt={2} color="gray.500" fontSize="md">
          You have no test results yet. Please run a diagnosis
        </Text>
      )}
    </View>
  );
};
