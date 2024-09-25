import React from 'react'
import {Card ,CardContent,CardHeader,CardTitle} from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DotsVerticalIcon, PersonIcon } from '@radix-ui/react-icons'
import {Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import UserList from './UserList'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteIssue, updateIssueStatus } from '../../Redux/Issue/Action'
export default function IssueCard({projectId,item}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {issue} = useSelector(store => store)
    const handleIssueDelete = () => {
        dispatch(deleteIssue(item.id))
    }
    const handleUpdateIssueStatus = (status) =>{
        dispatch(updateIssueStatus({id:item.id,status}))
    }
  return (
    <Card className="rounded-md py-1 pb-2">
      <CardHeader className="py-0 pb-1">
        <div className='flex justify-between items-center'>
            <CardTitle onClick={()=> navigate(`/project/${projectId}/issue/${item.id}`)} className="cursor-pointer">
                {item.title}
            </CardTitle>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button className="rounded-full" size="icon"><DotsVerticalIcon /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={()=> handleUpdateIssueStatus("pending")}>
                        Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=> handleUpdateIssueStatus("in_progress")}>
                        In - Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=> handleUpdateIssueStatus("done")}>
                        Done
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>
                        Edit
                    </DropdownMenuItem> */}
                    <DropdownMenuItem onClick={handleIssueDelete}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="py-0">
        <div className='flex justify-between items-center'>
            <p>FPB - {1}</p>
            <DropdownMenu className="w-[30rem] border border-red-400">
                <DropdownMenuTrigger>
                    <Button className="hover:text-black text-white rounded-full" size="icon">
                        <Avatar>
                            <AvatarFallback>
                                <PersonIcon/>
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <UserList issueDetails={item}/>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}
