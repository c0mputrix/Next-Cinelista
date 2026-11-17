export interface Filme {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  vote_average: number;
  release_date: string;
  // Campos que só vêm na página de detalhes
  tagline?: string;
  runtime?: number;
  genres?: { id: number; name: string }[];
}
