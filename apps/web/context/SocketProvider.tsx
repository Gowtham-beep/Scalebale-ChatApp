 'use client'
import React, {  useCallback,useContext,useEffect, useState } from 'react'
import { io,Socket } from 'socket.io-client'
interface SocketProviderProps{
    children?:React.ReactNode
}
interface ISocketContext{
    sendMessage:(msg:string)=>any
}
const SocketContext=React.createContext<ISocketContext|null>(null)

export const SocketProvider:React.FC<SocketProviderProps>=({children})=>{
    const [socket,setSocket]=useState<Socket>()

    const sendMessage:ISocketContext["sendMessage"]=useCallback((msg)=>{
        if(socket){
            socket.emit("event:message",{message:msg})
        }
        console.log("Send Message",msg)
    },[socket])
    useEffect(()=>{
        const  _socket=io("http://localhost:3005")
        setSocket(_socket)
        return ()=>{
            _socket.disconnect()
            setSocket(undefined)
        } 
    },[])
    return <SocketContext.Provider value={{sendMessage}}>
        {children}
    </SocketContext.Provider>
}

export const useSocket=()=>{
    const context=useContext(SocketContext)
    if(!context){
        throw new Error("Context must be used inside the Provider")
    }
    return context
}