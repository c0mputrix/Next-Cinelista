"use client";

import { useState } from "react";
import { Filme } from "@/types/types";
import styles from "./Card.module.css";
import Image from "next/image";
import Link from "next/link";
import { useResumoFilme } from "@/app/hooks/useResumoFilme";

type Props = {
  filme: Filme;
};

const Card = ({ filme }: Props) => {
  const { id, title, poster_path, overview, vote_average, release_date } =
    filme;

  const resume = useResumoFilme(overview, 256);

  // Alguns filmes (principalmente lançamentos) vêm da API sem poster.
  const [erroImagem, setErroImagem] = useState(false);
  const temPoster = Boolean(poster_path) && !erroImagem;

  const ano = release_date ? release_date.slice(0, 4) : null;

  return (
    <article className={styles.card}>
      <Link href={`/filmes/${id}`}>
        <div className={styles.card__media}>
          {temPoster ? (
            <Image
              className={styles.card__poster}
              src={`${process.env.NEXT_PUBLIC_TMDB_API_IMG_URL}${poster_path}`}
              alt={`Poster do filme ${title}`}
              width={500}
              height={750}
              onError={() => setErroImagem(true)}
            />
          ) : (
            <div className={styles.card__semPoster}>
              <span>{title}</span>
              <small>Poster indisponível</small>
            </div>
          )}

          <span className={styles.card__nota}>
            {vote_average > 0 ? `★ ${vote_average.toFixed(1)}` : "Em breve"}
          </span>
        </div>

        <div className={styles.card__info}>
          <h3 className={styles.card__title}>{title}</h3>
          {ano && <p className={styles.card__ano}>{ano}</p>}
          <p className={styles.card__description}>{resume}</p>
        </div>
      </Link>
    </article>
  );
};

export default Card;
