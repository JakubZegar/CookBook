import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ImageBackground, StatusBar } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ImageBackground source={require('../assets/bg1.jpg')} style={{width: '100%', height: '105%'}}>
        <StatusBar backgroundColor="black" barStyle={'light-content'} />
        <View
        style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            height:'70%',
            margin:'8%',
        }}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />

            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    </ImageBackground>
  );
}
