import {StyleSheet, View} from "react-native";
import Home from "./src/screens/home/screen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Profile from "./src/screens/profile/screen";
import GeneralOffers from "./src/screens/offers/general";
import UserOffers from "./src/screens/offers/user";
import store from "./src/redux/store";
import {Provider} from "react-redux";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="GeneralOffers" component={GeneralOffers} />
          <Stack.Screen name="UserOffers" component={UserOffers} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
