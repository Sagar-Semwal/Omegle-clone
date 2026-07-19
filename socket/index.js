import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv"
dotenv.config()
//Node js server (http server) given to socket.io makes it bidirectional
const server=http.createServer()
const port=process.env.PORT || 5000
import {v4 as uuid} from "uuid"


const io=new Server(server,{cors:{origin:"*"}})
const waitingQueue=[]
const activePairs=new Map();  //[user A,user B]
//[user B,userA]


io.on("connection",(socket)=>{
    // console.log(socket.id)
//     socket.on("name",(data)=>{
// console.log(data)
//     })
if(waitingQueue.includes(socket.id)) return;

socket.on("start",()=>{
    if(waitingQueue.length>0){
        const partner=waitingQueue.shift()
        const roomId=uuid()

        activePairs.set(socket.id,partner);
        activePairs.set(partner,socket.id);

        socket.emit("matched",{roomId})
        socket.to(partner).emit("matched",{roomId})



    }else{
        waitingQueue.push(socket.id)
        socket.emit("waiting")
    }
})

socket.on("next",()=>{
    handleLeave(socket.id)
})

socket.on("disconnect",()=>{
    handleLeave(socket.id)
})

function handleLeave(id){
    const index=waitingQueue.indexOf(id)
    if(index !==-1){
        waitingQueue.splice(index,1)
    }

    const partner=activePairs.get(id)
    if(partner){
        io.to(partner).emit("partner_left")
        activePairs.delete(id)
        activePairs.delete(partner)
    }



}


})







































server.listen(port,()=>{
    console.log("Server is listening at",port);
})




