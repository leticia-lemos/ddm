import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg('Teste no próprio dispositivo!');
        return;
      }

      let { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      let { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();

      if (foregroundStatus !== 'granted' || backgroundStatus !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Carregando..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '80%', // Definindo altura para o mapa
  },
});