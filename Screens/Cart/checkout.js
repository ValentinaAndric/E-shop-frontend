import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Text } from "native-base";
import FormContainer from "../../Shared/Form/formContainer";
import Input from "../../Shared/Form/input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const countries = require("../../assets/countries.json");

const Checkout = (props) => {
  const [country, setCountry] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [address2, setAddress2] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [user, setUser] = useState();
  const [orderItems, setOrderItems] = useState();

  return (
    <KeyboardAwareScrollView enableOnAndroid={true}>
      <FormContainer title={"Checkout"}>
        <Input
          placeholder={"Phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
        />
        <Input
          placeholder={"Shipping Address 1"}
          name={"ShippingAddress1"}
          value={address}
        />
        <Input
          placeholder={"Shipping Address 2"}
          name={"ShippingAddress2"}
          value={address2}
        />
        <Input placeholder={"City"} name={"City"} value={city} />
        <Input
          placeholder={"Zip code"}
          name={"zip"}
          value={zip}
          keyboardType={"numeric"}
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
          <Button title="Confrim" color={"white"} />
        </View>
        <Button
          title="Back to cart"
          onPress={() => props.navigation.navigate("Cart")}
        />
      </FormContainer>
    </KeyboardAwareScrollView>
  );
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
export default Checkout;
