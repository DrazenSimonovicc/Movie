import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeIconWrap}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <AntDesign name="close" size={24} color="#E6E6FA" />
      </TouchableOpacity>
      <View style={styles.profileInfoWrap}>
        <Image source={require("../../assets/person.jpg")} style={styles.img} />
        <Text style={styles.profileInfoText}>userName</Text>
        <Text style={styles.profileInfoText}>Logout</Text>
      </View>
      <View style={styles.profile}>
        <Text style={styles.profileText}>My Account</Text>
        <Text style={styles.profileText}>Favorites</Text>
        <Text style={styles.profileText}>Settings</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008080",
  },
  closeIconWrap: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  profileInfoWrap: {
    marginTop: 60,
    padding: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  img: {
    width: 60,
    height: 60,
  },
  profile: {
    marginTop: 120,
    alignItems: "center",
    gap: 26,
  },
  profileText: {
    fontSize: 36,
    color: "#E6E6FA",
    fontWeight: "700",
  },
  profileInfoText: {
    color: "#E6E6FA",
    fontSize: 14,
  },
});
