import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { json } from "react-router-dom";

export let AuthContext= createContext()
export default function AuthContextProvider({children}){

    const [loginData, setLoginData] = useState(null)
    let  saveLoginData=()=>{
      let decodedToken=localStorage.getItem("token")
      let incodedToken=jwtDecode(decodedToken);
      setLoginData(incodedToken)
      }
      useEffect(() => {
        
      if(localStorage.getItem('token'))
        saveLoginData()   
        
      }, [])
return <AuthContext.Provider value={{loginData ,saveLoginData ,setLoginData}}>{children}</AuthContext.Provider>
}
