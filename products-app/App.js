import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LanguageProvider } from "./src/contexts/LanguageContext";
import { ProductProvider } from "./src/contexts/ProductContext";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import { UserProvider } from "./src/contexts/UserContext";

import DrawerNavigator from "./src/navigations/DrawerNavigator";
import UserLoginScreen from "./src/screens/UserLoginScreen";
import UserRegisterScreen from "./src/screens/UserRegisterScreen";
import MapPickerScreen from "./src/screens/MapPickerScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user } = useAuth();

  if (!user) {
    return (
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
        <Stack.Screen name="MapPicker" component={MapPickerScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    );
  }

  return (
    <UserProvider>
      <ProductProvider key={user?._id}>
        <DrawerNavigator />
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
