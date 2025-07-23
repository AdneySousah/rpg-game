
import { useState ,useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import logo from '../../assets/RPG_logo.png'


function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')

    const {signUp,loginAuth} = useContext(AuthContext)

    async function handleSubmit(e) {
        e.preventDefault()


        if(name !=='' && email !== '' && password !== ''){
            
            if(password === confirmPassword){
                
                await signUp(email,password,name)
            } 
            else{
                alert('senhas nao conferem')
            }
        }
    }
    return (
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                     <img src={logo} alt="Logo site" />
                     <p>Bem vindo ao WaiorRPG</p>
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <h1>Registre e divirta-se</h1>
                    <input type="text" placeholder='digite seu nome' value={name} onChange={e => setName(e.target.value)} required/>
                    <input type="text" placeholder='email@email.com' value={email} onChange={e => setEmail(e.target.value)} required/>
                    <input type="password" placeholder='digite a senha' value={password} onChange={e => setPassword(e.target.value)} required/>
                    <input type="password" placeholder='repetir a senha' value={confirmPassword} onChange={e => setconfirmPassword(e.target.value)} required/>
                    
                    
                    <button type="submit">
                        
                        {
                            loginAuth? 'Carregando' : 'Cadastrar'
                        }
                        </button>


                </form>
                <Link to='/'>Ja tem acesso? clique para logar</Link>
            </div>
        </div>
    )
}
export default SignUp