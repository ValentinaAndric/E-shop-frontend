import React, { useContext, useEffect, useState } from "react";
import CartItem from "./cartItem";
import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Container, Text, Left, Right, H1 } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { connect } from "react-redux";
import AuthGlobal from "../../Redux/Context/store/AuthGlobal";
import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";

var { width, height } = Dimensions.get("window");

const Cart = (props) => {
  const context = useContext(AuthGlobal);

  const [productUpdate, setProductUpdate] = useState();
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    getProducts();
    return () => {
      setProductUpdate();
      setTotalPrice();
    };
  }, [props]);

  const getProducts = () => {
    var products = [];
    props.cartItem.forEach((cart) => {
      axios
        .get(`${baseUrl}products/${cart.product}`)
        .then((data) => {
          products.push(data.data);
          setProductUpdate(products);
          var total = 0;
          products.forEach((product) => {
            const price = (total += product.price);
            setTotalPrice(price);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <>
      <Image
        source={require("../../assets/logo.png")}
        resizeMode="contain"
        style={{ height: 90, marginLeft: width / 4, marginTop: 50 }}
      />
      {productUpdate ? (
        <ScrollView>
          {productUpdate.map((product) => {
            return (
              <View>
                <CartItem item={product} />
              </View>
            );
          })}
          <View>
            <Text style={styles.price}>
              <Text color={"black"} bold>
                Total price:{"  "}
              </Text>
              ${totalPrice}
            </Text>
          </View>
          <View
            style={{
              width: "50%",
              marginLeft: width / 4,
              borderWidth: 2,
              borderRadius: 5,
              backgroundColor: "#1e90ff",
              borderColor: "#1e90ff",
            }}
          >
            <Button
              color={"white"}
              title="clear cart"
              onPress={() => props.clearCart()}
            />
          </View>
          {context.stateUser.isAuthenticated ? (
            <View style={styles.button}>
              <Button
                title="Checkout"
                color={"white"}
                onPress={() => props.navigation.navigate("Checkout")}
              />
            </View>
          ) : (
            <Button
              title="Login if you want to order"
              onPress={() => props.navigation.navigate("Login")}
            />
          )}
        </ScrollView>
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

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
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
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: "green",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
