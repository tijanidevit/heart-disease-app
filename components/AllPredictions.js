import { Text, View } from "native-base";
import { Test } from "./Test";
const s = require("../style");
export const AllPredictions = ({ navigation, result }) => {
  //   console.log(result);
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View>
      {result.length > 0 &&
        result.map((res) => {
          return <Test key={res.id} result={res} navigation={navigation} />;
        })}
      {result.length == 0 && (
        <Text mt={2} color="gray.500" fontSize="md">
          You have no test results yet. Please run a diagnosis
        </Text>
      )}
    </View>
  );
};
