import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useLanguage } from "../contexts/LanguageContext";

export default function MapPickerScreen({ navigation, route }) {
  const { t } = useLanguage();
  const origin = route.params?.from;

  const [region, setRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(t.permissionLocation);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });

    let [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (place) {
      const fullAddress = `${place.name || ""}, ${place.street || ""}, ${
        place.city || ""
      }, ${place.region || ""}, ${place.country || ""}`;
      setAddress(fullAddress);
    }
  };

  const handleConfirm = () => {
    if (selectedLocation && address) {
      if (route.params?.onSelectAddress) {
        route.params.onSelectAddress(address, selectedLocation);
      }
      navigation.goBack();
    }
  };

  if (!region) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} onPress={handleMapPress}>
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      <View style={styles.addresBox}>
        <Text>{t.addressLbl}</Text>
        <Text>{address || t.addressMsgSelect}</Text>
        <Button
          title={t.addressConfirm}
          onPress={handleConfirm}
          disabled={!address}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: "75%",
  },
  addressBox: {
    padding: 10,
    backgroundColor: "#fff",
  },
});
