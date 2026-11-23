import "@testing-library/jest-dom";
import { getTrendingMovies } from "./../lib/api/tmdb";
import { render, screen } from "@testing-library/react";
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