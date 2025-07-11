import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../screens/Home";
import Details from "../screens/Details";
import CameraScreen from "../screens/CameraScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Details" component={Details} />
      <Drawer.Screen name="CameraScreen" component={CameraScreen} />
    </Drawer.Navigator>
  );
}
