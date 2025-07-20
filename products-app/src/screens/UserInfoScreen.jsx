import { View, Text, StyleSheet, Image, StatusBar } from "react-native";
import { AppBar, FAB } from "@react-native-material/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLanguage } from "../contexts/LanguageContext";
import { useUser } from "../contexts/UserContext";

export default function UserInfoScreen({navigation}) {
  const insets = useSafeAreaInsets();

  const { userProfile } = useUser();
  const { t } = useLanguage();

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
      <StatusBar backgroundColor="#673AB7" barStyle={"dark-content"} />
      <AppBar
        title={t.userTitle}
        centerTitle
        color="#673AB7"
      />
      <View style={styles.centeredContainer}>
        {userProfile?.userPfp && (
          <Image source={{ uri: userProfile.userPfp }} style={styles.image} />
        )}
        <View style={styles.container}>
          <Text style={styles.label}>{t.username}</Text>
          <Text style={styles.value}>{userProfile?.username}</Text>

          <Text style={styles.label}>{t.mail}</Text>
          <Text style={styles.value}>{userProfile?.email}</Text>

          <Text style={styles.label}>{t.phone}</Text>
          <Text style={styles.value}>{userProfile?.phoneNumber}</Text>

          <Text style={styles.label}>{t.address}</Text>
          <Text style={styles.value}>{userProfile?.address}</Text>
        </View>
      </View>
      <FAB
        variant="extended"
        label={t.editButton}
        color="#673AB7"
        style={styles.addButton}
        onPress={() => navigation.navigate("EditUser")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "80%",
    paddingHorizontal: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 70,
    marginTop: 30,
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 30,
  },
});
