import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import baseUrl from "../../assets/common/baseUrl";
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
        <Button
          title="Delete"
          color="white"
          onPress={() => props.delete(props.item.id)}
        />
      </View>
    </View>
  );
};

const Categories = (props) => {
  const [categories, setCategories] = useState();
  const [categoryName, setCategoryName] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${baseUrl}categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => alert("Error to load categories"));

    return () => {
      setCategories();
      setToken();
    };
  }, []);

  const addCategory = () => {
    const category = {
      name: categoryName,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${baseUrl}categories`, category, config)
      .then((res) => setCategories([...categories, res.data]))
      .catch((error) => alert("Error to load categories"));

    setCategoryName("");
  };

  const deleteCategory = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${baseUrl}categories/${id}`, config)
      .then((res) => {
        const newCategories = categories.filter((i) => i.id !== id);
        setCategories(newCategories);
      })
      .catch((error) => alert("Error occured"));
  };
  return (
    <View>
      <Image
        source={require("../../assets/logo.png")}
        resizeMode="contain"
        style={{ height: 90, marginLeft: width / 4, marginTop: 50 }}
      />
      <View style={styles.TopBar}>
        <View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "green",
              backgroundColor: "green",
              borderRadius: 5,
              height: 40,
            }}
          >
            <Button
              title="Add category"
              color="white"
              onPress={() => addCategory()}
            />
          </View>
        </View>
        <View style={{ width: width / 2.5 }}>
          <TextInput
            value={categoryName}
            style={styles.input}
            onChangeText={(text) => {
              setCategoryName(text);
            }}
          />
        </View>
      </View>

      <View style={{ marginBottom: 60 }}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <Item item={item} index={index} delete={deleteCategory} />
          )}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  TopBar: {
    backgroundColor: "white",
    width: width,
    height: 60,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 0,
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
