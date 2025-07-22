import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button, TextInput } from "@react-native-material/core";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import LanguageSelector from "../components/LanguageSelector";

export default function UserLoginScreen({ navigation }) {
  const { login } = useAuth();
  const { t } = useLanguage();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(username, password);
    } catch (err) {
      Alert.alert(t.login, t.productNameAlert);
    }
  };

  return (
    <View style={styles.container}>
      <LanguageSelector style={styles.wrapper} />
      <Text style={styles.title}>{t.login}</Text>

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
        title={t.loginButton}
        onPress={handleLogin}
        style={styles.logBtn}
      />

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
    backgroundColor: "#fff",
  },
  wrapper: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  logBtn: {
    marginTop: 15,
  },
  input: {
    marginBottom: 10,
  },
  signBtn: {
    marginTop: 20,
  },
  signLbl: {
    color: "#673AB7",
    textAlign: "center",
  },
});
