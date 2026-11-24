import { getTrendingMovies } from "@/lib/api/tmdb";
import Grid from "./components/Grid";
import Title from "./components/Title";

export default async function Home() {
  const filmes = await getTrendingMovies();
  return (
    <>
      <Title title="Destaque" />
      {
        filmes && filmes.length > 0 ? (
          <Grid filmes={filmes} />
        ) : (
          <p className="text-center text-gray-500">Nenhum filme encontrado</p>
        )
      }
    </>
  );
}
