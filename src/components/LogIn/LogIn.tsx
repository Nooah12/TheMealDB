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
    <div className="w-3/4 m-auto flex flex-col mt-10 p-3 border-2">
        <h2 className="mb-1 font-bold text-lg">Welcome!</h2>
        <p className="mb-2">Enter user name to login</p>
        <label className="mb-1" htmlFor="user-input">User Name</label>
        <input className="mb-2 border-2 rounded-md" id="user-input" onChange={handleChange} />
        <button className="px-8 py-1 rounded-md bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
            onClick={handleClick}>Login</button>
    </div>
  )
}

export default LogIn