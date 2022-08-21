import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import FormContainer from "../../Shared/Form/formContainer";
import Input from "../../Shared/Form/input";
import Icon from "react-native-vector-icons/FontAwesome";
import { Box } from "native-base";
import ctg from "../../assets/data/categories.json";

var { width } = Dimensions.get("window");
const ProductForm = (props) => {
  const [categories, setCategoties] = useState([]);
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [countInStock, setCountInStock] = useState();
  const [description, setDescription] = useState();
  const [pickerValue, setPickerValue] = useState();
  const [err, setErr] = useState();
  useEffect(() => {
    setCategoties(ctg);
  }, []);
  return (
    <ScrollView>
      <FormContainer title="Add Product">
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.imageContainer}>
            <Icon name="camera" style={{ color: "#1e90ff" }} size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.label}>
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Brand
          </Text>
        </View>
        <Input placeholder="Brand" name="brand" id="brand" value={brand} />
        <View style={styles.label}>
          <Text style={{ fontSize: 20 }}>Name</Text>
        </View>
        <Input placeholder="Name" name="name" id="name" value={name} />
        <View style={styles.label}>
          <Text style={{ fontSize: 20 }}> Price</Text>
        </View>
        <Input placeholder="Price" name="price" id="price" value={price} />
        <View style={styles.label}>
          <Text style={{ fontSize: 20 }}>Count in stock</Text>
        </View>
        <Input
          placeholder="Stock"
          name="stock"
          id="stock"
          value={countInStock}
          keyboardType={"numeric"}
        />
        <View style={styles.label}>
          <Text style={{ fontSize: 20 }}>Description</Text>
        </View>
        <Input
          placeholder="Description"
          name="description"
          id="description"
          value={description}
        />
        <View style={{ width: width }}>
          <Text style={{ fontSize: 20, marginLeft: 50, marginTop: 10 }}>
            Select your category: {pickerValue}
          </Text>
          <Picker
            mode="dropdown"
            selectedValue={ctg}
            onValueChange={(e) => setPickerValue(e)}
          >
            {categories.map((c) => {
              return <Picker.Item key={c.id} label={c.name} value={c.name} />;
            })}
          </Picker>
        </View>
        {err ? <Error message={err} /> : null}
        <View
          style={{
            borderWidth: 1,
            borderColor: "#1e90ff",
            backgroundColor: "#1e90ff",
            width: 200,
            justifyContent: "center",
            borderRadius: 5,
          }}
        >
          <Button title="Confirm" color={"white"} />
        </View>
      </FormContainer>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  label: {
    width: "80%",
    marginTop: 10,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 80,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "lightblue",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "gray",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});

export default ProductForm;
