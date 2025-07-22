import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { TextInput, Button, AppBar } from "@react-native-material/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLanguage } from "../contexts/LanguageContext";
import { useUser } from "../contexts/UserContext";
import axios from "../services/api";

export default function UserEditScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const { userProfile, fetchUserProfile } = useUser();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userPfp, setUserPfp] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username || "");
      setEmail(userProfile.email || "");
      setPhoneNumber(userProfile.phoneNumber || "");
      setUserPfp(userProfile.userPfp || "");
      setAddress(userProfile.address || "");
    }
  }, [userProfile]);

  useEffect(() => {
    if (route.params?.selectedAddress) {
      setAddress(route.params.selectedAddress);
    }
  }, [route.params]);

  const handleSubmit = async () => {
    if (!username.trim() || !email.trim() || !phoneNumber.trim()) {
      Alert.alert(t.updateProfileFailTitle, t.updateProfileMissingFields);
      return;
    }

    try {
      await axios.put("/profile", {
        username,
        email,
        phoneNumber,
        address,
        userPfp,
      });
      await fetchUserProfile();
      Alert.alert(t.updateProfileSuccessTitle, t.updateProfileSuccessMessage);
      navigation.goBack();
    } catch (err) {
      const msg =
        err.response?.data?.error || err.response?.data?.msg || err.message;
      Alert.alert(t.updateProfileFailTitle, msg);
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
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <StatusBar backgroundColor="#673AB7" barStyle="dark-content" />
      <AppBar
        title={t.userEditTitle}
        centerTitle
        color="#673AB7"
        leading={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.icon}>く</Text>
          </TouchableOpacity>
        }
      />

      <View style={styles.centeredContainer}>
        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
          {userPfp ? (
            <Image source={{ uri: userPfp }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={{ fontSize: 12, color: "#aaa" }}>
                {t.uploadPhoto}
              </Text>
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
              from: "edituser",
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
          title={t.updateButton}
          onPress={handleSubmit}
          style={styles.saveButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
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
  saveButton: {
    marginTop: 10,
  },
  selectMapButton: {
    marginBottom: 20,
  },

  icon: {
    fontSize: 30,
    color: "#fff",
    paddingHorizontal: 10,
  },
});
