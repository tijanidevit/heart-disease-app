import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_URL = "https://heartisan.herokuapp.com";
export const USER_URL = "https://heartisan.herokuapp.com/users";
export const PREDICTIONS_URL = "https://heartisan.herokuapp.com/predictions";

export const authUser = async () => {
  let aU = await AsyncStorage.getItem("userToken");
  console.log("aU", aU);
  if (aU && aU !== null) {
    return JSON.parse(aU);
  }
  return false;
};

export const setAuthUser = async (data) => {
  await AsyncStorage.setItem("userToken", data);
};
