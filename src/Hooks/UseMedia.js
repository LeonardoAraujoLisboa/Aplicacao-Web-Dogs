import React from 'react'

const UseMedia = (media) => {
  const [match, setMatch] = React.useState(null);
  React.useEffect(() => {
    function changeMatch() {
      const {matches} = window.matchMedia(media);
      setMatch(matches)
    }
    changeMatch();
    window.addEventListener('resize', changeMatch);
    return () => {
      window.removeEventListener('resize', changeMatch);
    }//toda vez q eu adiciono evento no WINDOW eu tenho que limpar esse retorno

  }, [media]);

  return match;
}

export default UseMedia
