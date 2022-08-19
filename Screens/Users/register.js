import React from "react";
import FormContainer from "../../Shared/Form/formContainer";
import Input from "../../Shared/Form/input";
import { View, StyleSheet, Button, Text } from "react-native";

const Register = (props) => {
  return (
    <FormContainer title={"Register"}>
      <Input placeholder={"Email"} name={"Email"} id={"Email"} />
      <Input placeholder={"Name"} name={"Name"} id={"Name"} />
      <Input
        placeholder={"Phone number"}
        name={"phone"}
        id={"phone"}
        keyboardType={"numeric"}
      />
      <Input placeholder={"Password"} name={"password"} id={"password"} />
      <View style={styles.button}>
        <Button title="Register" color={"white"} />
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
