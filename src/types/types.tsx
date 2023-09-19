import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  HomeScreen: undefined;
  MovieScreen: undefined;
  PersonScreen: undefined;
  SearchScreen: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;

export type MovieScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MovieScreen"
>;
export type PersonScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PersonScreen"
>;
export type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SearchScreen"
>;
