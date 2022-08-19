import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/Users/login";
import Register from "../Screens/Users/register";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default function UserNavigator() {
  return <MyStack />;
}
