import React from "react";
import { StyleSheet, SafeAreaView, Image, Dimensions } from "react-native";
import { View } from "react-native";

const { width } = Dimensions.get("window");
const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={require("../assets/logo.png")}
        resizeMode="contain"
        style={{ height: 90, marginLeft: width / 4 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignContent: "center",
    justifyContent: "cenetr",
  },
});

export default Header;
