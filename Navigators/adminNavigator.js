import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Product from "../Screens/Admin/product";
import ProductForm from "../Screens/Admin/productForm";
import Categories from "../Screens/Admin/categories";
import Orders from "../Screens/Admin/orders";
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Product"
        component={Product}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product Form"
        component={ProductForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default function AdminNavigator() {
  return <MyStack />;
}
