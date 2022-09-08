import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseUrl from "../assets/common/baseUrl";
import TrafficLight from "./trafficLight";
const codes = [
  { name: "pending", code: "3" },
  { name: "shipped", code: "2" },
  { name: "delivered", code: "1" },
];
const OrderCard = (props) => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setColor] = useState();

  useEffect(() => {
    if (props.editMode) {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));
    }

    if (props.status == "3") {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText("pending");
      setColor("#E74C3C");
    } else if (props.status == "2") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("shipped");
      setColor("#F1C40F");
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText("delivered");
      setColor("#2ECC71");
    }
    return () => {
      setColor();
      setStatusText();
      setOrderStatus();
    };
  }, []);

  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: props.city,
      country: props.country,
      dateOrdered: props.dateOrdered,
      id: props.id,
      orderItems: props.orderItems,
      phone: props.phone,
      shippingAddress1: props.shippingAddress1,
      shippingAddress2: props.shippingAddress2,
      status: statusChange,
      totalPrice: props.totalPrice,
      user: props.user,
      zip: props.zip,
    };

    axios
      .put(`${baseUrl}orders/${props.id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order edited",
            text2: "success",
          });
          setTimeout(() => {
            props.navigation.navigate("Product");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };
  return (
    <View style={[{ backgroundColor: cardColor }, styles.container]}>
      <View style={styles.container}>
        <Text>Order Number: #{props.id}</Text>
      </View>
      <Text>
        Status: {statusText} {orderStatus}
      </Text>
      <Text>
        Address: {props.shippingAddress1} {props.sippingAddress2}
      </Text>
      <Text>City: {props.city}</Text>
      <Text>Country {props.country}</Text>
      <Text>Date Ordered: {props.dateOrdered}</Text>
      <View style={styles.priceContainer}>
        <Text>Price: </Text>
        <Text style={styles.price}>${props.totalPrice}</Text>
      </View>
      {props.editMode ? (
        <View>
          <Picker
            mode="dropdown"
            iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
            selectedValue={statusChange}
            placeholder="Change Status"
            onValueChange={(e) => setStatusChange(e)}
          >
            {codes.map((c) => {
              return <Picker.Item key={c.code} label={c.name} value={c.code} />;
            })}
          </Picker>
          <Button title="Update" onPress={() => updateOrder()} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    backgroundColor: "#62B1F6",
    padding: 5,
  },
  pricrContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  price: {
    color: "green",
    fontWeight: "bold",
  },
});
export default OrderCard;
