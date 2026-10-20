import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./DetalheFilme.module.css";
import { getMovieDetails } from "@/lib/api/tmdb";

type Props = {
    params: Promise<{
        id: number;
    }>
};

export const generateMetadata = async ({ params }: Props) => {
    const { id } = await params;

    const details = await getMovieDetails(id);

    if(!details)
        return;

    return {
        title: `${details.title} | Cinelista`,
        description: details.overview,
        openGraph: {
            title: `${details.title} | Cinelista`,
            description: details.overview,
            images: [`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${details.poster_path}`],
        }
    };
};

const DetalheFilme = async ({ params }: Props) => {
    const { id } = await params;
    //Fazer chamada API
    const details = await getMovieDetails(id);

    if(!details) 
        return notFound();

    const { title, poster_path, overview, vote_average} = details;

   
    return (
         <>
            <div className={styles.detalhes}>
                <div className={styles.detalhes__container}/>
                <Link className={styles.detalhes__voltar} href= "/">Voltar</Link>
                <section>
                    <figure>
                        <img src={poster_path} alt= {`Poster do filme ${title}`} />
                        src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${details.poster_path}`} 
                        alt={`Poster do filme ${title}`} 
                    </figure>
                    <article className={styles.detalhes__info}>
                        <h2>{title}</h2>
                        <p>{overview}</p>
                        <p>Nota: {vote_average}</p>
                    </article>
                </section>
            </div>
        </>
    )
}

export default DetalheFilme;