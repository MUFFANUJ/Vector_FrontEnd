import React, { useEffect, useState } from 'react'
import {ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChatByProject, fetchChatMessages, sendMessage } from '../../Redux/Chat/Action'
import { useParams } from 'react-router-dom'
import { fetchProjectById } from '../../Redux/project/action'

export default function Chatbot() {
  const [message,setMessage] = useState("");
  const dispatch = useDispatch();
  const {auth,chat} = useSelector(store => store);
  const {id} = useParams();
 
  const handleMessageChange= (e) => {
    setMessage(e.target.value);
  }

  useEffect(()=>{
    dispatch(fetchChatByProject(id))
  },[dispatch,id])

  useEffect(()=>{
    // console.log("chattttt",chat)
    if (chat && chat.chat?.id) {
      dispatch(fetchChatMessages(chat.chat.id));
    }
    // dispatch(fetchChatMessages(chat.chat?.id))
  },[dispatch,chat.chat?.id])


  const handleSendMessage = () =>{
    dispatch(sendMessage({
      senderId:auth.user?.id,
      projectId:id,
      content:message
    }))
      // console.log("message",message)
      setMessage("");
  }
  return (
    <div className='sticky'> 
      <div className='border rounded-lg'>
        <h1 className='border-b p-5'>
          Chat Box
        </h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
          {chat.messages?.map((item,index)=> 
          (item.sender?.id !== auth.user?.id) ? <div className='flex gap-2 mb-2 justify-start' key={item.id}>
            <Avatar>
              <AvatarFallback>
                A
              </AvatarFallback>
            </Avatar>
              <div className='space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl'>
                <p>{item.sender?.fullName}</p>
                <p className='text-gray-300'>{item.content}</p>
              </div>
          </div>
          :
          <div className='flex gap-2 mb-2 justify-end' key={item.id+776548454}>
              <div className='space-y-2 py-2 px-5 border rounded-se-2xl rounded-x-xl'>
              <p>{item.sender?.fullName}</p>
                <p className='text-gray-300'>{item.content}</p>
              </div>
            <Avatar>
              <AvatarFallback>
                A
              </AvatarFallback>
            </Avatar>
          </div>
          )}
        </ScrollArea>
        <div className='relative '>
            <Input 
            placeholder = "Start Typing Here"
            className="py-4 border-t outline-none focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
            value={message} 
            onChange={handleMessageChange}
            onKeyDown={(e)=> {
              if(e.key ==="Enter"){
                console.log("ENterrr")
                handleSendMessage();
              }
            }}
            />
            <Button onClick={handleSendMessage}  className="absolute right-2 top-0 w-9 h-9 rounded-full" size="icon">
                <PaperPlaneIcon />
            </Button>
        </div>
      </div>
    </div>
  )
}
