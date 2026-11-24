// Extensão do Jest DOM: adiciona matchers como "toBeInTheDocument()"
import "@testing-library/jest-dom";
// Importa a função que será mockada
import { getTrendingMovies } from "./../lib/api/tmdb";
// Importa helpers para renderizar componentes e acessar a tela
import { render, screen } from "@testing-library/react";
// Importa a função de Server Component da página inicial
import Home from "./page";

jest.mock("./../lib/api/tmdb", () => ({
  getTrendingMovies: jest.fn(),
}));

test("Exibe o título na página inicial corretamente", async () => {
  // Faz o mock retornar uma lista vazia para o .map() do Grid não quebrar
  (getTrendingMovies as jest.Mock).mockResolvedValue([]);

  render(await Home());

  // Verifica o título que está no seu page.tsx ("Destaque")
  expect(screen.getByText("Destaque")).toBeInTheDocument();
});

test("Renderiza os filmes em destaque corretamente", async () => {

  (getTrendingMovies as jest.Mock).mockResolvedValue([
    {
      id: 1,
      title: "Filme teste",
      overview: "Resumo teste",
      poster_path: "public/next.svg",
      vote_average: 8.0,
    }
  ]);

  //Renderiza a página (internamente chama a função getTrendingMovies)
  render(await Home());
  //Verificar se o título renderizado aparece na tela
  expect(await screen.findByText("Filme teste")).toBeInTheDocument();
});  

test("Exibir uma mensagem quando não houver filmes disponíveis", async () => {
  (getTrendingMovies as jest.Mock).mockResolvedValue([]);

  //Renderiza a página (internamente chama a função getTrendingMovies)
  render(await Home());

  expect(screen.getByText("Nenhum filme encontrado")).toBeInTheDocument();
});