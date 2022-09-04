import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Input from "../../Shared/Form/input";
import FormContainer from "../../Shared/Form/formContainer";
import Error from "../../Shared/Error";
//Context
import AuthGlobal from "../../Redux/Context/store/AuthGlobal";
import { loginUser } from "../../Redux/Context/actions/Auth.actions";

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("Home screen");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = { email, password };
    if (email === "" || password === "") {
      setError("Please fill your credentials");
    } else {
      loginUser(user, context.dispatch);
    }
  };
  return (
    <FormContainer title={"Login"}>
      <Input
        placeholder={"Email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder={"Enter Password"}
        name={"password"}
        id={"password"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <View style={styles.button}>
          <Button
            title="Login"
            color={"white"}
            onPress={() => handleSubmit()}
          />
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
