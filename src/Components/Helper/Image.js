import React from 'react';
import styles from './Image.module.css';

const Image = ({alt, ...props}) => {//a animação cinza da imagem q significa q ela esta carregando e ai mostra ela toda, se chama esqueleto (skeleton) (ta em cima do img)
  const [skeleton, setSkeleton] = React.useState(true);

  function handleLoad({target}) {
    setSkeleton(false);
    target.style.opacity = 1;//onLoad acontece sempe quando a imagem for carregada completamente entao eu colcoando target quer dizer a imagem especifica la vai ter uma opacidade de 1 ou seja vai mostrar
  }

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}      
      <img onLoad={handleLoad} className={styles.img} alt={alt} {...props}/>
    </div>
  )
}

export default Image
