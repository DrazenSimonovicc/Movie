import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme/theme";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";

import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../../api/moviedb";

import { PersonScreenNavigationProp } from "../types/types";

var { width, height } = Dimensions.get("window");

interface PersonInfo {
  profile_path?: number;
  name: string;
  place_of_birth: string;
  gender: number;
  birthday: string;
  known_for_department: string;
  popularity?: number;
  biography?: string;
}

export default function PersonScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation<PersonScreenNavigationProp>();
  const [favorite, setFavorite] = useState(false);
  const [person, setPerson] = useState<PersonInfo>({});
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    setLoading(false);
    if (data) setPerson(data);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    setLoading(false);
    if (data && data.cast) setPersonMovies(data.cast);
  };

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topWrap}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backBtn}
        >
          <Entypo name="chevron-left" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setFavorite(!favorite);
          }}
        >
          <Entypo name="heart" size={32} color={favorite ? "red" : "white"} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <View
          style={{
            shadowColor: "gray",
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 1,
          }}
        >
          <View style={styles.imgWrap}>
            <Image
              source={
                person.profile_path
                  ? { uri: image342(person.profile_path) }
                  : fallbackPersonImage
              }
              style={styles.img}
            />
          </View>
          <View style={styles.nameInfo}>
            <Text style={styles.name}>{person.name}</Text>
            <Text style={styles.birthPlace}>{person.place_of_birth}</Text>
          </View>
          <View style={styles.infoWrap}>
            <View style={styles.singleInfo}>
              <Text style={styles.info}>Gender</Text>
              <Text style={styles.infoText}>
                {person.gender === 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View style={styles.singleInfo}>
              <Text style={styles.info}>Birthday</Text>
              <Text style={styles.infoText}>{person.birthday}</Text>
            </View>
            <View style={styles.singleInfo}>
              <Text style={styles.info}>Known for</Text>
              <Text style={styles.infoText}>{person.known_for_department}</Text>
            </View>
            <View style={styles.singleInfo}>
              <Text style={styles.info}>Popularity</Text>
              <Text style={styles.infoText}>
                {person.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>
          <View style={styles.biographyWrap}>
            <Text style={styles.biographyTitle}>Biography</Text>
            <Text style={styles.biographyText}>
              {person.biography || "N/A"}
            </Text>
          </View>
          <View style={styles.movieListWrap}>
            <MovieList data={personMovies} title="Movies" hideSeeAll={true} />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#008080",
    paddingHorizontal: 16,
  },
  topWrap: {
    paddingTop: 20,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    backgroundColor: theme.background,
    borderRadius: 8,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  imgWrap: {
    alignItems: "center",
  },
  img: {
    width: width * 0.74,
    height: height * 0.43,
    borderRadius: 20,
    borderColor: "#E6E6FA",
    borderWidth: 1,
    marginTop: 20,
  },
  nameInfo: {
    alignItems: "center",
    marginVertical: 20,
    gap: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "900",
    color: "#E6E6FA",
    letterSpacing: 3,
  },
  birthPlace: {
    fontSize: 16,
    color: "#E6E6FA",
    opacity: 0.6,
    marginVertical: 0,
  },
  infoWrap: {
    backgroundColor: "#777",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 4,
    borderRadius: 20,
  },
  singleInfo: {
    padding: 3,
    alignItems: "center",
  },
  info: {
    color: "#fff",
    fontWeight: "600",
  },
  infoText: {
    color: "#fff",
    opacity: 0.6,
  },
  biographyWrap: {
    gap: 8,
    marginVertical: 20,
  },
  biographyTitle: {
    fontSize: 18,
    color: "#E6E6FA",
    fontWeight: "700",
  },
  biographyText: {
    fontSize: 14,
    color: "#E6E6FA",
    opacity: 0.6,
  },
  movieListWrap: { paddingBottom: 20 },
});
