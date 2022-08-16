import React from "react";
import { StyleSheet, SafeAreaView, Image, Dimensions } from "react-native";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";
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

      <SearchBar
        placeholder="Search"
        containerStyle={{
          borderRadius: 5,
          borderWidth: 2,
          marginLeft: 5,
          marginRight: 5,
          borderColor: "#6495ed",
          height: 40,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    //width: "100%",
    //flexDirection: "row",
    alignContent: "center",
    justifyContent: "cenetr",
    // padding: 20,
  },
});

export default Header;
