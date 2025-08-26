import { createContext, useContext, useState } from "react"

const UserStateContext = createContext({
    user : null,
    token : "",
    authenticated : false,
    setUser : () => {},
    setToken : () => {},
    setAuthenticated : () => {},
});
export default function UserContext({children}){
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [authenticated, setAuthenticated] = useState(false);
    return <>
       <UserStateContext.Provider value={
        {
            user,
            token,
            authenticated,
            setUser,
            setToken,
            setAuthenticated,     
        }
       }>
           {children}
       </UserStateContext.Provider>
    </>
}

export const useUserContext = () => useContext(UserStateContext);