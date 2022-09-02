import React, { useCallback, useState } from "react";
import ProductList from "./productList";
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
import { Container, Icon, Input, Text } from "native-base";
import data from "../../assets/data/products.json";
import axios from "axios";
import SearchedProduct from "./searchedProduct";
import Header from "../../Shared/header";
import { SearchBar } from "react-native-elements";
var { height } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [initialState, setInitialState] = useState([]);
  const [searchedProduct, setSearchedProduct] = useState([]);
  const [searchFocus, setSearchFocus] = useState();

  useFocusEffect(
    useCallback(() => {
      //Get all products
      axios
        .get(`${baseUrl}products`)
        .then((res) => {
          setProducts(res.data);
          setProductCategories(res.data);
          setInitialState(res.data);
          //setSearchedProduct(res.data);
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
        // setSearchedProduct([]);
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
  const searchProduct = (text) => {
    setSearchedProduct(
      products.filter((product) =>
        product.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };
  const openSearchWindow = () => {
    setSearchFocus(true);
  };
  const closeSearchWindow = () => {
    setSearchFocus(false);
  };

  return (
    <>
      <View>
        <Header />
      </View>
      <View style={{ backgroundColor: "white" }}>
        <SearchBar
          placeholder="Search"
          onChangeText={(text) => searchProduct(text)}
          value={searchedProduct}
          onChange={openSearchWindow}
          onClear={closeSearchWindow}
          inputStyle={{ backgroundColor: "white" }}
          containerStyle={{
            backgroundColor: "white",
            borderRadius: 6,
            borderTopColor: "#1e90ff",
            borderTopWidth: 2,
            borderBottomColor: "#1e90ff",
            borderBottomWidth: 2,
            borderLeftColor: "#1e90ff",
            borderLeftWidth: 2,
            borderRightColor: "#1e90ff",
            borderRightWidth: 2,
          }}
          inputContainerStyle={{ backgroundColor: "white" }}
        />
      </View>
      {searchFocus == true ? (
        <SearchedProduct
          navigation={props.navigation}
          searchedProduct={searchedProduct}
        />
      ) : (
        <ScrollView>
          <View>
            <Banner />
          </View>
          <CategoryFilter
            categories={categories}
            categoryFilter={changeCtg}
            productCategories={productCategories}
          />
          {productCategories.length > 0 ? (
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
          ) : (
            <View style={styles.center}>
              <Text>No products found </Text>
            </View>
          )}
        </ScrollView>
      )}
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
  center: {
    justifyContent: "center",
    alignItems: "center",
    height: height / 2,
  },
});

export default ProductContainer;
