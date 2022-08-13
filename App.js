import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Banner from "./Shared/banner";
import Header from "./Shared/header";
import Main from "./Shared/Navigarors/main";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const myFunction = () => console.log("Hello world");

  return (
    <NavigationContainer>
      <Header />
      <Banner />
      <Main />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
