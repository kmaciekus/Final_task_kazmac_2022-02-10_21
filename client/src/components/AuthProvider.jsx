import {useState} from "react";
import {AuthContext} from "../authHook/useAuth";
import { EventApi } from "../services/eventsApi";


export const AuthProvider = ({children}) => {
    const token = sessionStorage.getItem("token");

    const [state, setState] = useState({
        token,
        error: null,
    });


    const login = async (user) => {
        const res = await EventApi.login(user);

        if (res.err) {
            console.error(res.err);

            setState({error: res.err, token: null});

            return {error: res.err};
        }

        setState(({error: null, token: res.token}));
        
        sessionStorage.setItem("token", res.token);

        return {token: res.token};
    };

    const logout = () => {
        setState({
            token: null,
            error: null
        })

        sessionStorage.removeItem("token");
    };

    const value = {...state, login, logout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
