import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Product from "../Screens/Admin/product";
import ListItem from "../Screens/Admin/listItem";
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Product"
        component={Product}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default function AdminNavigator() {
  return <MyStack />;
}
