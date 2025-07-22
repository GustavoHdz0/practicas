import { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Button, TextInput } from "@react-native-material/core";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSelector from "../components/LanguageSelector";

export default function RecoverPasswordScreen({ navigation }) {
  const { t } = useLanguage();

  const [email, setEmail] = useState("");

  const handleRecoverPassword = async () => {
    if (!email) return Alert.alert(t.mailError, t.mailErrorMsg);

    try {
      const response = await fetch(
        "http://192.168.100.4:3000/api/auth/recover-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al recuperar contraseña");
      }

      Alert.alert("Éxito", data.message || "Revisa tu correo electrónico");
      setEmail("");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <LanguageSelector />
      <Text style={styles.title}>{t.recover}</Text>
      <Text style={styles.desc}>{t.recoverDesc}</Text>

      <TextInput
        label={t.mail}
        variant="outlined"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <Button
        color="#673AB7"
        title={t.recover}
        onPress={handleRecoverPassword}
        style={styles.regBtn}
      />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.signBtn}
      >
        <Text style={styles.signLbl}>{t.recoverLogin}</Text>
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
  desc: {
    fontSize: 16,
    fontWeight: "light",
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
