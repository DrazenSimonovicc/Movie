import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { fallbackMoviePoster, image185, searchMovies } from "../../api/moviedb";
import { debounce } from "lodash";
import { SearchScreenNavigationProp } from "../types/types";

const { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = (value: string) => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({
        query: value,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <View style={styles.container}>
      <View style={styles.inputWrap}>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
          style={styles.closeBtn}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          <Text style={styles.results}>Results ({results.length})</Text>
          <View style={styles.resultsWrap}>
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => {
                    navigation.push("MovieScreen", item);
                  }}
                >
                  <View style={styles.singleSearch}>
                    <Image
                      style={styles.img}
                      source={{
                        uri:
                          image185(item?.poster_path || "") ||
                          fallbackMoviePoster,
                      }}
                    />
                    <Text style={styles.movieName}>
                      {item?.title?.length > 22
                        ? item?.title?.slice(0, 22) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.movieTimeWrap}>
          <Image
            source={require("../../assets/searchMovie.jpg")}
            style={styles.searchMovieImg}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008080",
    padding: 10,
  },
  results: {
    fontSize: 16,
    color: "#fff",
    marginTop: 12,
  },
  inputWrap: {
    padding: 3,
    height: 63,
    borderRadius: 100,
    borderColor: "#fff",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#fff",
  },
  closeBtn: {
    width: 55,
    height: 55,
    borderRadius: 100,
    backgroundColor: "#888",
    alignItems: "center",
    justifyContent: "center",
  },
  resultsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  img: {
    width: width * 0.4,
    height: height * 0.3,
    marginBottom: 10,
  },
  singleSearch: {
    marginVertical: 8,
  },
  movieName: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.6,
  },
  movieTimeWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  searchMovieImg: {
    width: "100%",
    height: "80%",
  },
});
