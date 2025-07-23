import { createContext, useState, useEffect, useContext } from "react";

import { auth, db } from "../services/coneccts";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, } from "firebase/auth";
import { doc, getDoc, setDoc, deleteDoc, onSnapshot, getDocs, collection } from "firebase/firestore";

import { AuthContext } from "./auth";





export const MonsterAutContext = createContext()

function MonsterProvider({ children }) {
    const [dadosMonster, setDadosMonster] = useState([])
    const { user } = useContext(AuthContext)

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
                            life: doc.data().life
                        })
                    })

                    
                    setDadosMonster(dadosMonster)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        getMonsters()

    }, [user]);

    return (
        <MonsterAutContext.Provider

            value={{
                dadosMonster



            }}>
            {children}
        </MonsterAutContext.Provider>
    )
}

export default MonsterProvider