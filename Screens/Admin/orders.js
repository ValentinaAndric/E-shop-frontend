import { FlatList, View, Image, Dimensions } from "react-native";
import React, { useState, useCallback } from "react";
import OrderCard from "../../Shared/orderCard";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import baseUrl from "../../assets/common/baseUrl";
var { width } = Dimensions.get("window");
const Orders = (props) => {
  const [orderList, setOrderList] = useState();

  useFocusEffect(
    useCallback(() => {
      getOrders();
      return () => {
        setOrderList();
      };
    }, [])
  );

  const getOrders = () => {
    axios
      .get(`${baseUrl}orders`)
      .then((res) => {
        setOrderList(res.data);
      })
      .catch((error) => console.log(error));
  };
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
          <OrderCard navigation={props.navigation} {...item} editMode={true} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
export default Orders;
