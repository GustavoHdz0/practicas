import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListScreen from "../screens/ProductListScreen";
import UserInfoScreen from "../screens/UserInfoScreen";
import RegisterProductScreen from "../screens/RegisterProductScreen";
import UserEditScreen from "../screens/UserEditScreen";
import MapPickerScreen from "../screens/MapPickerScreen";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { useLanguage } from "../contexts/LanguageContext";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function ProductStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Products" component={ProductListScreen} />
      <Stack.Screen name="RegisterProduct" component={RegisterProductScreen} />
    </Stack.Navigator>
  );
}

function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserInfo" component={UserInfoScreen} />
      <Stack.Screen name="EditUser" component={UserEditScreen} />
      <Stack.Screen name="MapPicker" component={MapPickerScreen} />
    </Stack.Navigator>
  );
}

export default function DrawerNavigator() {
  const { t } = useLanguage();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
      }}
    >
      <Drawer.Screen
        name="ProductStack"
        component={ProductStack}
        options={{ title: t.title }}
      />
      <Drawer.Screen
        name="UserStack"
        component={UserStack}
        options={{ title: t.userTitle }}
      />
    </Drawer.Navigator>
  );
}
