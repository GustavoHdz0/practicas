import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LanguageProvider } from "./src/contexts/LanguageContext";
import { ProductProvider } from "./src/contexts/ProductContext";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import UserLoginScreen from "./src/screens/UserLoginScreen";
import UserRegisterScreen from "./src/screens/UserRegisterScreen";
import ProductListScreen from "./src/screens/ProductListScreen";
import RegisterProductScreen from "./src/screens/RegisterProductScreen";
import UserInfoScreen from "./src/screens/UserInfoScreen";
import UserEditScreen from "./src/screens/UserEditScreen";
import { UserProvider } from "./src/contexts/UserContext";
import MapPickerScreen from "./src/screens/MapPickerScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user } = useAuth();

  return (
    <UserProvider>
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
            name="UserInfo"
            component={UserInfoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditUser"
            component={UserEditScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MapPicker"
            component={MapPickerScreen}
            options={{headerShown: false}}
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
    </UserProvider>
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
