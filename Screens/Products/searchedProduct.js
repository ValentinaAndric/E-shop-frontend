import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { Container, Text } from "native-base";
import { ListItem } from "react-native-elements";

var { width } = Dimensions.get("window");

const SearchedProduct = (props) => {
  const { searchedProduct } = props;
  return (
    <Container>
      {searchedProduct.length > 0 ? (
        searchedProduct.map((item) => {
          return (
            <ListItem
              onPress={() => {
                props.navigation.navigate("Product Detail", { item: item });
              }}
              key={item.id}
              style={{ width: width }}
            >
              <Image
                source={{
                  uri: item.image
                    ? item.image
                    : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                }}
                style={{ width: 50, height: 50 }}
              />
              <View>
                <Text>{item.name}</Text>
                <Text>{item.description}</Text>
              </View>
            </ListItem>
          );
        })
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: "center" }}>
            No products match the selected criteria
          </Text>
        </View>
      )}
    </Container>
  );
};
const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
});

export default SearchedProduct;
