import ProductCard from "./productCard";
import React from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";

var { width } = Dimensions.get("window");

const ProductList = (props) => {
  const { item } = props;
  return (
    <TouchableOpacity>
      <View
        style={{
          width: width / 2,
        }}
      >
        <ProductCard {...item} />
      </View>
    </TouchableOpacity>
  );
};
export default ProductList;
