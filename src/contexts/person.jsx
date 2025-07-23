import { createContext, useState, useEffect, useContext } from "react";

import { auth, db } from "../services/coneccts";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, } from "firebase/auth";
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
                    Pontos: snapshot.data().Pontos
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
                    namePerson: snapshot.data().namePerson,
                    expProxLevel: snapshot.data().expProxLevel,
                    Pontos: snapshot.data().Pontos
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
            Pontos: 0

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




    async function SetDistribuiPts(atributos, ptsPerson) {

        const referencia = doc(db, 'persons', user.uid);
        const snapshot = await getDoc(referencia);

        const dados = {

            Pontos: snapshot.data().Pontos,
            lifeAtributes: snapshot.data().lifeAtributes,
            strengthAtributes: snapshot.data().strengthAtributes
        };



        let forca = atributos[0].value != 0 ? dados.strengthAtributes += atributos[0].value : dados.strengthAtributes
        let life = atributos[1].value != 0 ? dados.lifeAtributes += atributos[1].value : dados.lifeAtributes



        const setReferencia = doc(db, 'persons', user.uid)
        await updateDoc(setReferencia, {
            lifeAtributes: life,
            strengthAtributes: forca,
            Pontos: ptsPerson
        })
            .then(() => {
                console.log('Pontos Distribuidos')
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