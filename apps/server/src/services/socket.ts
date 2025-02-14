import { Server } from "socket.io";

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
                //publish the message to Redis
            })
        })
    }
}
export default SocketService