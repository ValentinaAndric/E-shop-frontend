import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ListItem from "./listItem";
import { SearchBar } from "react-native-elements";
import { ActivityIndicator, FlatList } from "react-native";

import { Header } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import { useFocusEffect } from "@react-navigation/native";

var { width, height } = Dimensions.get("window");
const ListHeader = () => {
  return (
    <View style={{ backgroundColor: "gainsboro", borderBottomWidth: 1.2 }}>
      <View elevation={1} style={styles.listHeader}>
        <View style={styles.headerItem}>
          <Text style={{ fontWeight: "600" }}>Brand</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={{ fontWeight: "600" }}>Name</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={{ fontWeight: "600" }}>Category</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={{ fontWeight: "600" }}>Price</Text>
        </View>
      </View>
    </View>
  );
};
const Product = (props) => {
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState();
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      // Get Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios.get(`${baseUrl}products`).then((res) => {
        setProductFilter(res.data);
        setLoading(false);
      });

      return () => {
        setProductFilter();
        setLoading(true);
      };
    }, [])
  );

  const deleteProduct = (id) => {
    axios
      .delete(`${baseUrl}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = productFilter.filter((item) => item.id !== id);
        setProductFilter(products);
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
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              borderWidth: 1,
              borderColor: "#1e90ff",
              padding: 2,
              backgroundColor: "#1e90ff",
              borderRadius: 5,
            }}
          >
            <Icon name="shopping-bag" size={18} color="white" />
            <Button
              title="Orders  "
              color={"white"}
              onPress={() => {
                props.navigation.navigate("Orders");
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              borderWidth: 1,
              borderColor: "#1e90ff",
              padding: 2,
              backgroundColor: "#1e90ff",
              borderRadius: 5,
            }}
          >
            <Icon name="plus" size={18} color="white" />
            <Button
              title="Products"
              color={"white"}
              onPress={() => {
                props.navigation.navigate("Product Form");
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              borderWidth: 1,
              borderColor: "#1e90ff",
              padding: 2,
              backgroundColor: "#1e90ff",
              borderRadius: 5,
            }}
          >
            <Icon name="plus" size={18} color="white" />
            <Button
              title="Categories"
              color={"white"}
              onPress={() => {
                props.navigation.navigate("Categories");
              }}
            />
          </View>
        </View>
        {loading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : (
          <FlatList
            data={productFilter}
            ListHeaderComponent={ListHeader}
            renderItem={({ item, index }) => (
              <View>
                <ListItem
                  {...item}
                  navigation={props.navigation}
                  index={index}
                  delete={deleteProduct}
                />
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    padding: 5,
    marginLeft: 70,
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginTop: 80,
    marginBottom: 160,
    backgroundColor: "white",
    marginTop: 0,
  },
  buttonContainer: {
    margin: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 4,
    color: "white",
  },
});
export default Product;
