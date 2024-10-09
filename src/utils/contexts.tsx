'use client'
import { createContext, useContext, useState } from "react";
import {UserContextType, UserType} from '@/utils/types'
import { registeredUsers } from "./users"; 

const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({children}:{children:React.ReactNode}) => {
     // we pass prop as ReactNode?
    const [user, setUser] = useState<UserType | null>(null) // either a user or null - registeredUsers[0] atm to prevent refresh page
    //const [user, setUser] = useState<UserType | null>(null)
    
  return ( // providing state everywhere inside the Provider?
    <UserContext.Provider value={{user, setUser}}> 
        {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
    return useContext(UserContext)
}