// import { async } from '@firebase/util';
// import React, {useContext, useState} from 'react'

// const AuthContext = createContext() 
// export default function useAuth(){
//     return useContext(AuthContext);
// }
// export function AuthProvider(props) {
//     const {user,setUser}=useState(null);
//     const {error,setError} =useState();
//     const loginWithEmailandPassword = async()=>{
//         const {error,user}= await AuthService.loginWithEmailandPassword();
//         setUser(user??null);
//         setError(error??'');
//     }
//     const logout = async()=>{
//             await AuthService.logout();
//             setUser(null);
//     }
//   return <AuthContext.Provider value={value}{...props}/>
// }

