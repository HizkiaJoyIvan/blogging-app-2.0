import axios from 'axios';
import {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    
    const login = async (input) => {
        const res = await axios.post(`${process.env.REACT_APP_URI}/auth/login`, input)
        setCurrentUser(res.data)
    }

    const logout = async () => {
        await axios.post(`${process.env.REACT_APP_URI}/auth/logout`)
        setCurrentUser(null)
    }

    useEffect(()=> {
        console.log(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return <AuthContext.Provider value={{currentUser, login, logout}}>{children}</AuthContext.Provider>
}