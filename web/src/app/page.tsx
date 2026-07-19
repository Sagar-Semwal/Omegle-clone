"use client";
import { AnimatePresence, motion } from "motion/react"
import Navbar from "@/components/Navbar";
import { Globe, Loader2, Shuffle, Sparkle, Video } from "lucide-react";
import Footer from "@/components/footer";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import VideoRoom from "@/components/VideoRoom";


const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  transports: ["websocket"]
})

export default function Home() {

  const [status, setStatus] = useState("idle")
  const [roomId,setRoomId]=useState("")
  // useEffect(()=>{
  // socket.emit("name","ayush")


  // },[])

  const startChat = () => {
    socket.emit("start")
    setStatus("waiting")
  }

  const next=()=>{
    socket.emit("next")
    window.location.reload()
 
  }

  useEffect(()=>{
    socket.on("matched",({roomId})=>{
      setRoomId(roomId)
      setStatus("chatting")
    

    })

    socket.on("waiting",()=>{
      setStatus("waiting")
    })

    socket.on("partner_left",()=>{
      window.location.reload()
      setRoomId("");
setStatus("waiting");
socket.emit("next");
    })

   
    return ()=>{
      socket.off()

    }



  },[])








  return (
    <>
      <Navbar show={status!=="chatting"} />

      <main className="relative min-h-screen w-full pt-20 bg-linear-to-br from-slate-950 via-zinc-900 to-black text-white overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

        <AnimatePresence>

          {status === "idle" &&
            <motion.div
              key="idle"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              exit={{ y: 40, opacity: 0 }}
              className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"

            >
              <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/10">
                <Sparkle />
              </div>
              <div className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 ">
                WeTalk
              </div>
              <p className="text-zinc-400 max-w-md mb-8 text-sm sm:text-base">
                Anonymous video conversations with strangers worldwide.
                No sign-up. No identity . Just pure connection.

              </p>

              <motion.button
                whileHover={{ scale: 1.09 }}
                whileTap={{ scale: 0.97 }}
                onClick={startChat}

                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-linear-to-r from-white to-zinc-200 text-black font-semibold text-lg shadow-xl"


              >
                <Video size={22} /> Start Anonymous Chat

              </motion.button>

            </motion.div>
          }

          {status === "waiting" &&
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6"

            >

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 1.1 }}

              >
                <Loader2 size={56} />
              </motion.div>

              <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 1.1 }}
                className="text-lg sm:text-xl text-zinc-400"


              >
                Matching you with someone new..

              </motion.p>

            </motion.div>

          }

          {status==="chatting" && roomId && (
            <motion.div
               key="chatting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="fixed inset-0 flex flex-col bg-black z-20"

            
            
            >

              <div className="flex items-center justify-between
              
              px-4 sm:px-6 py-4 bg-black/60 blackdrop-blur border-b border-white/10 ">

                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <Globe size={16}/>
                  WeTalk | connected
                </div>
                <motion.button
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white font-medium"
                onClick={next}
                
                whileHover={{scale:1.05}}
                whileTap={{scale:0.95}}
                >
                  <Shuffle size={16}/>
                  Next
                </motion.button>

              </div>


              <div className="flex-1 relative">
              <VideoRoom roomId={roomId}/>

              </div>
            </motion.div>
          )}




        </AnimatePresence>



      </main>
      <Footer />
    </>
  );
}