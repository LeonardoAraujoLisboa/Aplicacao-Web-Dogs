import React from 'react';
import { PHOTO_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PhotoContent from '../Photo/PhotoContent';
import styles from './FeedModal.module.css';

const FeedModal = ({photo, setModalPhoto}) => {
  const {data, error, loading, request} = useFetch();

  React.useEffect(() => {
    const {url, options} = PHOTO_GET(photo.id);
    request(url, options);
  }, [photo, request]);

  function handleOutsideClick(event) {
    /* console.log('Target: ', event.target);//esse é mais especifico, quando eu clico na imagem ele mostrar a imagem mesmo a tag img
    console.log('Current: ', event.currentTarget);//Já esse se eu clicar na imagem ele mostra a div inteira. QUANDO EU CLICO FORA OS DOIS SAO IGUAIS O TARGET E O CURRENT */
    if (event.target === event.currentTarget) {
      setModalPhoto(null);
    }
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data}/>}
    </div>
  )
}

export default FeedModal
