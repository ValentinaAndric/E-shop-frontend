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
  const [productCategories, setProductCategories] = useState([]);
  const [initialState, setInitialState] = useState([]);

  useFocusEffect(
    useCallback(() => {
      //Get all products
      axios
        .get(`${baseUrl}products`)
        .then((res) => {
          setProducts(res.data);
          setProductCategories(res.data);
          setInitialState(res.data);
        })
        .catch((error) => {
          console.log("Api call error");
        });
      //Get all categories
      axios
        .get(`${baseUrl}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log("Api call error");
        });

      return () => {
        setProducts([]);
        setCategories([]);
        setProductCategories([]);
      };
    }, [])
  );

  const changeCtg = (category) => {
    if (category == "All") {
      setProductCategories(initialState);
    } else {
      setProductCategories(
        products.filter((product) => product.category?._id === category)
      );
    }
  };
  return (
    <>
      <ScrollView>
        <View>
          <Header />
        </View>
        <View>
          <Banner />
        </View>
        <CategoryFilter
          categories={categories}
          categoryFilter={changeCtg}
          productCategories={productCategories}
        />
        <View style={styles.listContainer}>
          {productCategories.map((item) => {
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
    </>
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
