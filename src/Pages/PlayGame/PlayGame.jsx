
import HeaderComponent from '../../Components/Header/HeaderComponent'


import { useContext, useState, useEffect } from 'react'
import { PersonAuthContext } from '../../contexts/person'
import { MonsterAutContext } from '../../contexts/monster'
import { Link } from 'react-router-dom'

import './PlayGame.css'


import iconPlayer from '../../assets/iconPlayer.png'
import iconMonster from '../../assets/iconMonster.png'

function PlayGame() {

    const { dadosMonster, UpdateMonster } = useContext(MonsterAutContext)
    const { dadosPerson, UpdateStatusPlayer } = useContext(PersonAuthContext)


    const [vidaAtualPlayer, setVidaAtualPlayer] = useState(0)

    const [vidaAtualMonster, setVidaAtualMonster] = useState(0)

    const [logs, setLogs] = useState([])

    const [scape, setScape] = useState(false)




    useEffect(() => {
        if (dadosPerson.length > 0 && dadosMonster.length > 0) {
            setVidaAtualPlayer( (dadosPerson[0]?.lifeAtributes *5)+dadosPerson[0]?.life)
           
            setVidaAtualMonster(dadosMonster[0].life)
        }

    }, [dadosPerson, dadosMonster])




    function CalcPlayerLevel() {

        /* calculo de exp life e lvel do player */
        const lifeCalc = parseInt(dadosPerson[0].life)
        const expCalc = parseInt(dadosPerson[0].exp) + parseInt(dadosMonster[0].expGanho)
        let newLevel = parseInt(dadosPerson[0].nivel)
        let newExp = 0
        let novoLife = 0
        let Pontos = 0


        if (expCalc >= dadosPerson[0].expProxLevel) {
            newLevel += 1
            newExp = expCalc + (expCalc * 0.5)
            novoLife = lifeCalc + (lifeCalc * 0.3)
            Pontos = dadosPerson[0].Pontos + 1

        }
        else {
            newLevel = parseInt(dadosPerson[0].nivel)
            newExp = dadosPerson[0].expProxLevel
            novoLife = dadosPerson[0].life
            Pontos = dadosPerson[0].Pontos
            console.log('fazendo calculo')
        }

        UpdateStatusPlayer(expCalc, newLevel, newExp, novoLife, Pontos)


        /* calculo de lvl life e xp ganho do mosnter */
        const lifeCalcMonster = parseInt(dadosMonster[0].life)
        const newExpMonster = parseInt(dadosMonster[0].expGanho)
        const newLevelMonster = parseInt(dadosMonster[0].level)

        UpdateMonster(lifeCalcMonster, newExpMonster, newLevelMonster)




    }

    function atacckPerson() {
        // Dano do jogador no monstro
        const danoNoMonstro = Math.floor(Math.random() * 11) // de 0 a 10

        // Reduz vida do monstro
        setVidaAtualMonster(prev => {
            const novaVida = prev - (danoNoMonstro * 2 + (dadosPerson[0]?.strengthAtributes*5))

            if (novaVida <= 0) {
                console.log("🎉 Monstro derrotado!")
                CalcPlayerLevel()
                return 0
            }
            return novaVida
        })

        // Dano do monstro no jogador
        const contraAtaque = Math.floor(Math.random() * 6) // de 0 a 5
        setVidaAtualPlayer(prev => {
            const novaVida = prev - (contraAtaque * 4)
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
            const novaVida = prev - (danoNoMonstro * 2 + (dadosPerson[0]?.strengthAtributes*5))
            

            if (novaVida <= 0) {
                console.log("🎉 Monstro derrotado!")
                CalcPlayerLevel()
                return 0
            }
            return novaVida
        })

        // Dano do monstro no jogador
        const contraAtaque = Math.floor(Math.random() * 6) // de 0 a 5
        setVidaAtualPlayer(prev => {
            const novaVida = prev - (contraAtaque * 4)
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


    function HealPerson() {
        const HealLife = Math.floor(Math.random() * 30)
        const contraAtaque = Math.floor(Math.random() * 6) // de 0 a 5

        setVidaAtualPlayer(prev => {
            // Primeiro aplica a cura (sem ultrapassar a vida máxima)
            let novaVida = Math.min(prev + HealLife, dadosPerson[0].life);

            // Depois aplica o contra-ataque (sem deixar a vida negativa)
            novaVida = Math.max(novaVida - (contraAtaque * 4), 0);



            // Verifica se o jogador foi derrotado
            if (novaVida <= 0) {
                return
            }

            return novaVida;
        });
        adicionarLog(`Você curou ${HealLife} de vida`)
        adicionarLog(`Você recebeu ${contraAtaque} de dano`)
    }


    function scapePerson() {
        setScape(true)

    }

    function ReloadPage() {
        setVidaAtualMonster(dadosMonster[0]?.life)
        setVidaAtualPlayer((dadosPerson[0]?.lifeAtributes *5)+dadosPerson[0]?.life)
        setScape(false)

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
                        <div className='atribute-Items'>
                            <div>
                                <img src={iconPlayer} alt="player" />
                                <p>Nome: {dadosPerson[0]?.namePerson}</p>
                            </div>
                            <div className='my-atributes'  >
                                <h5> Meus atributos</h5>
                                <h5>Pontos de vida: {dadosPerson[0]?.lifeAtributes}</h5>
                                <h5>Vida total: {Math.round((dadosPerson[0]?.lifeAtributes *5)+dadosPerson[0]?.life)}</h5>
                                <h5>Pontos de força:  {dadosPerson[0]?.strengthAtributes}</h5>
                                <h5>Força total: {(dadosPerson[0]?.strengthAtributes *8)}</h5>
                                <h5>Pontos disponiveis {dadosPerson[0]?.Pontos} </h5>

                            </div>
                            

                        </div>


                        <div className='player-life'>
                            <p>Life: {Math.round(vidaAtualPlayer)}</p>
                            <div className='life'>
                                <div className='life-total'>

                                    
                                    <div className='life-atual' style={{ width: `${(vidaAtualPlayer / dadosPerson[0]?.life) * 100}%` }}>
                                        <p>{Math.round(vidaAtualPlayer)}</p>
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
                                ) : vidaAtualPlayer === 0 ? (
                                    <>
                                        <h2>Voce perdeu</h2>
                                        <button onClick={ReloadPage}>Tentar Novamente</button>
                                    </>
                                ) : (
                                    <>


                                        {
                                            scape ? <button onClick={ReloadPage}>Novo Jogo</button>
                                                :
                                                <>
                                                    <button onClick={atacckPerson}>Atacar</button>
                                                    <button onClick={atacckPersonSpecial}>Especial</button>
                                                    <button onClick={HealPerson}>Curar</button>


                                                    <button onClick={scapePerson}>Fugir</button>
                                                </>
                                        }

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
                            <p>Life: {Math.round(vidaAtualMonster)}</p>
                            <div className='life'>
                                <div className='life-total'>
                                    <div className='life-atual' style={{ width: `${(vidaAtualMonster / dadosMonster[0]?.life) * 100}%` }}>
                                        <p>{Math.round(vidaAtualMonster)}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <p>Level: {dadosMonster[0]?.level}</p>
                        <p>Exp ganho: {dadosMonster[0]?.expGanho}</p>

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