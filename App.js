import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Banner from "./Shared/banner";
import Header from "./Shared/header";

export default function App() {
  const myFunction = () => console.log("Hello world");

  return (
    <SafeAreaView>
      <Header />
      <Banner />
    </SafeAreaView>
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
