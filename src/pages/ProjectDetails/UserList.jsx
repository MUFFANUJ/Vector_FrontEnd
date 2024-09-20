import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { assignUserToIssue } from "../../Redux/Issue/Action";

export default function UserList({issueDetails}) {
    const {project} = useSelector(store=> store);
    const dispatch = useDispatch();
    const handleAssignIssueToUser = (userId) => {
        dispatch(assignUserToIssue({IssueId:issueDetails.id,userid:userId}))
    }
    
  return (
    <div className='space-y-2'> 
    <div className='border rounded-md'>
        <p className='py-2 px-3'> 
            {issueDetails.assignee?.fullName || "Unassinged"}
        </p>
    </div>

    {project.projectDetails?.team.map((item) => <div key={item.id} onClick={()=> handleAssignIssueToUser(item.id)} className='py-2 group cursor-pointer flex items-center space-x-4 rounded-md border px-4'>
        <Avatar className="bg-purple-500">
            <AvatarFallback className="bg-purple-700">
                {item.fullName[0]}
            </AvatarFallback>
        </Avatar>
        <div className='space-y-1'>
            <p className='text-sm leading-none'>
                {item.fullName}
            </p>
            <p className='text-sm text-muted-foreground'>
                @{item.fullName.toLowerCase()}
            </p>
        </div>
    </div>)}
      
    </div>
  )
}
