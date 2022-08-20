import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Text } from "native-base";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native";
var { width } = Dimensions.get("window");
const CartItem = (props) => {
  const data = props.item; //Ovo podlefati jos malo na sta se odnosi
  return (
    <ListItem style={styles.listItem}>
      <View style={styles.container}>
        <Image
          source={{
            uri: data.image
              ? data.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
          style={styles.image}
        />
        <View style={{ marginTop: 30 }}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.price}>${data.price}</Text>
        </View>
      </View>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  container: {
    marginTop: 20,
    marginLeft: 5,
    flexDirection: "row",
  },
  price: {
    marginTop: 10,
    fontSize: 20,
    color: "green",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listItem: {
    width: width,
    borderBottomWidth: 2,
    borderBottomColor: "lightblue",
  },
});
export default CartItem;
