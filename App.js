import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Main from "./Navigators/main";
import { NavigationContainer } from "@react-navigation/native";
import store from "./Redux/store";
import { Provider } from "react-redux";
import { NativeBaseProvider } from "native-base";
import Auth from "./Redux/Context/store/Auth";
export default function App() {
  const myFunction = () => console.log("Hello world");

  return (
    <Auth>
      <NativeBaseProvider>
        <Provider store={store}>
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        </Provider>
      </NativeBaseProvider>
    </Auth>
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
