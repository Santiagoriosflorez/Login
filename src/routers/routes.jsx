import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { Login } from "../components/Login/Login";
import {Home} from "../components/Home/Home"
import { Signup } from "../components/Signup/Signup";
import { MapView } from "../components/Map/MapView";
import { auth } from "..//firebase";
import { useEffect, useState } from "react";
import {Places} from "../components/Places/Places";
export function MyRoutes() {
    const [userName, setUsername]=useState([])
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if (user){
                setUsername(user.displayName)
            }else setUsername("")
        })
    },[])
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/signup" element={<Signup/>}/>
                <Route exact path="/mapview" element={<MapView/>}/>
                <Route exact path="/places" element={<Places/>}/>
            </Routes>
        </Router>
    )
}
