import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../../api/moviedb";

var { width, height } = Dimensions.get("window");

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("MovieScreen", item);
  };

  const MovieCard = ({ item, handleClick }) => {
    return (
      <TouchableOpacity onPress={() => handleClick(item)}>
        <Image
          source={{ uri: image500(item.poster_path) }}
          style={styles.img}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  text: {
    color: "#E6E6FA",
    fontSize: 18,
    marginBottom: 5,
    padding: 20,
  },
  img: {
    width: width * 0.6,
    height: height * 0.4,
    borderRadius: 20,
  },
});
