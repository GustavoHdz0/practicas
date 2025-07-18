import { useState } from "react";
import {
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import LanguageSelector from "../components/LanguageSelector";
import { setItem } from "expo-secure-store";

export default function UserLoginScreen({ navigation }) {
  const { login } = useAuth();
  const { t } = useLanguage();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigation.replace("Products");
    } catch (err) {
      Alert.alert(t.login, t.productNameAlert);
    }
  };

  return (
    <View style={styles.container}>
      <LanguageSelector />
      <Text style={styles.title}>{t.login}</Text>

      <Text style={styles.label}>{t.username}</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>{t.password}</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title={t.loginButton} onPress={handleLogin} />

      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={styles.signBtn}
      >
        <Text style={styles.signLbl}>{t.createUser}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  signBtn: {
    marginTop: 20,
  },
  signLbl: {
    color: "#2196F3",
    textAlign: "center",
  },
});
