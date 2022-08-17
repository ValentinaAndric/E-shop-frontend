import React, { useCallback, useEffect, useState } from "react";
import ProductList from "./productList";
import Header from "../../Shared/header";
import Banner from "../../Shared/banner";
import ctg from "../../assets/data/categories.json";
import CategoryFilter from "./categoryFilter";

import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import data from "../../assets/data/products.json";

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setProducts(data), setCategories(ctg);

    return () => {
      setCategories([]);
      setProducts([]);
    };
  }, []);

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
