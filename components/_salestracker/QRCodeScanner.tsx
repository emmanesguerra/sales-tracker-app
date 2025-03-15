import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera, CameraView } from "expo-camera";

interface QRCodeScannerProps {
  onScan: (data: string) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScan }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);

  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermission();
  }, []);

  if (hasPermission === null) {
    return <View style={styles.permissionContainer}><Text>Requesting camera permission...</Text></View>;
  }

  if (hasPermission === false) {
    return <View style={styles.permissionContainer}><Text>No access to camera</Text></View>;
  }

  const handleScanResult = ({ data }: { data: string }) => {
    if (!scanned) {
      setScanned(true);
      onScan(data);
      setTimeout(() => setScanned(false), 2000); // Reset scanner after 2 seconds
    }
  };

  return (
    <View style={styles.cameraBox}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleScanResult}
        barcodeScannerSettings={{ barcodeTypes: ["qr", "pdf417"] }}
        style={StyleSheet.absoluteFillObject}
        enableTorch={torch}
        zoom={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraBox: {
    height: 250,
    width: 250,
    overflow: "hidden",
    borderRadius: 10,
  },
});

export default QRCodeScanner;
