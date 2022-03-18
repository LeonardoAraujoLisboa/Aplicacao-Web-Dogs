import React from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';
import {PropTypes} from 'prop-types';

const Feed = ({user}) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);

  React.useEffect(() => {
    let wait = false;
    function infiniteScroll(/* event */) {
      if (infinite === true) {
        const scroll = window.scrollY;//o total q eu ja dei de scroll na página
        const height = document.body.offsetHeight - window.innerHeight;//altura da página
        if ((scroll > height * 0.75) && !wait) {
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500);
        }//scroll maior que 75% do height
      }
    }
    window.addEventListener('wheel', infiniteScroll);//é a rodinha do mouse
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('wheel', infiniteScroll);
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [infinite])

  return (
    <div>
      {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto}/>}
      {pages.map((page) => (
      <FeedPhotos key={page} user={user} page={page} setModalPhoto={setModalPhoto} setInfinite={setInfinite}/>
      ))}
    </div>
  )
}

Feed.defaultProps = {
  user: 0,
}

Feed.propTypes = {
  user: /* PropTypes.string.isRequired */ PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),//esse oneoftype é para poder colocar mais de uma coisa, string e number
};//essas duas coisas é ideal q voce passe em todos os lugares que voce receba propriedades, mas nao vou passar nesse pq se nao vai ser muita viagem. E pode passar essa mesma coisa em todos

export default Feed
