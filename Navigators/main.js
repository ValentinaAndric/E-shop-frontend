import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import HomeNavigator from "./homeNavigator";
import UserNavigator from "./userNavigator";
import CartNavigator from "./cartNavigator";
import AdminNavigator from "./adminNavigator";
import AuthGlobal from "../Redux/Context/store/AuthGlobal";
import CartIcon from "../Shared/cartIcon";
import { View } from "react-native";
const tab = createBottomTabNavigator();

const Main = () => {
  const context = useContext(AuthGlobal);
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
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
      <tab.Screen
        name="CartNavigator"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="shopping-cart" color={color} size={30} />
              <CartIcon />
            </View>
          ),
        }}
      />
      {context.stateUser.user.isAdmin == true ? (
        <tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="cog" color={color} size={30} />
            ),
          }}
        />
      ) : null}

      <tab.Screen
        name="User"
        component={UserNavigator}
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
