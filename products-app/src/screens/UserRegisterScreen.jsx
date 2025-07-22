import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Button, TextInput } from "@react-native-material/core";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSelector from "../components/LanguageSelector";
import axios from "../services/api";

export default function UserRegisterScreen({ navigation, route }) {
  const { t } = useLanguage();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userPfp, setUserPfp] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (route.params?.selectedAddress) {
      setAddress(route.params.selectedAddress);
    }
  }, [route.params]);

  const handleRegister = async () => {
    if (
      !username.trim() ||
      !email.trim() ||
      !phoneNumber.trim() ||
      !password.trim()
    ) {
      Alert.alert(t.userCreateAlertFail, t.productNameAlert);
      return;
    }

    try {
      await axios.post("/auth/register", {
        username,
        email,
        password,
        phoneNumber,
        address,
        userPfp,
      });
      Alert.alert(t.userCreateAlertOk, t.userCreateOk);
      navigation.replace("Login");
    } catch (err) {
      const msg =
        err.response?.data?.error || err.response?.data?.msg || err.message;
      Alert.alert(t.userCreateAlertFail, msg);
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(t.cameraUseMsg);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      const compressedBase64 = await compressImage(uri);
      const imageUri = `data:image/jpeg;base64,${compressedBase64}`;
      setUserPfp(imageUri);
    }
  };

  const compressImage = async (uri) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      {
        compress: 0.6,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
      }
    );
    return manipResult.base64;
  };

  return (
    <View style={styles.container}>
      <LanguageSelector />
      <Text style={styles.title}>{t.register}</Text>

      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        {userPfp ? (
          <Image source={{ uri: userPfp }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={{ fontSize: 12, color: "#aaa" }}>{t.uploadPhoto}</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        label={t.username}
        variant="outlined"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        label={t.mail}
        variant="outlined"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        label={t.phone}
        variant="outlined"
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TextInput
        label={t.password}
        variant="outlined"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        label={t.addressTitle}
        variant="outlined"
        style={styles.input}
        value={address}
        editable={false}
        placeholder={t.selectAddress}
      />

      <Button
        title={t.selectOnMap}
        onPress={() =>
          navigation.navigate("MapPicker", {
            from: "register",
            onSelectAddress: (address) => {
              setAddress(address);
            },
          })
        }
        style={styles.selectMapButton}
        color="#9575CD"
      />

      <Button
        color="#673AB7"
        title={t.registerButton}
        onPress={handleRegister}
        style={styles.regBtn}
      />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
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
  avatarContainer: {
    alignSelf: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
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
  selectMapButton: {
    marginBottom: 20,
  },
  signLbl: {
    color: "#673AB7",
    textAlign: "center",
  },
});
