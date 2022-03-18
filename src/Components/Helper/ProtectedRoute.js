import React from 'react'
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../../UserContext'

const ProtectedRoute = (props) => {
  const {login} = React.useContext(UserContext);//aqui eu to puxando so o login, para que a pagina /conta so possa ser acessada quando o usuário estiver logado, ela tem q ser protegida

  if (login === true) {
    return <Route {...props}/>
  } else if (login === false) {
    return <Navigate to="/login" />
  } else {
    return null;
  }
}
//LA EM APP EU TIRO O QUE TEM CONTA E PASSO O PROTECTEDROUTE
export default ProtectedRoute
