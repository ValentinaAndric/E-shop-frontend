import React from "react";
import { ListItem, Badge } from "react-native-elements";
import { TouchableOpacity, ScrollView } from "react-native";

const CategoryFilter = (props) => {
  return (
    <ScrollView horizontal={true}>
      <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.categoryFilter("All");
          }}
        >
          <Badge value="ALL" textStyle={{ fontSize: 15 }} />
        </TouchableOpacity>
        {props.categories.map((ctg) => {
          return (
            <TouchableOpacity
              key={ctg.id}
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
