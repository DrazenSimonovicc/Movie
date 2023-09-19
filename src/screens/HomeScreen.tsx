import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "../theme/theme";
import { HomeScreenNavigationProp } from "../types/types";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import { fetchTrendingMovies } from "../../api/moviedb";
import { fetchTopRatedMovies } from "../../api/moviedb";
import { fetchUpcomingMovies } from "../../api/moviedb";

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data.results) setUpcoming(data.results);
    setLoading(false);
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) setTopRated(data.results);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={"#f7f7f7"} />
      <View style={styles.headerWrap}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProfileScreen");
          }}
        >
          <FontAwesome name="bars" size={24} color="#E6E6FA" />
        </TouchableOpacity>
        <Text style={styles.title}>
          <Text style={{ color: theme.text }}>M</Text>_DB
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SearchScreen");
          }}
        >
          <FontAwesome name="search" size={24} color="#E6E6FA" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {trending.length > 0 && <TrendingMovies data={trending} />}

          <View style={styles.movieListWrap}>
            <MovieList title="Upcoming" data={upcoming} hideSeeAll={false} />
          </View>
          <View style={styles.movieListWrap}>
            <MovieList title="Top Rated" data={topRated} hideSeeAll={false} />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#008080",
    paddingTop: 20,
  },
  headerWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: "700",
    color: "#E6E6FA",
    fontSize: 24,
  },
  movieListWrap: {
    padding: 12,
  },
});
