import { useState, useRef } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useProducts } from "../contexts/ProductContext";
import { useLanguage } from "../contexts/LanguageContext";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function RegisterProductScreen({ route, navigation }) {
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

  const handleAddOrUpdate = () => {
    if (!name.trim()) return alert(`${t.productNameAlert}`);
    if (isEditing) {
      updateProduct(product.id, name, description, imageUri);
    } else {
      addProduct(name, description, imageUri);
    }

    navigation.goBack();
  };

  if (cameraVisible) {
    if (!permission?.granted) {
      return (
        <View style={styles.container}>
          <Text>{t.cameraUseMsg}</Text>
          <Button
            title={`${t.cameraButtonAllow}`}
            onPress={requestPremission}
          />
        </View>
      );
    }

    return (
      <CameraView style={{ flex: 1 }} ref={cameraRef}>
        <View style={styles.cameraOverlay}>
          <Button
            title={`${t.cameraButtonTakePhoto}`}
            onPress={handleTakePhoto}
          />
          <Button
            title={`${t.cancelButton}`}
            onPress={() => setCameraVisible(false)}
          />
        </View>
      </CameraView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {isEditing ? `${t.editProduct}` : `${t.newProduct}`}
      </Text>

      <Button
        title={`${t.cameraButtonTakePhoto}`}
        onPress={() => setCameraVisible(true)}
      />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}

      <Text style={styles.label}>{t.nameProduct}</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>{t.descProduct}</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      {/* <View style={{ marginTop: 20 }}>
        <Button title={`${t.saveButton}`} onPress={handleAddOrUpdate} />
      </View> */}

      <Button
        title={isEditing ? `${t.updateButton}` : `${t.saveButton}`}
        onPress={handleAddOrUpdate}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
    flexGrow: 1,
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
  imagePreview: {
    width: "100%",
    height: 200,
    marginTop: 10,
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
