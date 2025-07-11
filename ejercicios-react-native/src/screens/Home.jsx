import { View, Text, Button } from "react-native";
import CustomButton from "../components/CustomButton";

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      {/* <Button
        title="Ir a detalles"
        onPress={() => navigation.navigate("Details")}
      /> */}
      <CustomButton
        title="Ir a detalles"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}
