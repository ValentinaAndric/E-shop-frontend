import ProductContainer from "../Screens/Products/productContainer";
import ProductDetail from "../Screens/Products/productDetail";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const stack = createStackNavigator();

function MyStack() {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Home screen"
        component={ProductContainer}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="Product Detail"
        component={ProductDetail}
        options={{
          headerShown: false,
        }}
      />
    </stack.Navigator>
  );
}
export default function HomeNavigator() {
  return <MyStack />;
}
