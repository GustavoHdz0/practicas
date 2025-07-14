import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LanguageProvider } from "./src/contexts/LanguageContext";
import { ProductProvider } from "./src/contexts/ProductContext";
import ProductListScreen from "./src/screens/ProductListScreen";
import RegisterProductScreen from "./src/screens/RegisterProductScreen";
import UserLoginScreen from "./src/screens/UserLoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
      <ProductProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={UserLoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Products"
              component={ProductListScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterProduct"
              component={RegisterProductScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ProductProvider>
    </LanguageProvider>
  );
}
