import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React, { FC } from "react";
import { theme } from "../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { image185 } from "../../api/moviedb";

var { width, height } = Dimensions.get("window");

interface MovieItem {
  poster_path: string;
  title: string;
}

interface MovieListProps {
  title: string;
  data: MovieItem[];
  hideSeeAll?: boolean;
}

const MovieList: FC<MovieListProps> = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.titleTextWrap}>
        <Text style={styles.title}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 0 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("MovieScreen", item)}
            >
              <View style={styles.imgWrap}>
                <Image
                  source={{ uri: image185(item.poster_path) }}
                  style={styles.img}
                />
              </View>
              <Text style={styles.movieName}>
                {item.title && item.title.length > 14
                  ? item.title.slice(0, 14) + "..."
                  : item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  titleTextWrap: {
    padding: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#E6E6FA",
    fontSize: 18,
  },
  text: {
    color: theme.text,
    fontSize: 14,
  },
  movieName: {
    fontSize: 12,
    color: "#E6E6FA",
    opacity: 0.7,
    paddingLeft: 6,
  },
  imgWrap: {
    marginRight: 12,
    marginTop: 16,
    marginBottom: 12,
  },
  img: {
    width: width * 0.33,
    height: height * 0.22,
    borderRadius: 20,
  },
});
export default MovieList;
