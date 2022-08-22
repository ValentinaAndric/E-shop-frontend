import React, { useCallback, useState } from "react";
import ProductList from "./productList";
import Header from "../../Shared/header";
import Banner from "../../Shared/banner";
import ctg from "../../assets/data/categories.json";
import CategoryFilter from "./categoryFilter";
import { useFocusEffect } from "@react-navigation/native";
import baseUrl from "../../assets/common/baseUrl";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import data from "../../assets/data/products.json";
import axios from "axios";

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${baseUrl}products`)
        .then((res) => {
          setProducts(res.data);
          setCategories(res.data);
        })
        .catch((error) => {
          console.log("Api call error");
        });

      return () => {
        setProducts([]);
        setCategories([]);
      };
    }, [])
  );
  return (
    <ScrollView>
      <View>
        <Header />
      </View>
      <View>
        <Banner />
      </View>
      <CategoryFilter categories={categories} />
      <View style={styles.listContainer}>
        {products.map((item) => {
          return (
            <ProductList
              navigation={props.navigation}
              key={item.name}
              item={item}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
});

export default ProductContainer;
