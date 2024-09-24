import React, { useEffect } from 'react'
import {ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {Button } from "@/components/ui/button"
import { PlusIcon } from 'lucide-react'
import InviteUserForm from './InviteUserForm'
import IssueList from './IssueList'
import Chatbox from './Chatbox'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjectById } from '../../Redux/project/Action'
import { useParams } from 'react-router-dom'
  



const ProjectDetails = () => {
    const dispatch = useDispatch();
    const {project} = useSelector(store=> store);
    const {id} = useParams();
    const handleProjectInvitation = () =>{
        // console.log("handle")
    }

    useEffect(()=> {
        dispatch(fetchProjectById(id))
    },[id])
  return (
    <div className='mt-5 lg:px-10'>
      <div className='lg:flex gap-5 justify-between pb-4'>
        <ScrollArea className="h-screen lg:w-[72%] pr-2">
            <div className='pb-10 w-full text-gray-400'>
                <h1 className='font-semibold text-lg pb-2'> {project.projectDetails?.name}</h1>
            <div className='space-y-5 pb-10 text-sm'>
                <p className='w-full md:max-w-lg lg:max-w-xl '> 
                {project.projectDetails?.description}
                </p>
                <div className='flex'>
                    <p className='w-36'>
                        Project Lead:
                    </p>
                    <p>
                    {project.projectDetails?.owner.fullName}
                    </p>
                </div>

                <div className='flex'>
                    <p className='w-36'> 
                        Members:
                    </p>
                    <div className='flex items-center gap-2'>
                        {project.projectDetails?.team.map((item)=> <Avatar className="cursor-pointer" key={item}>
                            <AvatarFallback>{item.fullName[0]}</AvatarFallback>
                        </Avatar>)}
                    </div>
                    <Dialog >
                        <DialogTrigger>
                                <Button size="sm" varient="outline" className="ml-2" onClick={handleProjectInvitation}>
                                    <span>
                                        Invite 
                                    </span>
                                        <PlusIcon className='w-3 h-3'/>
                                </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                Invite User
                            </DialogHeader>
                            <InviteUserForm />
                        </DialogContent>
                    </Dialog>
                </div>

                <div className='flex'>
                    <p className='w-36'>
                        Category:
                    </p>
                    <p>
                    {project.projectDetails?.category}
                    </p>
                </div>

                <div className='flex'>
                    <p className='w-36'>
                        Project Status:
                    </p>
                    <Badge className="rounded-full">
                        Progress
                    </Badge>
                </div>

            </div>

            <section>
                <p className='py-5 border-b text-lg -tracking-wider'>Tasks</p>
                <div className='lg:flex md:flex gap-3 justify-between py-5'>
                    <IssueList status="pending" title = "Todo list"/>
                    <IssueList status="in_progress" title = "In progress"/>
                    <IssueList status="done" title = "Done"/>
                </div>
            </section>
            </div>
        </ScrollArea>
        <div className='lg:w-[27%] rounded-md sticky right-5 top-10'> 
            <Chatbox />
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
