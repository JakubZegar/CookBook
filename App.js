import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import NavBar from './components/Navbar';

export default function App() {
  return (
      <NavBar />
  );
}

const styles = StyleSheet.create({
  container: {
      display:"flex",
      flex: 1,
      alignItems: 'center',
      justifyContent: "center",
  },
  textStyle:{
      color:"#ffffff"
  },
});