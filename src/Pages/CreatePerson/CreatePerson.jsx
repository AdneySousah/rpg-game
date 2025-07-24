import './CreatePerson.css'
import HeaderComponent from '../../Components/Header/HeaderComponent'


import { PersonAuthContext } from '../../contexts/person'
import { useContext, useState } from 'react'

import { useNavigate } from 'react-router-dom'


function CreatePerson() {

   

    const { createNewPerson } = useContext(PersonAuthContext)

    const [hair, setHair] = useState('')
    const [body, setBody] = useState('')
    const [classPerson, setClassPerson] = useState('')
    const [namePerson, setNamePerson] = useState('')

    const navigate = useNavigate()

    async function HandleNewPerson(e) {   
        
        e.preventDefault();

       await createNewPerson(hair, body, classPerson, namePerson)
       
        navigate('/dashboard')
    
        


    }


    return (
        <div className='content'>
            <HeaderComponent />
            <div className='container-content'>
                <div className='titulo-page'>
                    <h1>Criação de personagem</h1>
                </div>



                <form className='form-new-person' onSubmit={HandleNewPerson}>
                    <input type="text" placeholder='Digite o nome do peronsagem' value={namePerson} onChange={e => setNamePerson(e.target.value)} required />
                    <ul>
                        <li>
                            <label htmlFor="">Selecione um cabelo</label>
                            <select value={hair} onChange={e => setHair(e.target.value)} required>
                                <option value="">selecione uma opção</option>
                                <option value="azul">Azul</option>
                                <option value="verde">Verde</option>
                                <option value="vermelho">Vermelho</option>
                            </select>
                        </li>

                        <li>
                            <label htmlFor="">Selecione o tipo de corpo</label>
                            <select value={body} onChange={e => setBody(e.target.value)} required>
                                <option value="">selecione uma opção</option>
                                <option value="magro">Magro</option>
                                <option value="forte">Forte</option>
                                <option value="gordo">Gordo</option>
                            </select>
                        </li>

                        <li>
                            <label htmlFor="">Selecione a Classe</label>
                            <select value={classPerson} onChange={e => setClassPerson(e.target.value)} required>
                                <option value="">selecione uma opção</option>
                                <option value="mago">Mago</option>
                                <option value="arqueiro">Arqueiro</option>
                                <option value="guerreiro">Guerreiro</option>
                            </select>
                        </li>
                    </ul>
                    <button type='submit'>Criar Personagem</button>
                </form>


            </div>
         
        </div>
    )
}

export default CreatePerson