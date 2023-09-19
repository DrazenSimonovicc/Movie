import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../../api/moviedb";
import { MovieScreenNavigationProp } from "../types/types";
var { width, height } = Dimensions.get("window");

interface MovieData {
  poster_path?: number;
  title?: string;
  status?: string;
  release_date?: string;
  runtime?: number;
  genres?: { name: string }[];
  overview?: string;
  id: number;
}

interface RouteParams {
  id: number;
}

export default function MovieScreen() {
  const [favorite, setFavorite] = useState(false);
  const [cast, setCast] = useState<number[]>([]);
  const [similarMovies, setSimilarMovies] = useState<number[]>([]);
  const [movie, setMovie] = useState<MovieData>({});
  const [loading, setLoading] = useState(true);
  const { params: item } = useRoute<RouteParams>();
  const navigation = useNavigation<MovieScreenNavigationProp>();

  const getMovieDetils = async (id: number) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    setLoading(false);
  };

  const getMovieCredits = async (id: number) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
  };

  const getSimilarMovies = async (id: number) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
  };

  useEffect(() => {
    if (item && item.id) {
      setLoading(true);
      getMovieDetils(item.id);
      getMovieCredits(item.id);
      getSimilarMovies(item.id);
    }
  }, [item]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
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
            style={styles.favorite}
          >
            <Entypo name="heart" size={32} color={favorite ? "red" : "white"} />
          </TouchableOpacity>
        </View>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <View>
              <Image
                source={{
                  uri: image500(movie.poster_path) || fallbackMoviePoster,
                }}
                style={styles.img}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23,23,23,0.8)",
                  "rgba(23,23,23,1)",
                ]}
                style={styles.gradient}
                start={{ x: 0.5, y: 0.2 }}
                end={{ x: 0.5, y: 1 }}
              />
            </View>
            <View style={styles.movieTitleWrap}>
              <Text style={styles.movieName}>{movie.title}</Text>
              {movie.id ? (
                <Text style={styles.date}>
                  {movie.status} - {movie.release_date?.split("-")[0]} -{" "}
                  {movie.runtime} min
                </Text>
              ) : null}
            </View>
            <View style={styles.gendre}>
              {movie.genres?.map((genre, index) => {
                let showLine = index + 1 != movie.genres.length;
                return (
                  <Text key={index} style={styles.gendreText}>
                    {genre.name} {showLine ? "-" : null}
                  </Text>
                );
              })}
            </View>
            <View style={styles.descriptionWrap}>
              <Text style={styles.description}>{movie.overview}</Text>
            </View>
            <Cast navigation={navigation} cast={cast} />
            <View style={styles.movieListWrap}>
              <MovieList
                title="Similar Movies"
                data={similarMovies}
                hideSeeAll={true}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#008080",
    alignItems: "center",
  },

  backBtn: {
    backgroundColor: theme.background,
    borderRadius: 8,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  favorite: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },

  img: {
    width: width,
    height: height * 0.55,
    resizeMode: "cover",
  },
  gradient: {
    position: "absolute",
    width: width,
    height: height * 0.55,
  },
  movieTitleWrap: {
    marginTop: "-30%",
    alignItems: "center",
  },
  movieName: {
    color: "#E6E6FA",
    opacity: 0.7,
    fontSize: 24,
    textAlign: "center",
  },
  date: {
    color: "#E6E6FA",
    opacity: 0.8,
    fontSize: 16,
    marginTop: 16,
  },
  gendre: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  gendreText: {
    fontSize: 14,
    color: "#E6E6FA",
  },
  descriptionWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  description: {
    color: "#E6E6FA",
    opacity: 0.6,
  },
  movieListWrap: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
});
