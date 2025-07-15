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
import LanguageSelector from "../components/LanguageSelector";
import axios from "../services/api";

export default function UserRegisterScreen({ navigation }) {
  const { t } = useLanguage();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert(t.userCreateAlertFail, t.productNameAlert);
      return;
    }

    try {
      await axios.post("/auth/register", { username, password });
      Alert.alert(t.userCreateAlertOk, t.userCreateOk);
      navigation.replace("Login");
    } catch (err) {
      // Alert.alert(t.userCreateAlertFail, t.userCreateFail);
      const msg =
        err.response?.data?.error || err.response?.data?.msg || err.message;
      Alert.alert(t.userCreateAlertFail, msg);
    }
  };

  return (
    <View style={styles.container}>
      <LanguageSelector />
      <Text style={styles.title}>{t.register}</Text>

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

      <Button title={t.registerButton} onPress={handleRegister} />

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.signBtn}
      >
        <Text style={styles.signLbl}>{t.haveAccount}</Text>
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
