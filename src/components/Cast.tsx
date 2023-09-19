import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { fallbackPersonImage, image185 } from "../../api/moviedb";

export default function Cast({ cast, navigation }) {
  return (
    <View>
      <Text style={styles.text}>Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.castWrap}
                onPress={() => {
                  navigation.navigate("PersonScreen", person);
                }}
              >
                <Image
                  style={styles.img}
                  source={{
                    uri: image185(person.profile_path) || fallbackPersonImage,
                  }}
                />
                <Text style={styles.character}>
                  {person.character?.length > 10
                    ? person.character.slice(0, 10) + "..."
                    : person.character}
                </Text>
                <Text style={styles.person}>
                  {person.original_name?.length > 10
                    ? person.original_name.slice(0, 10) + "..."
                    : person.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#E6E6FA",
    fontSize: 18,
    marginVertical: 5,
    paddingLeft: 16,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 100,
    resizeMode: "center",
    borderWidth: 1,
    borderColor: "#E6E6FA",
  },
  character: {
    fontSize: 10,
    color: "#E6E6FA",
    opacity: 0.9,
  },
  castWrap: {
    alignItems: "center",
    gap: 4,
    marginRight: 14,
  },
  person: {
    fontSize: 12,
    color: "#E6E6FA",
    opacity: 0.9,
  },
});
