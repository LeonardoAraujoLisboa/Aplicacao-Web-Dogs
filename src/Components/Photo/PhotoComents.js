import React from 'react'
import { UserContext } from '../../UserContext'
import PhotoCommentsForm from './PhotoCommentsForm';
import styles from './PhotoComments.module.css';

const PhotoComents = (props) => {
  const {login} = React.useContext(UserContext);
  const [comments, setComments] = React.useState(() => props.comments);
  const commentsSection = React.useRef(null);

  React.useEffect(() =>{
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;//o scrolltop faz ele descer e o scrollheight vai fazer com q ele desça o total da altura q tem no scroll
  }, [comments])

  return (
    <>
      <ul ref={commentsSection} className={`${styles.comments} ${props.single ? styles.single : ''}`}>
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && <PhotoCommentsForm single={props.single} id={props.id} setComments={setComments}/>}
    </>
  )
}

export default PhotoComents
