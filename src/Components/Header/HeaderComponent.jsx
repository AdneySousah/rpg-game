
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import { Link } from "react-router-dom"
import './HeaderComponent.css'
import logo from '../../assets/RPG_logo.png'


function HeaderComponent() {
    const { Logout,user } = useContext(AuthContext)

    
    async function ExitUser() {
        await Logout()

    }
    return (
        <div className="container-header">
            <p>Usuario logado: {user.nome}</p>
            <nav className="navbar">
            <Link to='/dashboard'>Perfil do personagem</Link>
            <Link to='/newPerson'>Criar personagem</Link>
            <Link to='/playgame'>Jogar</Link>
            <Link to='/atributes'>Seus Atributos</Link>
            
            <button onClick={ExitUser}>Logout</button>
            <img src={logo} alt="Logo site" />
            </nav>

            
        </div>

    )
}

export default HeaderComponent