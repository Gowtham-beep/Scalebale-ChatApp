 'use client'
import React, {  useCallback,useContext,useEffect, useState } from 'react'
import { io,Socket } from 'socket.io-client'
interface SocketProviderProps{
    children?:React.ReactNode
}
interface ISocketContext{
    sendMessage:(msg:string)=>any
    onMessageRec:(msg:string)=>any
    messages:string[]
}
const SocketContext=React.createContext<ISocketContext|null>(null)

export const SocketProvider:React.FC<SocketProviderProps>=({children})=>{
    const [socket,setSocket]=useState<Socket>()
    const[messages,setMessages]=useState<string[]>([])
//client side
    const sendMessage:ISocketContext["sendMessage"]=useCallback((msg)=>{
        if(socket){
            socket.emit("event:message",{message:msg})
        }
        console.log("Send Message",msg)
    },[socket])
//server side 
const onMessageRec:ISocketContext["onMessageRec"]=useCallback((msg)=>{
    console.log("From servr Msg Rec",msg)
    const {message}=JSON.parse(msg) as {message:string}
    setMessages(prev=>[...prev,message])
},[])

    useEffect(()=>{
        const  _socket=io("http://localhost:3005")
        _socket.on('message',onMessageRec)
        setSocket(_socket)
        return ()=>{
            _socket.disconnect()
            _socket.off('message',onMessageRec)
            setSocket(undefined)
        } 
    },[])
    return <SocketContext.Provider value={{sendMessage,onMessageRec,messages}}>
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