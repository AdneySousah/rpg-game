import { createContext, useState, useEffect, useContext } from "react";

import { auth, db } from "../services/coneccts";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, } from "firebase/auth";
import { doc, getDoc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";

import { AuthContext } from "./auth";





export const PersonAuthContext = createContext()

function PersonProvider({ children }) {
    const [dadosPerson, setDadosPerson] = useState([])

    const {user}= useContext(AuthContext)

    



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
                    namePerson: snapshot.data().namePerson
                };
                setDadosPerson([dados]);
            } else {
                // Documento deletado
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
                    namePerson: snapshot.data().namePerson
                };

                setDadosPerson(prevList => [...prevList, dados]);
               




            } catch (err) {
                console.error("Erro ao buscar dados:", err);
            }

        }

        getDadosPerson();

        return () => getDadosPerson();

    }, []);




    async function createNewPerson(hair, body, classPerson, namePerson) {
        if (!user?.uid) return;
        await setDoc(doc(db, "persons", user.uid), {
            hair: hair,
            body: body,
            classPerson: classPerson,
            namePerson: namePerson,
            id: user.uid,
            nivel: 0
        })
            .then(() => {
                alert('Personagem Criado')
            })
            .catch((err) => {
                console.log(err)
            })
    }


    async function DeletePerson() {
        if (!user?.uid) return;
        const referencia = doc(db, 'persons', user.uid)
        await deleteDoc(referencia)
    }

    return (
        <PersonAuthContext.Provider

            value={{
                /* passando !! se ta null é false, se tem info é true */
                createNewPerson,
                dadosPerson,
                DeletePerson


            }}>
            {children}
        </PersonAuthContext.Provider>
    )
}

export default PersonProvider