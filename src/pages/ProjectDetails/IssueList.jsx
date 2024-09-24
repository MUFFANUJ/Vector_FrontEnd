import React, { useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {Button } from "@/components/ui/button"
  import {Card ,CardContent,CardHeader,CardFooter} from "@/components/ui/card"
import IssueCard from './IssueCard'
import { PlusIcon } from 'lucide-react'
import CreateIssueForm from './CreateIssueForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIssues } from '../../Redux/Issue/Action'
import { useParams } from 'react-router-dom'

export default function IssueList({status,title}) {
  const dispatch = useDispatch();
  const {id} = useParams();
  const {issue} = useSelector(store=> store);
  useEffect(()=> {
    dispatch(fetchIssues(id))
  },[id])

  return (
    <div>
      <Dialog>
        <Card className="w-full md:w-[260px] lg:w-[280px] mb-2 sm:mb-0">
            <CardHeader>
                {title}
            </CardHeader>
            <CardContent className="px-2">
                <div className='space-y-2'>
                    {issue.issues.filter((issue => issue.status == status)).map((item)=><IssueCard  key={item.id} item={item} projectId = {id} />)}
                </div>
            </CardContent>
            <CardFooter>
                <DialogTrigger>
                    <Button variant="outline" className="w-full flex items-center gap-2">
                        Create Issue
                        <PlusIcon className='w-4 h-4'/>
                    </Button>
                </DialogTrigger>
            </CardFooter>
        </Card>
        <DialogContent>
            <DialogHeader>
                Create Issue
            </DialogHeader>
            <CreateIssueForm status={status}/>
        </DialogContent>
      </Dialog>
    </div>
  )
}
