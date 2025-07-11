import { TouchableOpacity, Text, StyleSheet, Button } from "react-native";

export default function CustomButton({title, onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4e8bed",
    padding: 12,
    borderRadius: 8,
    margin: 10,
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
});
