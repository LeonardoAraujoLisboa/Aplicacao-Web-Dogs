import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PHOTO_POST } from '../../api';
import useFetch from '../../Hooks/useFetch';
import useForm from '../../Hooks/useForm';
import Button from '../Form/Button';
import Input from '../Form/Input';
import Error from '../Helper/Error';//o erro é o da api
import Head from '../Helper/Head';
import styles from './UserPhotoPost.module.css';

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm('number');
  const idade = useForm();
  const [img, setImg] = React.useState({});
  const {data, error, loading, request} = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) {
      navigate('/conta');//pq as vezes a foto nao é postada e ai ele da null e mesmo assim vai para conta, e ai eu so quero q ela va para conta SE SOMENTE SE POSTAR
    }
  }, [data, navigate])


  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();//para enviar todos os dados do input eu tenho q enviar como um formdata nao da para enviar como json
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);
    const token = window.localStorage.getItem('token')
    const {url, options} = PHOTO_POST(formData, token) 
    request(url, options)
  }

  function handleImgChange({target}) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0]//esse raw eu poderia chamar de qualquer coisa
    })
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste sua foto"/>
      <form onSubmit={handleSubmit}>
        <Input type="text" label="Nome" name="nome" {...nome}/>
        <Input type="number" label="Peso" name="peso" {...peso}/>
        <Input type="number" label="Idade" name="idade" {...idade}/>
        <input className={styles.file} type="file" name="img" id="img" onChange={handleImgChange}/>
        {loading ? <Button disabled>Enviando...</Button> : <Button>Enviar</Button>}
        {<Error error={error} />}
      </form>
      <div>
        {img.preview && <div className={styles.preview} style={{backgroundImage: `url('${img.preview}')`}}></div>}
      </div>
    </section>
  )
}

export default UserPhotoPost
