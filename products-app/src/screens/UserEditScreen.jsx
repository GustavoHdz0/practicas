import { useState, useEffect } from "react";
import { View, StyleSheet, Alert, StatusBar } from "react-native";
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
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username || "");
      setEmail(userProfile.email || "");
      setPhoneNumber(userProfile.phoneNumber || "");
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
      <AppBar title={t.userEditTitle} centerTitle color="#673AB7" />
      <View style={styles.centeredContainer}>
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
  input: {
    marginBottom: 15,
  },
  saveButton: {
    marginTop: 10,
  },
  selectMapButton: {
    marginBottom: 20,
  },
});
