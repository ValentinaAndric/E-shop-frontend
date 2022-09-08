import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../Shared/header";
import Icon from "react-native-vector-icons/FontAwesome";
import AuthGlobal from "../../Redux/Context/store/AuthGlobal";
import { logoutUser } from "../../Redux/Context/actions/Auth.actions";
import Banner from "../../Shared/banner";

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  return (
    <View>
      <Header />
      <Banner />
      <View style={{ marginTop: 10, marginLeft: 150 }}>
        <Text style={{ fontSize: 30 }}>Welcome</Text>
      </View>
      <View
        style={{
          marginLeft: 5,
          width: "50%",
          alignItems: "center",
          borderWidth: 2,
          borderRadius: 5,
          backgroundColor: "red",
          borderColor: "red",
          flexDirection: "row",
          marginTop: 100,
          marginLeft: 100,
        }}
      >
        <Icon name="arrow-left" color={"white"} size={20} />
        <Button
          title={"Shop now"}
          onPress={() => [props.navigation.navigate("Home")]}
          color={"white"}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          marginLeft: 100,
          width: "50%",
          alignItems: "center",
          borderWidth: 2,
          borderRadius: 5,
          backgroundColor: "#1e90ff",
          borderColor: "#1e90ff",
        }}
      >
        <Button
          title={"Sign Out"}
          onPress={() => [
            AsyncStorage.removeItem("jwt"),
            logoutUser(context.dispatch),
            props.navigation.navigate("Login"),
          ]}
          color={"white"}
        />
      </View>
    </View>
  );
};

export default UserProfile;
