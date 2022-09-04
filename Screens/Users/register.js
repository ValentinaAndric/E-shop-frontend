import React, { useEffect, useState } from "react";
import FormContainer from "../../Shared/Form/formContainer";
import Input from "../../Shared/Form/input";
import { View, StyleSheet, Button, Text } from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import baseUrl from "../../assets/common/baseUrl";
import Error from "../../Shared/Error";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (email == "" || name == "" || phone == "" || password == "") {
      setError("Please fill in the form correctly");
    }

    let user = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      isAdmin: false,
    };

    axios
      .post(`${baseUrl}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please login into your account",
          });
          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          typeOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };
  return (
    <FormContainer title={"Register"}>
      <Input
        placeholder={"Email"}
        name={"Email"}
        id={"Email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder={"Name"}
        name={"Name"}
        value={name}
        id={"Name"}
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder={"Phone number"}
        name={"phone"}
        id={"phone"}
        value={phone}
        keyboardType={"numeric"}
        onChangeText={(text) => setPhone(text)}
      />
      <Input
        placeholder={"Password"}
        name={"password"}
        id={"password"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.button}>
        {error ? <Error message={error} /> : null}
        <Button title="Register" color={"white"} onPress={() => register()} />
      </View>
      <Text style={{ marginTop: 10, fontSize: 15 }}>You have an account?</Text>
      <View>
        <Button
          title="Login"
          onPress={() => props.navigation.navigate("Login")}
        />
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1e90ff",
    marginTop: 20,
    borderRadius: 10,
    width: 150,
    height: 50,
    justifyContent: "center",
  },
});

export default Register;
