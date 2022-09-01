import React from "react";
import { ListItem, Badge, Text } from "react-native-elements";
import { TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import ProductList from "./productList";
import ProductContainer from "./productContainer";

const CategoryFilter = (props) => {
  return (
    <ScrollView horizontal={true}>
      <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
        <TouchableOpacity
          onPress={() => {
            props.categoryFilter("All");
          }}
        >
          <Badge value="ALL" textStyle={{ fontSize: 15 }} />
        </TouchableOpacity>
        {props.categories.map((ctg) => {
          return (
            <TouchableOpacity
              key={ctg._id}
              onPress={() => {
                props.categoryFilter(ctg.id);
              }}
            >
              <Badge value={ctg.name} textStyle={{ fontSize: 15 }} />
            </TouchableOpacity>
          );
        })}
      </ListItem>
    </ScrollView>
  );
};

export default CategoryFilter;
