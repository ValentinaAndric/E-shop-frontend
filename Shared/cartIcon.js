import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";

import { connect } from "react-redux";

const CartIcon = (props) => {
  return (
    <>
      {props.cartItem.length ? (
        <Text style={styles.text}>{props.cartItem.length}</Text>
      ) : null}
    </>
  );
};
const mapStateToProps = (state) => {
  const { cartItem } = state;
  return {
    cartItem: cartItem,
  };
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    width: 18,
    fontWeight: "bold",
    color: "red",
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -4,
    right: 30,
  },
});
export default connect(mapStateToProps)(CartIcon);
