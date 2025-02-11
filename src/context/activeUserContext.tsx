'use client'

import { useReducer,useContext,useState,createContext, ReactNode, use } from "react"
import { userSelectType } from "@/app/db/schema/userSchema"
import { Action, ContextProps } from "@/types/types"

const initialUserState:userSelectType = {} as userSelectType

function intialUserState (){
    return initialUserState
}

const userReducer = (state:userSelectType,action:Action):userSelectType => {
    switch(action.type){
        case 'SET_AS_ACTIVE':
            return action.payload
        case 'GET_USER':
            return state
        case 'INITIALIZE_USER':
            return action.payload
        default:
            return state
    }
}

 const userContext = createContext<ContextProps | undefined>(undefined)

 export function UserActions({children}:{children:ReactNode})
 {
    const [state,dispatch] = useReducer(userReducer,initialUserState)

    // const [isHydrated,setIsHydrated] = useState(false)

    return (
        <userContext.Provider value={{state,dispatch}}>
            {children}
        </userContext.Provider>
    )
 }

 export function useUser(){
    const context = useContext(userContext)
    if(!context){
        throw new Error('useUser must be used within a userProvider')
    }
    return context;
 }

