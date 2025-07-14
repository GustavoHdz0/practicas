import { useState } from "react";
import { View, Button, Text, TextInput, StyleSheet } from "react-native";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSelector from "../components/LanguageSelector";

export default function UserLoginScreen() {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <LanguageSelector />
      <Text style={styles.title}>{t.login}</Text>

      <Text style={styles.label}>{t.username}</Text>
      <TextInput style={styles.input} value={""} />

      <Text style={styles.label}>{t.password}</Text>
      <TextInput style={styles.input} value={""} />
      <View style={styles.container}>
        <Button title={`${t.loginButton}`} style={{}}/>
      </View>
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
  label: {
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    padding: 10,
  },
});
