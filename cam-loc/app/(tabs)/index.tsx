import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import { useState, useRef, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function App() {
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [imageUri, setImageUri] = useState(null);
  const cameraRef = useRef(null);

  const captureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
      setImageUri(photo.uri);
      await MediaLibrary.createAssetAsync(photo.uri);
    }
  };

  useEffect(() => {
    (async () => {
      if (cameraPermission && !cameraPermission.granted) {
        await requestCameraPermission();
      }
      if (mediaPermission && !mediaPermission.granted) {
        await requestMediaPermission();
      }
    })();
  }, [cameraPermission, mediaPermission]);

  if (!cameraPermission || !mediaPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Precisamos da sua permissão para acessar a câmera e a biblioteca de mídia.
        </Text>
        <Button onPress={requestCameraPermission} title="Conceder Permissão" />
        <Button onPress={requestMediaPermission} title="Conceder Permissão" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} type={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Ionicons name={"sync-sharp"} size={32} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={captureImage}>
            <Ionicons name={"camera"} size={32} style={styles.captureIcon} />
          </TouchableOpacity>
        </View>
      </CameraView>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.capturedImage} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  captureIcon: {
    fontSize: 32,
    color: "white",
  },
  icon: {
    fontSize: 32,
    color: "white",
    marginLeft: 10,
  },
  capturedImage: {
    width: '100%',
  },
});