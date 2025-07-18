import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LanguageProvider } from "./src/contexts/LanguageContext";
import { ProductProvider } from "./src/contexts/ProductContext";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import UserLoginScreen from "./src/screens/UserLoginScreen";
import UserRegisterScreen from "./src/screens/UserRegisterScreen";
import ProductListScreen from "./src/screens/ProductListScreen";
import RegisterProductScreen from "./src/screens/RegisterProductScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user } = useAuth();

  return (
    <ProductProvider key={user?._id || "guest"}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={UserLoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={UserRegisterScreen}
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
    </ProductProvider>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </LanguageProvider>
  );
}
