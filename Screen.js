import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Audio } from "expo-av";
import { Button } from "react-native-elements";

export default function Screen() {
  const [sound, setSound] = useState({
    soundObject: null,
  });
  useEffect(() => {
    createSound();
  }, []);

  async function createSound() {
    const soundObject = new Audio.Sound();

    const mode = {
      staysActiveInBackground: true,
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    };
    await Audio.setAudioModeAsync(mode);
    await soundObject.loadAsync(require("./assets/audio/ring.mp3"));
    setSound({
      soundObject: soundObject,
    });
  }

  async function playSound() {
    setTimeout(async () => {
      if (sound.soundObject != null) {
        await sound.soundObject.setPositionAsync(0);
        await sound.soundObject.playAsync();
        await sound.soundObject.setIsLoopingAsync(true);
      }
    }, 3000);
  }

  async function stopSound() {
    if (sound.soundObject != null) {
      await sound.soundObject.stopAsync();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txtStyles}>Sau khi nhấn thì 3s sau nhạc sẽ chạy</Text>
      <Button
        buttonStyle={styles.btnPlayContainer}
        title="Play"
        onPress={playSound}
      />
      <Button
        buttonStyle={styles.btnStopContainer}
        title="Stop"
        onPress={stopSound}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  txtStyles: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  btnPlayContainer: {
    margin: 20,
    backgroundColor: "#F00",
  },

  btnStopContainer: {
    margin: 20,
    backgroundColor: "#00F",
  },
});
