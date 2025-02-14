import { Server } from "socket.io";
import Redis from 'ioredis'

const pub= new Redis({
    host:'valkey-2be177a0-gn86923-ebec.h.aivencloud.com',
    port:20810,
    username:'default',
    password:'AVNS_Pj9UkPItV6unUWT4AxG'
})
const sub= new Redis({
    host:'valkey-2be177a0-gn86923-ebec.h.aivencloud.com',
    port:20810,
    username:'default',
    password:'AVNS_Pj9UkPItV6unUWT4AxG'
})

class SocketService{
    private _io:Server
    constructor(){
        console.log("Init socket.io services..")
        this._io= new Server({
            cors:{
                allowedHeaders:["*"],
                origin:"*"
            },
        })
        sub.subscribe('MESSAGES')
    }
    get io(){
        return this._io
    }
    public InitailListeners(){
        const io=this.io
        console.log("Init Socket Listeners....")
        this._io=new Server()
        io.on('connect',socket=>{
            console.log("New Socket Connected",socket.id)
           
            socket.on("event:message",async ({message}:{message:String})=>{
                console.log("New message Rec.",message)
                //publish the message to 
                await pub.publish('MESSAGES',JSON.stringify({message}))
            })
        })
    }
}
export default SocketService