import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Error = (props) => {
  return (
    <View style={styles.constainer}>
      <Text styles={styles.text}>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    width: "100%",
    alignItems: "center",
    margin: 10,
  },
  text: {
    color: "red",
  },
});

export default Error;
