import React from 'react'
import {Card ,CardContent} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { DotFilledIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteProjectById } from '../../Redux/project/action'

const ProjectCard = ({item}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteProjectById({projectId:item.id}));
    }
  return (
    <Card className = "p-5 w-full lg:max-w-3xl">
      <div className='space-y-5'>
        <div className='space-y-2'>
            <div className='flex justify-between'>
                <div className='flex items-center gap-5'>
                    <h1 className='cursor-pointer font-bold text-lg' onClick={()=> navigate("/project/"+item.id)}>
                        {item.name}
                    </h1>
                    <DotFilledIcon/>
                    <p className='text-sm text-gray-400'>{item.category}</p>
                </div>

                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button className="rounded-full" variant="ghost" size="icon">
                                <DotsVerticalIcon/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                Update 
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDelete}>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <p  className='text-gray-500 text-sm'> 
                {item.description}
            </p>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
            {
                item.tags.map((tag)=> <Badge variant="outline" key={tag}>{tag}</Badge>)
            }
        </div>
      </div>
    </Card>
  )
}

export default ProjectCard;
