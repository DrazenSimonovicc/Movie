import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { theme } from "../theme/theme";

const { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View style={styles.container}>
      <Progress.CircleSnail
        size={160}
        thickness={12}
        color={theme.background}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,

    justifyContent: "center",
    alignItems: "center",
  },
});
