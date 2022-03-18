import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../../Hooks/useForm';
import Button from '../Form/Button';
import Input from '../Form/Input';
import { UserContext } from '../../UserContext';
import Error from '../Helper/Error';
import styles from './LoginForm.module.css';
import stylesBtn from '../Form/Button.module.css';//eu fiz assim para pegar o estilo do botao e passei la embaixo stylesBtn.button, pq la em button.module.css a classe se chama button
import Head from '../Helper/Head';


const LoginForm = () => {
  const username = useForm();//ai eu posso passar la embaixo no input {...username} e ai eu vou ter acesso a tudo no q esta no useForm la no Input.js que é o value e o onChange.
  const password = useForm();
  const {userLogin, error, loading} = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
      }
    }

  return (
    <section className="animeLeft">
      <Head title="Login"/>
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username}/>
        <Input label="Senha" type="password" name="password" {...password}/>
        {loading ? (<Button disabled>Carregando...</Button>) : (<Button>Entrar</Button>)}
        <Error error={error && 'Dados incorretos.'}/>
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">Perdeu a senha</Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesBtn.button} to="/login/criar">Cadastro</Link>
      </div>
    </section>
  )
}

export default LoginForm
