import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TrashIcon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { deleteComment } from '../../Redux/Comment/Action'

export default function CommentCard({item}) {
    const dispatch = useDispatch();
    const handleDelete= () => {
        dispatch(deleteComment(item.id));
    }
  return (
    <div className='flex sm:justify-between'>
        <div className='flex items-center gap-4'>
            <Avatar>
                <AvatarFallback>
                    {item.user.fullName[0]}
                </AvatarFallback>
            </Avatar>
            <div className='space-y-1'>
                <p>{item.user.fullName}</p>
                <p>{item.content}</p>
            </div>
        </div>
        <Button className="rounded-full w-9 h-9" variant="ghost" size="icon" onClick={handleDelete}>
            <TrashIcon />
        </Button>
    </div>
  )
}
