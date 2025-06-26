import { createContext, useState, useEffect } from "react";
import axios from "axios";
import {backendurl} from '../src/App'


export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchusers= async()=>{
            await axios.get(`${backendurl}/api/user/getUser`, { withCredentials: true })
                .then(res => {
                    setUser(res.data.user);
                    setLoading(false);
                })
                .catch(() => {
                    setUser(null);
                    setLoading(false);
                });
        }
        fetchusers();
    }, [])
    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};
