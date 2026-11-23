import { Filme } from "@/types/types";
import tmdbApi from "./axios";

type Data = {
  results: Filme[];
};

export const getTrendingMovies = async () => {
  const res = await tmdbApi.get<Data>(
    `/trending/movie/week?language=pt-BR&page=1`,
  );

  return res.data.results;
};

export const getMovieDetails = async (
  id: number,
): Promise<Filme | undefined> => {
  try {
    const res = await tmdbApi.get<Filme>(`/movie/${id}?language=pt-BR`);
    return res.data;
  } catch {
    // Filme inexistente (404) → a página mostra o "não encontrado"
    return undefined;
  }
};

export const getNowPlaying = async () => {
  const res = await tmdbApi.get<Data>(
    `/movie/now_playing?language=pt-BR&page=1`,
  );

  return res.data.results;
};

export const getPopularMovies = async () => {
  const res = await tmdbApi.get<Data>(`/movie/popular?language=pt-BR&page=1`);

  return res.data.results;
};

export const getTopRated = async () => {
  const res = await tmdbApi.get<Data>(`/movie/top_rated?language=pt-BR&page=1`);

  return res.data.results;
};
