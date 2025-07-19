import { useState, useRef } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Alert, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, TextInput, AppBar } from "@react-native-material/core";
import { useProducts } from "../contexts/ProductContext";
import { useLanguage } from "../contexts/LanguageContext";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function RegisterProductScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();

  const { product } = route.params || {};
  const isEditing = !!product;

  const { addProduct, updateProduct } = useProducts();
  const { t } = useLanguage();

  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [imageUri, setImageUri] = useState(product?.image || null);
  const [cameraVisible, setCameraVisible] = useState(false);

  const [permission, requestPremission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImageUri(photo.uri);
      setCameraVisible(false);
    }
  };

  const handleAddOrUpdate = async () => {
    if (!name.trim()) return Alert.alert(t.productNameAlert);
    if (isEditing) {
      await updateProduct(product._id, name, description, imageUri);
    } else {
      await addProduct(name, description, imageUri);
    }
    navigation.goBack();
  };

  if (cameraVisible) {
    if (!permission?.granted) {
      return (
        <View style={styles.container}>
          <Text>{t.cameraUseMsg}</Text>
          <Button
            color="#673AB7"
            title={t.cameraButtonAllow}
            onPress={requestPremission}
          />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <CameraView style={StyleSheet.absoluteFill} ref={cameraRef} />
        <View style={styles.cameraOverlay}>
          <Button
            color="#673AB7"
            title={t.cameraButtonTakePhoto}
            onPress={handleTakePhoto}
          />
          <Button
            color="#F44336"
            title={t.cancelButton}
            onPress={() => setCameraVisible(false)}
          />
        </View>
      </View>
    );
  }

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
        title={isEditing ? t.editProduct : t.newProduct}
        titleStyle={{ color: "white" }}
        style={{ backgroundColor: "#673AB7" }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Button
          color="#673AB7"
          title={t.cameraButtonTakePhoto}
          onPress={() => setCameraVisible(true)}
        />
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        )}

        <TextInput
          style={styles.input}
          label={t.nameProduct}
          variant="outlined"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          label={t.descProduct}
          variant="outlined"
          value={description}
          onChangeText={setDescription}
        />

        <Button
          color="#673AB7"
          title={isEditing ? t.updateButton : t.saveButton}
          onPress={handleAddOrUpdate}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 6,
  },
  cameraOverlay: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    padding: 10,
    alignItems: "center",
    gap: 10,
  },
});
