import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppBar, FAB } from "@react-native-material/core";
import { useProducts } from "../contexts/ProductContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import LanguageSelector from "../components/LanguageSelector";

export default function ProductListScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const { products, fetchProducts } = useProducts();
  const { t } = useLanguage();
  const { logout } = useAuth();

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const handleLogout = async () => {
    await logout();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("RegisterProduct", { product: item })}
    >
      <View style={styles.card}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.image} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <StatusBar backgroundColor="#673AB7" barStyle={"dark-content"} />
      <AppBar
        title={t.title}
        centerTitle
        color="#673AB7"
        leading={
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Text style={styles.icon}>☰</Text>
          </TouchableOpacity>
        }
        trailing={<LanguageSelector inline={true} />}
      />

      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 15, paddingVertical: 20 }}
      />
      <FAB
        variant="extended"
        label={t.addProdButton}
        color="#673AB7"
        style={styles.addButton}
        onPress={() => navigation.navigate("RegisterProduct")}
        //onPress={() => navigation.navigate("UserInfo")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#f3f2f7",
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  desc: {
    fontStyle: "italic",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 150,
    marginTop: 10,
    borderRadius: 6,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 30,
  },
  icon: {
    fontSize: 30,
    color: "#fff",
    paddingHorizontal: 10,
  },
});
