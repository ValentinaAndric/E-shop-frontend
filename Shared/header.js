import React from "react";
import { StyleSheet, SafeAreaView, Image, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={require("../assets/logo.png")}
        resizeMode="contain"
        style={{ height: 100, marginLeft: width / 4 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "cenetr",
    padding: 20,
  },
});

export default Header;
