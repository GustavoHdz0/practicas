import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useProducts } from "../contexts/ProductContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import LanguageSelector from "../components/LanguageSelector";

export default function ProductListScreen({ navigation }) {
  const { products } = useProducts();
  const { t } = useLanguage();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.replace("Login");
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
    <View style={styles.container}>
      <TouchableOpacity style={styles.topLeftButton} onPress={handleLogout}>
        <Text style={styles.icon}>⍈</Text>
      </TouchableOpacity>
      <LanguageSelector />
      <Text style={styles.title}>{t.title}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 15 }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("RegisterProduct")}
      >
        <Text style={styles.addButtonText}>{t.addProdButton}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 70,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#f9f9f9",
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
    marginVertical: 10,
    borderRadius: 6,
  },
  addButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  topLeftButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 999,
  },
  icon: {
    fontSize: 24,
  },
});
