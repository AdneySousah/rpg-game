
import HeaderComponent from "../../Components/Header/HeaderComponent"
import { useContext } from "react"
import { PersonAuthContext } from "../../contexts/person"
import { useNavigate } from "react-router-dom"
import './Dashboard.css'

import { Link } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate()
    
    const { dadosPerson, DeletePerson } = useContext(PersonAuthContext)


    async function excluirPersonagem() {
        alert('personagem deletado')
      
        await DeletePerson()
    }

    if (dadosPerson.length == 0) {
        return (
            
            <div className="content">
                
                <HeaderComponent />
                <div className="no-load">
                    <h3>Nenhum personagem criado</h3>
                    <Link to="/newPerson">Criar um personagem</Link>
                </div>
            </div>
        )
    }
    return (


        <div className="content">

            <HeaderComponent />

            <div className="container-content">
                <div className="dados-person">
                    <h1>Informações do seu personagem</h1>
                    <label>Nome do personagem:  <span>{dadosPerson[0]?.namePerson} </span></label>

                    <table>
                        <thead>
                            <tr>
                                <th>Cabelo</th>
                                <th>Corpo</th>
                                <th>Classe</th>
                                <th>Nível</th>
                                <th>Exp</th>
                                <th>Life</th>
                                <th>Exp Proximo Level</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{dadosPerson[0]?.hair}</td>
                                <td>{dadosPerson[0]?.body}</td>
                                <td>{dadosPerson[0]?.classPerson}</td>
                                <td>{dadosPerson[0]?.nivel}</td>
                                <td>{dadosPerson[0]?.exp}</td>
                                <td>{dadosPerson[0]?.life}</td>
                                <td>{dadosPerson[0]?.expProxLevel}</td>
                                

                                <td className="btns">
                                    <button >Editar</button>
                                    <button onClick={excluirPersonagem}>Excluir</button>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        
        </div>



    )
}

export default Dashboard