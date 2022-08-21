import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  FlatList,
  Dimensions,
  TextInput,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import ctg from "../../assets/data/categories.json";
var { width } = Dimensions.get("window");

const Item = (props) => {
  return (
    <View style={styles.item}>
      <Text>{props.item.name}</Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: "red",
          backgroundColor: "red",
          borderRadius: 5,
        }}
      >
        <Button title="Delete" color="white" />
      </View>
    </View>
  );
};

const Categories = (propshuh) => {
  const [categories, setCategories] = useState();
  const [categoryName, setCategoryName] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    setCategories(ctg);
  }, []);
  return (
    <View>
      <Image
        source={require("../../assets/logo.png")}
        resizeMode="contain"
        style={{ height: 90, marginLeft: width / 4, marginTop: 50 }}
      />
      <View style={{ position: "relative", height: "100%" }}>
        <View style={{ marginBottom: 60 }}>
          <FlatList
            data={categories}
            renderItem={({ item, index }) => <Item item={item} index={index} />}
          />
        </View>
        <View style={styles.bottomBar}>
          <View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "green",
                backgroundColor: "green",
                borderRadius: 5,
                height: 40,
                marginLeft: 20,
              }}
            >
              <Button title="Add category" color="white" />
            </View>
          </View>
          <View style={{ width: width / 2.5 }}>
            <TextInput
              value={categoryName}
              style={styles.input}
              onPress={(text) => {
                setCategoryName(text);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: "white",
    width: width,
    height: 60,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //position: "absolute",
    marginTop: 230,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
  },
  item: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    padding: 5,
    margin: 5,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
  },
});
export default Categories;
