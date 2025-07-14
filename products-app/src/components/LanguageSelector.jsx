import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageSelector() {
  const { switchLanguage } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);

  const languages = [
    { label: "English", value: "en" },
    { label: "Español", value: "es" },
  ];

  const handleLanguageChange = (lang) => {
    switchLanguage(lang);
    setModalVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.icon}>🌎</Text>
      </TouchableOpacity>

      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.menu}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.value}
                style={styles.menuItem}
                onPress={() => handleLanguageChange(lang.value)}
              >
                <Text style={styles.menuText}>{lang.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  iconContainer: {
    backgroundColor: "#2196F3",
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  icon: {
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 10,
    width: 200,
    elevation: 5,
  },
  menuItem: {
    padding: 12,
    alignItems: "center",
  },
  menuText: {
    fontSize: 16,
    color: "#000",
  },
});