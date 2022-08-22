import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";

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
    setStatusText("pending");
    setColor("yellow");
    setOrderStatus("delivered");
  }, []);
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
          <Button title="Update" />
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
