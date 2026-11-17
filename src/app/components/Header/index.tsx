"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/filmes/em-alta", label: "Em alta" },
  { href: "/filmes/populares", label: "Populares" },
  { href: "/filmes/top-filmes", label: "Top Filmes" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <h1 className={styles.header__logo}>
          <Link href="/">
            Cine<span>lista</span>
          </Link>
        </h1>

        <nav className={styles.header__nav}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? styles.ativo : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
export default Header;
