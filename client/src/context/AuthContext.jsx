import axios from 'axios';
import {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    
    const login = async (input) => {
        const res = await axios.post("http://localhost:3200/api/auth/login", input)
        setCurrentUser(res.data)
    }

    const logout = async () => {
        await axios.post("http://localhost:3200/api/auth/logout")
        setCurrentUser(null)
    }

    useEffect(()=> {
        console.log(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return <AuthContext.Provider value={{currentUser, login, logout}}>{children}</AuthContext.Provider>
}