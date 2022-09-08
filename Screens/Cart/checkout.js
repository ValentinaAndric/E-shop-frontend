import React, { useState, useEffect, useContext } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Text } from "native-base";
import FormContainer from "../../Shared/Form/formContainer";
import Input from "../../Shared/Form/input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthGlobal from "../../Redux/Context/store/AuthGlobal";
import { connect } from "react-redux";
const countries = require("../../assets/countries.json");

const Checkout = (props) => {
  const context = useContext(AuthGlobal);
  const [country, setCountry] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [address2, setAddress2] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [user, setUser] = useState();
  const [orderItems, setOrderItems] = useState();

  useEffect(() => {
    setOrderItems(props.cartItem);
    if (context.stateUser.isAuthenticated) {
      setUser(context.stateUser.user.sub);
    } else {
      props.navigation.navigate("Cart");
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please Login to Checkout",
        text2: "Error",
      });
    }
    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      status: "3",
      user,
      zip,
    };
    props.navigation.navigate("Payment", { order: order });
  };

  return (
    <KeyboardAwareScrollView enableOnAndroid={true}>
      <FormContainer title={"Checkout"}>
        <Input
          placeholder={"Phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Shipping Address 1"}
          name={"ShippingAddress1"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={"Shipping Address 2"}
          name={"ShippingAddress2"}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={"City"}
          name={"City"}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={"Zip code"}
          name={"zip"}
          value={zip}
          keyboardType={"numeric"}
          onChangeText={(text) => setZip(text)}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={styles.text}>Select your conuntry: {country}</Text>

          <Picker
            mode="dropdown"
            style={styles.picker}
            selectedValue={countries}
            onValueChange={(e) => setCountry(e)}
          >
            {countries.map((c) => {
              return <Picker.Item key={c.code} label={c.name} value={c.name} />;
            })}
          </Picker>
        </View>
        <View
          style={{
            width: "80%",
            alignItems: "center",
            borderWidth: 2,
            borderRadius: 5,
            backgroundColor: "#1e90ff",
            borderColor: "#1e90ff",
          }}
        >
          <Button
            title="Confrim"
            color={"white"}
            onPress={() => [checkOut()]}
          />
        </View>
        <Button title="Back to cart" />
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  const { cartItem } = state;
  return {
    cartItem: cartItem,
  };
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 0,
  },
  picker: {
    width: 200,
    marginTop: 0,
  },
});
export default connect(mapStateToProps)(Checkout);
