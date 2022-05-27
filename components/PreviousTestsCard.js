import React, { useState, useEffect } from "react";
import { Text, View, Image, Spacer, Box, Icon, FlatList } from "native-base";
import { Test } from "./Test";
const s = require("../style");
export const PreviousTestsCard = ({ navigation, result, he }) => {
  // console.log(result);
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };
  return (
    <View>
      {result.length > 0 && (
        <FlatList
          minH="60%"
          maxH="60%"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={result}
          renderItem={(res) => (
            <Test result={res.item} navigation={navigation} />
          )}
          keyExtractor={(res) => res.id}
        />
      )}

      {result.length == 0 && (
        <Text mt={2} color="gray.500" fontSize="md">
          You have no test results yet. Please run a diagnosis
        </Text>
      )}
    </View>
  );
};
