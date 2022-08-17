import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../Shared/header";
import ProductContainer from "../Screens/Products/productContainer";

const tab = createBottomTabNavigator();

const Main = () => {
  return (
    <tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#00B2FF",
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <tab.Screen
        name="Home"
        component={ProductContainer}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
      <tab.Screen
        name="Cart"
        component={Header}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="shopping-cart" color={color} size={30} />
          ),
        }}
      />
      <tab.Screen
        name="Admin"
        component={Header}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={30} />
          ),
        }}
      />
      <tab.Screen
        name="User"
        component={Header}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />
    </tab.Navigator>
  );
};

export default Main;
