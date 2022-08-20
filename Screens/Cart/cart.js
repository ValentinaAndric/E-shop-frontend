import React, { useEffect, useState } from "react";
import CartItem from "./cartItem";
import { Dimensions, View, StyleSheet, Image, Button } from "react-native";
import { Container, Text, Left, Right, H1 } from "native-base";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { SwipeListView } from "react-native-swipe-list-view";
import cartItem from "../../Redux/Reducers/cartItem";
import { connect } from "react-redux";
import cart from "../../assets/data/cart.json";

var { width, heigth } = Dimensions.get("window");

const Cart = (props) => {
  const [productAdded, setProductAdded] = useState();
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    setProductAdded(cart);
    return () => {
      setProductAdded();
      setTotalPrice();
    };
  }, []);
  return (
    <>
      <Image
        source={require("../../assets/logo.png")}
        resizeMode="contain"
        style={{ height: 90, marginLeft: width / 4, marginTop: 50 }}
      />
      {productAdded ? (
        <View>
          <CartItem item={productAdded} />
          <View style={styles.button}>
            <Button
              title="Checkout"
              color={"white"}
              onPress={() => props.navigation.navigate("Checkout")}
            />
          </View>
        </View>
      ) : (
        <Container>
          <Text>Looks like your cart is empty</Text>
        </Container>
      )}
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
  title: {
    marginTop: 50,
    fontSize: 30,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#1e90ff",
    width: 200,
    marginLeft: width / 4,
    borderRadius: 5,
  },
});
export default connect(mapStateToProps, null)(Cart);
