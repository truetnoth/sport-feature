import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const location = useLocation();

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoTJ}>Т—Ж</span>
            <span className={styles.logoSport}>Спорт</span>
          </Link>
          <nav className={styles.nav}>
            <Link
              to="/"
              className={`${styles.navLink} ${location.pathname === '/' ? styles.navLinkActive : ''}`}
            >
              Упражнения
            </Link>
            <Link
              to="/favorites"
              className={`${styles.navLink} ${location.pathname === '/favorites' ? styles.navLinkActive : ''}`}
            >
              Избранное
            </Link>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
