'use client'
import { SetStateAction, useState } from "react"
import { registeredUsers } from "@/utils/users"
import { UserContextType, UserType } from "@/utils/types"
import { useUserContext } from "@/utils/contexts"

const LogIn = () => {
    const [userInput, setUserInput] = useState<string | null>(null)
    const {setUser} = useUserContext() as UserContextType

    const handleChange = (e: { target: { value: SetStateAction<string | null> } }) => {
        setUserInput(e.target.value)
    }

    const handleClick = () => {
        const loggedInUser:UserType[] = registeredUsers.filter((user:UserType) => user.name === userInput)
        if (loggedInUser.length) {
            setUser(loggedInUser[0])
        }
    }

/*     const [error, setError] = useState<string | null>(null);

    const handleClick = () => {
    const loggedInUser = registeredUsers.find((user) => user.name === userInput);
    if (loggedInUser) {
        setUser(loggedInUser);
        setError(null); // clear error if successful
    } else {
        setError("User not found");
    } 
    };*/


  return (
    <div>
        <p>Enter user name to login</p>
        <label htmlFor="user-input">Enter user name</label>
        <input id="user-input" onChange={handleChange} />
        <button onClick={handleClick}>Login</button>
    </div>
  )
}

export default LogIn