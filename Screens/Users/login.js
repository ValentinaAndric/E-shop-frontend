import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Input from "../../Shared/Form/input";
import FormContainer from "../../Shared/Form/formContainer";

const Login = (props) => {
  return (
    <FormContainer title={"Login"}>
      <Input placeholder={"Email"} name={"email"} id={"email"} />
      <Input placeholder={"Password"} name={"password"} id={"password"} />
      <View style={styles.buttonGroup}>
        <View style={styles.button}>
          <Button title="Login" color={"white"} />
        </View>
        <Text style={styles.text}>Do not have account?</Text>
        <View>
          <Button
            title="Register"
            onPress={() => props.navigation.navigate("Register")}
          />
        </View>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
    marginTop: 40,
  },
  text: {
    marginBottom: 10,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#1e90ff",
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
    height: 50,
    justifyContent: "center",
  },
});

export default Login;
