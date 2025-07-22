import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

export default function CustomDrawerContent(props) {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image
          source={{ uri: user?.userPfp || "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.username || "Invitado"}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label={t.logout}
        onPress={logout}
        labelStyle={{ color: "red", fontWeight: "bold" }}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
});
