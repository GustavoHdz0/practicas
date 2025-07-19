import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button, TextInput } from "@react-native-material/core";
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
      const msg =
        err.response?.data?.error || err.response?.data?.msg || err.message;
      Alert.alert(t.userCreateAlertFail, msg);
    }
  };

  return (
    <View style={styles.container}>
      <LanguageSelector />
      <Text style={styles.title}>{t.register}</Text>

      <TextInput
        label={t.username}
        variant="outlined"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        label={t.password}
        variant="outlined"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        color="#673AB7"
        title={t.registerButton}
        onPress={handleRegister}
        style={styles.regBtn}
      />

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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
  },
  regBtn: {
    marginTop: 10,
  },
  signBtn: {
    marginTop: 20,
  },
  signLbl: {
    color: "#673AB7",
    textAlign: "center",
  },
});
