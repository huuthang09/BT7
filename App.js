import React from 'react';
import Screen from './Screen';
import { StyleSheet } from "react-native";

export default function App() {
    return (
      <Screen/>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
