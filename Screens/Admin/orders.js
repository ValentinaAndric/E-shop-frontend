import { FlatList, View, Image, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import OrderCard from "../../Shared/orderCard";
import orders from "../../assets/data/orders.json";
import axios from "axios";

var { width } = Dimensions.get("window");
const Orders = (props) => {
  const [orderList, setOrderList] = useState();

  useEffect(() => {
    setOrderList(orders);
  }, []);

  return (
    <View>
      <Image
        source={require("../../assets/logo.png")}
        resizeMode="contain"
        style={{ height: 90, marginLeft: width / 4, marginTop: 50 }}
      />
      <FlatList
        data={orderList}
        renderItem={({ item }) => (
          <OrderCard navigation={props.navigation} {...item} />
        )}
      />
    </View>
  );
};
export default Orders;
