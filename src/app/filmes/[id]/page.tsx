import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./DetalheFilme.module.css";
import { getMovieDetails } from "@/lib/api/tmdb";

type Props = {
  params: Promise<{
    id: number;
  }>;
};

const IMG_URL = process.env.NEXT_PUBLIC_TMDB_API_IMG_URL;

export const generateMetadata = async ({ params }: Props) => {
  const { id } = await params;

  const details = await getMovieDetails(id);

  if (!details) return;

  return {
    title: `${details.title} | Cinelista`,
    description: details.overview,
    openGraph: {
      title: `${details.title} | Cinelista`,
      description: details.overview,
      images: details.poster_path ? [`${IMG_URL}${details.poster_path}`] : [],
    },
  };
};

const formatarDuracao = (minutos?: number) => {
  if (!minutos) return null;
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
};

const DetalheFilme = async ({ params }: Props) => {
  const { id } = await params;
  //Fazer chamada API
  const details = await getMovieDetails(id);

  if (!details) return notFound();

  const {
    title,
    poster_path,
    backdrop_path,
    overview,
    vote_average,
    release_date,
    tagline,
    runtime,
    genres,
  } = details;

  const ano = release_date ? release_date.slice(0, 4) : null;
  const duracao = formatarDuracao(runtime);

  return (
    <div className={styles.detalhes}>
      {backdrop_path && (
        <div
          className={styles.detalhes__fundo}
          style={{ backgroundImage: `url(${IMG_URL}${backdrop_path})` }}
        />
      )}

      <Link className={styles.detalhes__voltar} href="/">
        ← Voltar
      </Link>

      <section className={styles.detalhes__container}>
        <figure className={styles.detalhes__figura}>
          {poster_path ? (
            <Image
              className={styles.detalhes__image}
              src={`${IMG_URL}${poster_path}`}
              alt={`Poster do filme ${title}`}
              width={500}
              height={750}
              priority
            />
          ) : (
            <div className={styles.detalhes__semPoster}>Poster indisponível</div>
          )}
        </figure>

        <article className={styles.detalhes__info}>
          <h2>{title}</h2>
          {tagline && <p className={styles.detalhes__tagline}>{tagline}</p>}

          <div className={styles.detalhes__meta}>
            <span className={styles.detalhes__nota}>
              {vote_average > 0 ? `★ ${vote_average.toFixed(1)}` : "Sem nota"}
            </span>
            {ano && <span>{ano}</span>}
            {duracao && <span>{duracao}</span>}
          </div>

          {genres && genres.length > 0 && (
            <ul className={styles.detalhes__generos}>
              {genres.map((g) => (
                <li key={g.id}>{g.name}</li>
              ))}
            </ul>
          )}

          <h3>Sinopse</h3>
          <p className={styles.detalhes__sinopse}>
            {overview || "Sinopse ainda não disponível em português."}
          </p>
        </article>
      </section>
    </div>
  );
};

export default DetalheFilme;
