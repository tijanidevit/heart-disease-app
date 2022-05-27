import { Center } from "native-base";
import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
  alwaysred: {
    backgroundColor: "red",
    height: 100,
    width: 100,
  },

  logo: {
    width: 200,
    height: 100,
  },

  txCenter: {
    textAlign: "center",
  },

  logoSm: {
    width: 100,
    height: 100,
  },

  width100: {
    width: "400%",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  contain: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },

  textRed: {
    color: "#E11D48",
  },
  textGreen: {
    color: "green",
  },
  textWhite: {
    color: "white",
  },

  main: {
    flex: 0.8,
    paddingHorizontal: 15,
  },
  main9: {
    flex: 0.9,
    paddingHorizontal: 15,
  },

  div: {
    flexDirection: "column",
  },

  footer: {
    flex: 0.1,
  },
});
