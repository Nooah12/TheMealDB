'use client'
import { useUserContext } from "@/utils/contexts"
import { UserContextType } from "@/utils/types"
import LogIn from "../LogIn/LogIn"
import Menu from "../Menu/Menu"


const LogInWrapper = ({children}:{children:React.ReactNode}) => {
    const {user} = useUserContext() as UserContextType;
  return (
    <main className="flex-grow">
        {!user ? <LogIn /> : ( // if no user show login, else show menu
            <>
            <Menu />
            {children}
            </>
        )}
    </main>
  )
}

export default LogInWrapper