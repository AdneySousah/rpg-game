
import HeaderComponent from '../../Components/Header/HeaderComponent'

import { useContext, useState, useEffect } from 'react'
import { PersonAuthContext } from '../../contexts/person'
import { MonsterAutContext } from '../../contexts/monster'
import { Link } from 'react-router-dom'

import './PlayGame.css'


import iconPlayer from '../../assets/iconPlayer.png'
import iconMonster from '../../assets/iconMonster.png'
function PlayGame() {
    const { dadosMonster } = useContext(MonsterAutContext)
    const { dadosPerson } = useContext(PersonAuthContext)


    const [vidaAtualPlayer, setVidaAtualPlayer] = useState(0)

    const [vidaAtualMonster, setVidaAtualMonster] = useState(0)


    const [dano, setDano] = useState(0)
    const [logs, setLogs] = useState([])



    useEffect(() => {
        if (dadosPerson.length > 0 && dadosMonster.length > 0) {
            setVidaAtualPlayer(dadosPerson[0].life)
            setVidaAtualMonster(dadosMonster[0].life)
        }
    }, [dadosPerson, dadosMonster])





    function atacckPerson() {
        // Dano do jogador no monstro
        const danoNoMonstro = Math.floor(Math.random() * 11) // de 0 a 10

        // Reduz vida do monstro
        setVidaAtualMonster(prev => {
            const novaVida = prev - danoNoMonstro

            if (novaVida <= 0) {
                console.log("🎉 Monstro derrotado!")
                return 0
            }
            return novaVida
        })

        // Dano do monstro no jogador
        const contraAtaque = Math.floor(Math.random() * 6) // de 0 a 5
        setVidaAtualPlayer(prev => {
            const novaVida = prev - contraAtaque
            if (novaVida <= 0) {
                console.log("💀 Você foi derrotado!")
                return 0
            }
            return novaVida
        })
        adicionarLog(`Você causou ${danoNoMonstro} de dano`)
        adicionarLog(`Você recebeu ${contraAtaque} de dano`)
    }



    function atacckPersonSpecial() {

        // Dano do jogador no monstro
        const danoNoMonstro = Math.floor(Math.random() * 22) // de 0 a 10

        // Reduz vida do monstro
        setVidaAtualMonster(prev => {
            const novaVida = prev - (danoNoMonstro * 2)

            if (novaVida <= 0) {
                console.log("🎉 Monstro derrotado!")
                return 0
            }
            return novaVida
        })

        // Dano do monstro no jogador
        const contraAtaque = Math.floor(Math.random() * 6) // de 0 a 5
        setVidaAtualPlayer(prev => {
            const novaVida = prev - contraAtaque
            if (novaVida <= 0) {
                console.log("💀 Você foi derrotado!")
                return 0
            }
            return novaVida
        })
        adicionarLog(`Você causou ${danoNoMonstro} de dano`)
        adicionarLog(`Você recebeu ${contraAtaque} de dano`)
    }



    function adicionarLog(texto) {
        setLogs(prev => [`➡️ ${texto}`, ...prev.slice(0, 4)]) // mantêm até 5 linhas
    }

    
    if (dadosPerson.length == 0 && dadosMonster.length == 0) {
        return (

            <div className="content">

                <HeaderComponent />
                <div className="no-load">
                    <h3>Voce precisa criar um personagem para jogar</h3>
                    <Link to="/newPerson">Criar um personagem</Link>
                </div>
            </div>
        )
    }


    return (
        <div className='content'>

            <HeaderComponent />

            <div className='container-play'>

                <div className='container-player'>
                    <div className='info-player'>
                        <img src={iconPlayer} alt="player" />
                        <p>Nome: {dadosPerson[0]?.namePerson}</p>

                        <div className='player-life'>
                            <p>Life: {vidaAtualPlayer}</p>
                            <div className='life'>
                                <div className='life-total'>
                                    <div className='life-atual' style={{ width: `${(vidaAtualPlayer / dadosPerson[0]?.life) * 100}%` }}>
                                        <p>{vidaAtualPlayer}</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <p>Level: {dadosPerson[0]?.nivel}</p>
                        <p>Exp: {dadosPerson[0]?.exp}</p>
                        <p>Exp Necessario: {dadosPerson[0]?.expProxLevel}</p>
                    </div>

                    <div className='buttons'>
                        {
                            vidaAtualMonster === 0 ?
                                (
                                    <button >Proximo Level</button>
                                ) : (
                                    <>
                                        <button onClick={atacckPerson}>Atacar</button>
                                        <button onClick={atacckPersonSpecial}>Especial</button>
                                        <button>Fugir</button>
                                    </>
                                )


                        }

                    </div>
                </div>

                <div className='container-monster'>
                    <div className='info-monster'>
                        <img src={iconMonster} alt="monster" />
                        <p>Nome: {dadosMonster[0]?.name}</p>


                        <div className='monster-life'>
                            <p>Life: {vidaAtualMonster}</p>
                            <div className='life'>
                                <div className='life-total'>
                                    <div className='life-atual' style={{ width: `${(vidaAtualMonster / dadosPerson[0]?.life) * 100}%` }}>
                                        <p>{vidaAtualMonster}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <p>Level: {dadosMonster[0]?.level}</p>

                    </div>
                </div>
                <div className='container-log'>
                    <h4>Logs:</h4>
                    <ul>
                        {logs.map((log, index) => (
                            <li key={index}>{log}</li>
                        ))}
                    </ul>
                </div>

            </div>

        </div>
    )
}

export default PlayGame