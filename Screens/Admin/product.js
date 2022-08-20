import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
} from "react-native";
import ListItem from "./listItem";

import { ActivityIndicator, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import data from "../../assets/data/products.json";
import { Header } from "react-native-elements";
var { width, height } = Dimensions.get("window");
const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}>
        <Text>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text>Price</Text>
      </View>
    </View>
  );
};
const Product = (props) => {
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState();
  useEffect(() => {
    setProductFilter(data);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View>
          <Icon name="plus" size={18} color="red" />
          <Button title="Orders" />
        </View>
      </View>
      <View>
        <Icon name="plus" size={18} color="white" />
        <Button title="Products" />
      </View>
      <View>
        <Icon name="plus" size={18} color="white" />
        <Button title="Categories" />
      </View>
      <View>
        <Header searchBar rounded>
          <View>
            <Icon name="search" />
            <TextInput placeholder="Search" />
          </View>
        </Header>
      </View>
      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="lightblue" />
        </View>
      ) : (
        <FlatList
          data={productFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => (
            <ListItem {...item} navigation={props.navigation} index={index} />
          )}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  listHeader: {
    flexDirections: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    margin: 3,
    width: width / 2,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginBottom: 160,
    backgroundColor: "white",
  },
  buttonContainer: {
    margin: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 4,
    color: "white",
  },
});
export default Product;
