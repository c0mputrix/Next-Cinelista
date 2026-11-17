import styles from "./Foot.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footer__text}>
        <strong>Cinelista</strong> · Todos os direitos reservados.
      </p>
      <p className={styles.footer__credito}>
        Dados e imagens fornecidos pelo TMDB.
      </p>
    </footer>
  );
};
export default Footer;
