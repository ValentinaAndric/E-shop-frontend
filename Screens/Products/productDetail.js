import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Left, Right, Container, H1 } from "native-base";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Connect } from "react-redux";
var { width } = Dimensions.get("window");
const ProductDetail = (props) => {
  const [item, setItem] = useState(props.route.params.item);

  return (
    <ScrollView style={{ marginBottom: 80, padding: 5 }}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: item.image
              ? item.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.brand}>{item.brand}</Text>
      </View>
      <View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <View style={styles.button}>
        <Button title="Add product to cart" color={"white"} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    margin: 0,
    padding: 0,
    backgroundColor: "white",
  },
  image: {
    height: 250,
    width: "100%",
    marginTop: 60,
    marginBottom: 20,
    alignItems: "center",
  },
  price: {
    fontSize: 30,
    color: "red",
    marginTop: 30,
    marginLeft: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },
  brand: {
    fontSize: 25,
    marginTop: 10,
  },
  description: {
    fontSize: 18,
    marginTop: 10,
  },
  button: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "green",
    backgroundColor: "green",
    marginTop: 10,
  },
});

export default ProductDetail;
