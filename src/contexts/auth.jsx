import { createContext, useState, useEffect } from "react";

import { auth, db } from "../services/coneccts";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";




export const AuthContext = createContext()



function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loginAuth, setLoginAuth] = useState(false)

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(()=>{
        async function loadUser() {
            const storageUser = localStorage.getItem('@login')

            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
            setLoading(false)
        }
             loadUser()     
    },[])

    async function singIn(email, password) {

        setLoginAuth(true)

        await signInWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                const docRef = doc(db, 'users', uid)
                const docSnap = await getDoc(docRef)

                let data = {
                    uid: uid,
                    nome: docSnap.data().nome,
                    email: value.user.email,
                }

                setUser(data)
                StorageUser(data)
                setLoginAuth(false)
                navigate('/dashboard')

            })
            .catch(() => {
                setLoginAuth(false)
                console.log('error')
            })
    }

    async function signUp(email, password, nome) {
        setLoginAuth(true)

        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (value) => {

                let uid = value.user.uid
                await setDoc(doc(db, "users", uid), {
                    nome: nome,


                })
                    .then(() => {
                        let data = {
                            uid: uid,
                            nome: nome,
                            email: value.user.email,


                        }
                        setUser(data)
                        setLoginAuth(false)
                        navigate('/dashboard')
                        StorageUser(data)
                    })


            })
            .catch(() => {
                console.log('erro no servidor')
            })
    }

    function StorageUser(data) {
        localStorage.setItem('@login', JSON.stringify(data))
    }

    async function Logout(){
        await signOut(auth)
        localStorage.removeItem('@login')
        navigate('/')
        setUser(null)
    }
    return (
        <AuthContext.Provider

            value={{
                signed: !!user, /* passando !! se ta null é false, se tem info é true */
                user,
                singIn,
                signUp,
                loginAuth,
                loading,
                Logout

            }}>
            {children}
           
        </AuthContext.Provider>
    )
}

export default AuthProvider