import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Header from "./Shared/header";
import Main from "./Navigators/main";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";

export default function App() {
  const myFunction = () => console.log("Hello world");

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </NativeBaseProvider>
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
