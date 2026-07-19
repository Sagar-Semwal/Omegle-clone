
"use client";
import React, { useEffect, useRef } from 'react'

const VideoRoom = ({roomId}:{roomId:string}) => {
  const containerRef=useRef<HTMLDivElement>(null)
  const zpRef=useRef<any>(null)

useEffect(()=>{
  const start=async ()=>{
    const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");
    const userId=crypto.randomUUID()
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(
      Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID),
      process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!,
        roomId,
        userId,
        "stranger"
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zpRef.current=zp;

        zpRef.current.joinRoom({
   container: containerRef.current,
   
   scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
    },
    showPreJoinView:false,
    showTextChat:true,
    maxUsers:2
});  



  }

  start()

  return ()=>{
    if(zpRef.current){
      try{
        zpRef.current.leaveRoom()
        zpRef.current.destroy()



      }catch(e){
        zpRef.current=null

      }
    }
  }



},[roomId])


  return (
    <div ref={containerRef} className='w-full h-[80vh]'/>
  )
}

export default VideoRoom
