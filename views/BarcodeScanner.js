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
    alert(data);
  };

  if (hasPermission === null) {
    return <Text>Zezwól na dostęp do kamery</Text>;
  }
  if (hasPermission === false) {
    return <Text>Brak dostępu do kamery</Text>;
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

            {scanned && <Button title={'Skanuj ponownie'} onPress={() => setScanned(false)} />}
        </View>
    </ImageBackground>
  );
}
