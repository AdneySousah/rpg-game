import HeaderComponent from '../../Components/Header/HeaderComponent'
import { useContext, useEffect, useState } from 'react'
import { PersonAuthContext } from '../../contexts/person'
import './Atributos.css'

function Atributos() {

    const { dadosPerson,SetDistribuiPts  } = useContext(PersonAuthContext)
    const [atributos, setAtributos] = useState([
        {
            name: 'força',
            value: 0
        },
        {
            name: 'life',
            value: 0
        }
    ])


    const [ptsPerson, setPtsPerson] = useState(0)

    useEffect(() => {
        setPtsPerson(dadosPerson[0]?.Pontos || 0)

    }, [dadosPerson])


    function aumentar(atributoIndex) {
        if (ptsPerson <= 0) {
            alert('todos os pontos usados')
            return;
        }

        setAtributos(prevAtributos => {
            const newAtributos = [...prevAtributos]
            newAtributos[atributoIndex].value += 1
            return newAtributos
        })

        setPtsPerson(prev => prev - 1)
    }

    function diminuir(atributoIndex) {
        setAtributos(prevAtributos => {
            const newAtributos = [...prevAtributos]
            // Só diminui se o valor atual for maior que 0
            if (newAtributos[atributoIndex].value > 0) {
                newAtributos[atributoIndex].value -= 1
                setPtsPerson(prev => prev + 1)
            }
            return newAtributos
        })
    }

    function ConfirmarPontos(){
        
       
        SetDistribuiPts(atributos,ptsPerson)
    }

    return (
        <div className="content">
            <HeaderComponent />
            <div className='container-atributes'>
                <div className='player-name'>
                    <h1>Nome do personagem</h1>
                    <h3>{dadosPerson[0]?.namePerson}</h3>
                </div>

                <label>Quantidade de pontos a distribuir: {ptsPerson}</label>
                <div className='points-atributes'>
                    <ul>
                        {atributos.map((atributo, index) => {
                            return (
                                <li key={index}>
                                    {atributo.name} {atributo.value}
                                    <button onClick={() => aumentar(index)}>+</button>
                                    <button onClick={() => diminuir(index)}>-</button>
                                </li>
                            )
                        })}
                        
                    </ul>
                    
                </div>
                <button className='confirmar-btn' onClick={ConfirmarPontos}>Distribuir Pontos</button>
            </div>
        </div>
    )
}

export default Atributos