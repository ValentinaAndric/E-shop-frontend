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
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import FormContainer from "../../Shared/Form/formContainer";
import Input from "../../Shared/Form/input";
import Icon from "react-native-vector-icons/FontAwesome";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";
import mime from "mime";
import * as imagePicker from "expo-image-picker";

var { width } = Dimensions.get("window");
const ProductForm = (props) => {
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [countInStock, setCountInStock] = useState();
  const [description, setDescription] = useState();
  const [pickerValue, setPickerValue] = useState();
  const [err, setErr] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState();
  const [token, setToken] = useState();
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const [richDescription, setReachDescription] = useState();
  const [numRviews, setNumReviews] = useState(0);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setBrand(props.route.params.item.brand);
      setName(props.route.params.item.name);
      setPrice(props.route.params.item.price.toString());
      setDescription(props.route.params.item.description);
      setImage(props.route.params.item.image);
      setMainImage(props.route.params.item.image);
      setCategory(props.route.params.item.category.id);
      setCountInStock(props.route.params.item.countInStock.toString());
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${baseUrl}categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => alert("Error to load categories"));

    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await imagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    return () => {
      setCategories([]);
    };
  }, []);

  const pickImage = async () => {
    let result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: imagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setMainImage(result.uri);
      setImage(result.uri);
    }
  };
  const addProduct = () => {
    if (
      name == "" ||
      brand == "" ||
      price == "" ||
      description == "" ||
      category == "" ||
      countInStock == ""
    ) {
      setErr("Please fill in the form correctly");
    }
    let formData = new FormData();
    const newImageUri = "file:///" + image.split("file:/").join("");

    formData.append("image");
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("countInStock", countInStock);
    formData.append("richDescription", richDescription);
    formData.append("rating", rating);
    formData.append("numReviews", numRviews);
    formData.append("isFeatured", isFeatured);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    if (item !== null) {
      axios
        .put(`${baseUrl}products/${item.id}`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Product successfuly updated",
              text2: "success",
            });
            setTimeout(() => {
              props.navigation.navigate("Product");
            }, 500);
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Spmething went wrong",
            text2: "Please try again",
          });
        });
    } else {
      axios
        .post(`${baseUrl}products`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "New Product added",
              text2: "success",
            });
            setTimeout(() => {
              props.navigation.navigate("Product");
            }, 500);
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        });
    }
  };
  return (
    <ScrollView>
      <FormContainer title="Add Product">
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: mainImage }} />
          <TouchableOpacity style={styles.imagePicker}>
            <Icon
              name="camera"
              style={{ color: "#1e90ff" }}
              size={25}
              onPress={pickImage}
            />
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
        <Input
          placeholder="Brand"
          name="brand"
          id="brand"
          value={brand}
          onChangeText={(text) => {
            setBrand(text);
          }}
        />
        <View style={styles.label}>
          <Text style={{ fontSize: 20 }}>Name</Text>
        </View>
        <Input
          placeholder="Name"
          name="name"
          id="name"
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
        />
        <View style={styles.label}>
          <Text style={{ fontSize: 20 }}> Price</Text>
        </View>
        <Input
          placeholder="Price"
          name="price"
          id="price"
          value={price}
          onChangeText={(text) => {
            setPrice(text);
          }}
        />
        <View style={styles.label}>
          <Text style={{ fontSize: 20 }}>Count in stock</Text>
        </View>
        <Input
          placeholder="Stock"
          name="stock"
          id="stock"
          value={countInStock}
          keyboardType={"numeric"}
          onChangeText={(text) => {
            setCountInStock(text);
          }}
        />
        <View style={styles.label}>
          <Text style={{ fontSize: 20 }}>Description</Text>
        </View>
        <Input
          placeholder="Description"
          name="description"
          id="description"
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
        <View style={{ width: width }}>
          <Text style={{ fontSize: 20, marginLeft: 50, marginTop: 10 }}>
            Select your category: {pickerValue}
          </Text>
          <Picker
            mode="dropdown"
            selectedValue={category}
            onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
          >
            {categories.map((c) => {
              return <Picker.Item key={c.id} label={c.name} value={c.id} />;
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
          <Button
            title="Confirm"
            color={"white"}
            onPress={() => addProduct()}
          />
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
