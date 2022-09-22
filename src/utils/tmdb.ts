import axios from "axios";
import { Movie, TMDBResponse } from "../../typing";
import { Category } from "../components/home/RowCards";
import fetchData from "./fetchData";

export const config = {
  API_KEY: `${process.env.API_KEY}`,
  BASE_URL: `${process.env.BASE_URL}`,
  BASE_URL_CATEGORY: `${process.env.BASE_URL_CATEGORY}`,
  IMAGE_URL: `${process.env.IMAGE_URL}`,
  VIDEO_URL: `${process.env.VIDEO_URL}`,
};

export type Genre = {
  id: number;
  name: string;
};

export type Recommendation = {
  name: string;
  url: string;
};

export const genres: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 666, name: "Now Playing Movies" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 333, name: "Trending" },
  { id: 10770, name: "TV Movie" },
  { id: 999, name: "Top Rated Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export const tvGenres: Genre[] = [
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 36, name: "History" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 555, name: "Series on Air"},
  { id: 777, name: "Top Rated Series"},
  { id: 37, name: "Western" },
];

export const recommendations: Recommendation[] = [
  {
    name: "Trending",
    url: `https://api.themoviedb.org/3/trending/all/day?api_key=${config.API_KEY}`,
  },
  {
    name: "Now Playing Movies",
    url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${config.API_KEY}&language=en-US&page=1`,
  },
  {
    name: "Series on Air",
    url: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${config.API_KEY}&language=en-US&page=1`,
  },
  {
    name: "Top Rated Movie",
    url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${config.API_KEY}&language=en-US&page=1`,
  },
  {
    name: "Top Rated Series",
    url: `https://api.themoviedb.org/3/tv/top_rated?api_key=${config.API_KEY}&language=en-US&page=1`,
  },
];
export async function getMoviesList() {
  let data: any[] = [];
  try {
    var url = `${config.BASE_URL}genre/movie/list?api_key=${config.API_KEY}`;
    const response = await axios.get(url);
    const responseData = await response.data;
    data = responseData.genres.map((data: any) => ({ ...data, type: "movie" }));
  } catch (error) {}
  return data;
}
export async function getSeriesList() {
  let data = [];
  try {
    const url = `${config.BASE_URL}genre/tv/list?api_key=${config.API_KEY}`;

    const response = await axios.get(url);

    const responseData = await response.data;
    data = responseData.genres.map((data: any) => ({ ...data, type: "tv" }));
  } catch (error) {}
  return data;
}

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const getRandomData = async () => {
  const data = [];
  try {
    let series = await getSeriesList();
    let movies = await getMoviesList();

    let newData = [...series, ...movies];

    for (var a = [], i = 0; i < newData.length; ++i) a[i] = i;
    a = shuffle(a);

    const nums = a;

    for (let i = 0; i < nums.length; i++) {
      data.push(newData[nums[i]]);
    }
  } catch (e) {
    console.log(e);
  }

  return data;
};

export async function getMoviesBycategory(
  id: number,
  type: string,
  shuf: boolean,
  page: number = 1
) {
  let data = {} as Category;
  try {
    const url = `${config.BASE_URL}discover/${type}?api_key=${config.API_KEY}&with_genres=${id}&page=${page}`;

    const response = await axios.get(url);
    var responseData = await response.data;
    const movies: Movie[] = responseData.results.map((result: Movie) => ({
      ...result,
      type,
    }));

    data = {
      page: responseData.page,
      results: shuf ? shuffle(movies) : movies,
      total_pages: responseData.total_pages,
      total_results: responseData.total_results,
    };
  } catch (error) {}
  return data;
}

export async function getCast(id: number) {
  let data = [];
  try {
    const url = `${config.BASE_URL}movie/${id}/credits?api_key=${config.API_KEY}`;

    const response = await axios.get(url);
    var responseData = await response.data;
    data = responseData;
  } catch (error) {}
  return data;
}

export async function getSimilarMovies(id: number) {
  try {
    let data = [];
    const url = `${config.BASE_URL}/movie/${id}/similar?api_key=${config.API_KEY}`;

    const response = await axios.get(url);
    var responseData = await response.data;
    data = responseData.results.map((result: Movie) => ({
      ...result,
      type: "movie",
    }));
    return data;
  } catch (error) {}
}

export async function getTrending(
  type: "tv" | "movie" | "day" = "day",
  page: number = 1
) {
  try {
    let data: TMDBResponse<Movie[]>;
    let url = `https://api.themoviedb.org/3/trending/${type}/day?api_key=${config.API_KEY}`;
    const response = await axios.get(url);
    var responseData = await response.data;
    const movies: Movie[] = responseData.results.map((result: Movie) => ({
      ...result,
      type,
    }));

    data = {
      page: responseData.page,
      results: movies,
      total_pages: responseData.total_pages,
      total_results: responseData.total_results,
    };
    return data;
  } catch (err) {}
}

export async function fetchVideo<T>(url: string,type: "movie" | "tv") {
  try {
    let data: TMDBResponse<T[]>;
    const response = await axios.get(url);
    var responseData = await response.data;
    const movies: T[] = responseData.results.map((result: T) => ({
      ...result,
      type,
    }));
    

    data = {
      page: responseData.page,
      results: movies,
      total_pages: responseData.total_pages,
      total_results: responseData.total_results,
    };
    return data;
  } catch (error) {
    
  }
}
