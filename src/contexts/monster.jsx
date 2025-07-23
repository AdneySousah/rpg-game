import { createContext, useState, useEffect, useContext } from "react";

import { auth, db } from "../services/coneccts";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, } from "firebase/auth";
import { doc, getDoc, setDoc, deleteDoc, onSnapshot, getDocs, collection,updateDoc } from "firebase/firestore";

import { AuthContext } from "./auth";





export const MonsterAutContext = createContext()

function MonsterProvider({ children }) {
    const [dadosMonster, setDadosMonster] = useState([])
    const { user } = useContext(AuthContext)

        useEffect(() => {
        if (!user?.uid) return;
   
        const referencia = doc(db, 'monsters', 'r1Tmoi57OS25sswiJt8q');

        const unsubscribe = onSnapshot(referencia, (snapshot) => {
            if (snapshot.exists()) {
                const dados = {
                    expGanho: snapshot.data().expGanho,
                    level: snapshot.data().level,
                    life: snapshot.data().life,
                    name: snapshot.data().name,
                  
                };
                setDadosMonster([dados]);
            } else {
                // Documento deletado
                setDadosMonster([]);
            }
        }, (error) => {
            console.error("Erro ao ouvir dados do personagem:", error);
        });


        return () => unsubscribe();


    }, [user]);



    useEffect(() => {
        async function getMonsters() {

            const dadosMonster = []

            const referencia = collection(db, 'monsters');

            await getDocs(referencia)
                .then((snapshot) => {
                    snapshot.forEach((doc) => {

                        dadosMonster.push({
                            name: doc.data().name,
                            level: doc.data().level,
                            life: doc.data().life,
                            expGanho: doc.data().expGanho
                        })
                    })


                    setDadosMonster(dadosMonster)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        getMonsters()

    },[]);


    async function UpdateMonster(lifeCalcMonster, newExpMonster, newLevelMonster) {
        
        let newLevel = newLevelMonster +1
        let newExp = newExpMonster + (newExpMonster*0.2)
        let newLife = lifeCalcMonster + (lifeCalcMonster*0.5)

        const referencia = doc(db, 'monsters','r1Tmoi57OS25sswiJt8q')
        await updateDoc(referencia, {
            level: newLevel,
            expGanho:newExp ,
            life: newLife
        })
            .then(() => {
                console.log('Monstro subiu de nivel')
            })

            .catch((err) => { console.log(err) })
    }

    return (
        <MonsterAutContext.Provider

            value={{
                dadosMonster,
                UpdateMonster



            }}>
            {children}
        </MonsterAutContext.Provider>
    )
}

export default MonsterProvider