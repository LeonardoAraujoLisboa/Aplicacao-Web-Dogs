import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import {ReactComponent as Dogs} from '../Assets/dogs.svg';
import { UserContext } from '../UserContext';


const Header = () => {
  const {data /*1 userLogout */} = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home"><Dogs /></Link>
        {data ? (<Link className={styles.login} to="/conta">
          {data.nome}
          {/*1 removi dai pq nao quero q ele fique em cima<button onClick={userLogout}>Sair</button> */}
          </Link>) : (<Link className={styles.login} to="/login">
            Login / Criar
            </Link>)}
      </nav>
    </header>
  )
}

export default Header
