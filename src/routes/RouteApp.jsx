import { Route, Routes } from "react-router-dom";

import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";




import Dashboard from "../Pages/Dashboard/Dashboard";
import CreatePerson from "../Pages/CreatePerson/CreatePerson";
import Private from "./Private";
import PlayGame from "../Pages/PlayGame/PlayGame";
function RouterApp(){
    return(
        <Routes>
            <Route path="/" element={<SignIn/>}/>
            <Route path="/register" element={<SignUp/>}/>
            
            <Route path="/dashboard" element={<Private><Dashboard/></Private>}/>
            <Route path="/newPerson" element={<Private><CreatePerson/></Private>}/>
             <Route path="/playgame" element={<Private><PlayGame/></Private>}/>
        </Routes>
    )
}

export default RouterApp