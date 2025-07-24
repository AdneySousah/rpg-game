import { createContext, useState, useEffect, useContext } from "react";

import { db } from "../services/coneccts";
import { doc, getDoc, setDoc, deleteDoc, onSnapshot, updateDoc } from "firebase/firestore";

import { AuthContext } from "./auth";



export const PersonAuthContext = createContext()

function PersonProvider({ children }) {

    const [dadosPerson, setDadosPerson] = useState([])


    const { user } = useContext(AuthContext)


    useEffect(() => {
        if (!user?.uid) return;




        const referencia = doc(db, 'persons', user.uid);

        const unsubscribe = onSnapshot(referencia, (snapshot) => {
            if (snapshot.exists()) {
                const dados = {
                    body: snapshot.data().body,
                    hair: snapshot.data().hair,
                    classPerson: snapshot.data().classPerson,
                    nivel: snapshot.data().nivel,
                    namePerson: snapshot.data().namePerson,
                    exp: snapshot.data().exp,
                    life: snapshot.data().life,
                    expProxLevel: snapshot.data().expProxLevel,
                    Pontos: snapshot.data().Pontos,
                    strengthAtributes: snapshot.data().strengthAtributes,
                    lifeAtributes: snapshot.data().lifeAtributes
                };
                setDadosPerson([dados]);
            } else {
               
                setDadosPerson([]);
            }
        }, (error) => {
            console.error("Erro ao ouvir dados do personagem:", error);
        });


        return () => unsubscribe();


    }, [user]);



    useEffect(() => {
        if (!user?.uid) return;
        async function getDadosPerson() {

            try {



                const referencia = doc(db, 'persons', user.uid);
                const snapshot = await getDoc(referencia);


                const dados = {
                    body: snapshot.data().body,
                    hair: snapshot.data().hair,
                    classPerson: snapshot.data().classPerson,
                    nivel: snapshot.data().nivel,
                    namePerson: snapshot.data().namePerson,
                    expProxLevel: snapshot.data().expProxLevel,
                    Pontos: snapshot.data().Pontos,
                    strengthAtributes: snapshot.data().strengthAtributes,
                    lifeAtributes: snapshot.data().lifeAtributes
                };

                setDadosPerson(prevList => [...prevList, dados]);

            } catch (err) {
                console.error("Erro ao buscar dados:", err);
            }


        }

        getDadosPerson();

        return () => getDadosPerson();

    }, []);



    async function UpdateStatusPlayer(expCalc, newLevel, novoExp, novoLife, Pontos) {

        const referencia = doc(db, 'persons', user.uid)
        await updateDoc(referencia, {
            exp: expCalc,
            nivel: newLevel,
            life: novoLife,
            expProxLevel: novoExp,
            Pontos: Pontos
        })
            .then(() => {
                console.log('vc ganhou xp')
            })

            .catch((err) => { console.log(err) })
    }

    async function createNewPerson(hair, body, classPerson, namePerson) {
        if (!user?.uid) return;
        await setDoc(doc(db, "persons", user.uid), {
            hair: hair,
            body: body,
            classPerson: classPerson,
            namePerson: namePerson,
            id: user.uid,
            nivel: 0,
            exp: 0,
            expProxLevel: 20,
            life: 100,
            Pontos: 0,
            lifeAtributes: 0,
            strengthAtributes: 0

        })
            .then(() => {
                
                async function UpdateMonster( ) {

                    let newLevel = 1
                    let newExp = 30
                    let newLife = 100

                    const referencia = doc(db, 'monsters', 'r1Tmoi57OS25sswiJt8q')
                    await updateDoc(referencia, {
                        level: newLevel,
                        expGanho: newExp,
                        life: newLife
                    })
                        .then(() => {
                            console.log('Monstro subiu de nivel')
                        })

                        .catch((err) => { console.log(err) })
                }
                UpdateMonster()
                alert('Personagem criado com sucesso')
            })
            .catch((err) => {
                console.log(err)
            })


    }


    async function DeletePerson() {
        if (!user?.uid) return;
        const referencia = doc(db, 'persons', user.uid)
        await deleteDoc(referencia)
        alert('personagem deletado com sucesso')
    
    }




    async function SetDistribuiPts(atributos, ptsPerson) {

        const referencia = doc(db, 'persons', user.uid);
        const snapshot = await getDoc(referencia);

        const dados = {

            Pontos: snapshot.data().Pontos,
            lifeAtributes: snapshot.data().lifeAtributes,
            strengthAtributes: snapshot.data().strengthAtributes
        };


        console.log(dados)
        let forca = atributos[0].value != 0 ? dados.strengthAtributes += atributos[0].value : dados.strengthAtributes
        let life = atributos[1].value != 0 ? dados.lifeAtributes += atributos[1].value : dados.lifeAtributes


        const setReferencia = doc(db, 'persons', user.uid)
        await updateDoc(setReferencia, {
            lifeAtributes: life,
            strengthAtributes: forca,
            Pontos: ptsPerson
        })
            .then(() => {
                alert('Pontos distribuidos com sucesso')
            })

            .catch((err) => { console.log(err) })
    }

    return (
        <PersonAuthContext.Provider

            value={{
                /* passando !! se ta null é false, se tem info é true */
                createNewPerson,
                dadosPerson,
                DeletePerson,
                UpdateStatusPlayer,
                SetDistribuiPts,



            }}>
            {children}
          
        </PersonAuthContext.Provider>
    )
}

export default PersonProvider