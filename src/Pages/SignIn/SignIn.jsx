import './SignIn.css'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/RPG_logo.png'

import { AuthContext } from '../../contexts/auth'
function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { singIn,loginAuth } = useContext(AuthContext)

  async function handleLogin(e) {
    e.preventDefault()
  
    if  (email !== '' && password !== '') {
     await  singIn(email,password)
      
      
    }
  }

  return (
    <div className='container-center'>
      <div className='login'>
        <div className='login-area'>
          <img src={logo} alt="Logo site" />
          <p>Bem vindo ao WaiorRPG</p>
        </div>
        <form action="" onSubmit={handleLogin}>

          <h1>Entrar</h1>

          <input type="text" placeholder='email@email.com' value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder='digite a senha' value={password} onChange={e => setPassword(e.target.value)} />

          <button type="submit">{loginAuth ? 'Carregando':"Logar"}</button>


        </form>
        <Link to='/register'>Criar uma conta</Link>
      </div>
    </div>
  )
}
export default SignIn