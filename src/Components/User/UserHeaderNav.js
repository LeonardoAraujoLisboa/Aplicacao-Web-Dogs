import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { UserContext } from '../../UserContext';
import {ReactComponent as MinhasFotos} from '../../Assets/feed.svg';
import {ReactComponent as Estatisticas} from '../../Assets/estatisticas.svg';
import {ReactComponent as AdicionarFotos} from '../../Assets/adicionar.svg';
import {ReactComponent as Sair} from '../../Assets/sair.svg';
import styles from './UserHeaderNav.module.css';
import UseMedia from '../../Hooks/UseMedia';

const UserHeaderNav = () => {
/*   const [mobile, setMobile] = React.useState(null); */
  const {userLogout} = React.useContext(UserContext);
  const mobile = UseMedia('(max-width: 40rem)')
  const [mobileMenu, setMobileMenu] = React.useState(false);
/*   const {matches} = window.matchMedia('(max-width: 40rem)');//isso é como se fosse um mediaquery como eu passaria normal no css
  /* console.log(teste) *///ai eu vou ver o matches que vai ter true ou false. true se o browser tiver com um tamanho maximo de 40rem e false se nao tiver. entao eu posso desestruturar logo isso  */
  const {pathname} = useLocation();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);//isso é para que quando eu clique em algum item do mobile ele ja esconda o mobile

  return (
    <>
      {mobile && <button aria-label="Menu" onClick={() => setMobileMenu(!mobileMenu)} className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`}></button>}
      <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
        <NavLink to="/conta" end><MinhasFotos />{mobile && 'Minhas Fotos'}</NavLink>
        <NavLink to="/conta/estatisticas"><Estatisticas />{mobile && 'Estatísticas'}</NavLink>
        <NavLink to="/conta/postar"><AdicionarFotos />{mobile && 'Adicionar Foto'}</NavLink>
        <button onClick={userLogout}><Sair />{mobile && 'Sair'}</button>
      </nav>
    </>
  )
}
//${mobileMenu && styles.mobileButtonActive} isso significa que se o mobileMenu estiver (true) coloque essa classe mobileButtonActive
export default UserHeaderNav
