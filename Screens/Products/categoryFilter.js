import React from "react";
import { ListItem, Badge, Text } from "react-native-elements";
import { TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const CategoryFilter = (props) => {
  return (
    <ScrollView horizontal={true}>
      <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
        {props.categories.map((categories) => {
          return (
            <TouchableOpacity>
              <Badge value={categories.name} textStyle={{ fontSize: 15 }} />
            </TouchableOpacity>
          );
        })}
      </ListItem>
    </ScrollView>
  );
};

export default CategoryFilter;
