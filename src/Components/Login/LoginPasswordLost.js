import React from 'react'
import { PASSWORD_LOST } from '../../api'
import useFetch from '../../Hooks/useFetch'
import useForm from '../../Hooks/useForm'
import Button from '../Form/Button'
import Input from '../Form/Input'
import Error from '../Helper/Error'
import Head from '../Helper/Head'

const LoginPasswordLost = () => {
  const login = useForm();
  const {data, loading, error, request} = useFetch();

  async function handleSubmit(event) {
    if (login.validate()) {
      event.preventDefault();
      const {url, options} = PASSWORD_LOST({login: login.value, url: 'http://localhost:3000/login/perdeu'});
      await request(url, options);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Perdeu a senha"/>
      <h1 className={"title"}>Perdeu a senha?</h1>
      {data ? <p style={{color: '#4c1'}}>{data}</p> : <form onSubmit={handleSubmit}>
        <Input label="Email / Usuário" type="text" name="login" {...login}/>
        {loading ? <Button disabled>Enviando Email</Button> : <Button>Enviar Email</Button>}
      </form>}
      <Error error={error}/>
    </section>
  )
}

export default LoginPasswordLost
