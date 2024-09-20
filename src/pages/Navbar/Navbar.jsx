import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {Button } from "@/components/ui/button"
import CreateProjectForm from '../Project/CreateProjectForm'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { PersonIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../../Redux/Auth/Action'
  

const Navbar = () => {
    const {auth} = useSelector(store => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(Logout())
    }
  return (
    <div className='border-b py-4 px-5 flex items-center justify-between'>
      <div className='flex items-center gap-3'>
            <p className='cursor-pointer' onClick={()=> navigate("/")}>
                Project Management
            </p>
            <Dialog>
                <DialogTrigger>
                    <Button varient = "ghost">
                        New Project
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogTitle>
                        Create Project
                    </DialogTitle>
                    <CreateProjectForm />
                </DialogContent>
            </Dialog>
            <Button varient="ghost" onClick={()=> navigate("/upgrade_plan")}>
                Upgrade Plan
            </Button>

      </div>

      <div className='flex items-center justify-center gap-3'>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button className="rounded-full" size="icon">
                    <PersonIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Button className="mt-1 m-auto" varient="outline" style={{zIndex:100}} onClick={handleLogout}>
                        Logout
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <p>
            {auth.user?.fullName}
        </p>
      </div>
    </div>
  )
}

export default Navbar
