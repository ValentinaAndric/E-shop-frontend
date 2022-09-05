import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Text } from "native-base";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
var { width } = Dimensions.get("window");
const CartItem = (props) => {
  const data = props.item;

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
        <View style={{ marginTop: 30, marginLeft: 25 }}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.price}>${data.price}</Text>
          <TouchableOpacity onPress={() => props.removeFromCart(data)}>
            <View
              style={{
                marginLeft: 210,
                marginTop: -50,
              }}
            >
              <Icon name="trash" color={"red"} size={30} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ListItem>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    //clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

// const mapStateToProps = (state) => {
//   const { cartItem } = state;
//   return {
//     cartItem: cartItem,
//   };
// };

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
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
export default connect(null, mapDispatchToProps)(CartItem);
