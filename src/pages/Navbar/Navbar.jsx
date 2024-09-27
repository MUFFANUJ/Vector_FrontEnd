import React, { useEffect, useState } from 'react'
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
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../../Redux/Auth/Action'
import { ArrowLeft, MoonIcon, SunDimIcon } from 'lucide-react'
import lightLogo from "../../assets/lightLogo.png"
import darkLogo from "../../assets/darkLogo.png"


const Navbar = () => {
    const {auth} = useSelector(store => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [theme, setTheme] = useState('light');
    useEffect(() => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }, []);
  
    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      document.querySelector('body').classList.toggle('dark', newTheme === 'dark');
      localStorage.setItem('theme', newTheme);
    };
  
    const handleLogout = () => {
        dispatch(Logout())
    }
  return (
    <div className='border-b py-4 px-5 flex items-center justify-between'>
      <div className='flex items-center gap-3'>
            <p className='cursor-pointer' onClick={()=> navigate("/")}>
                {location.pathname === "/" ? (<img src={theme === "dark" ? lightLogo : darkLogo} style={{width:"35px", borderRadius:"70px"}}/>) : (<span><ArrowLeft/></span>)}
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
            <Button varient="ghost" onClick={()=> navigate("/upgrade_plan")} className="hidden sm:block">
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
        <p className='hidden sm:block'>
            {auth.user?.fullName}
        </p>
        {/* <button id="theme-toggle" aria-label="Toggle Dark Mode" onClick={toggleTheme}>
                {theme === "dark"  ?(<SunDimIcon/>):
                (<MoonIcon/>)}
            </button> */}
      </div>
    </div>
  )
}

export default Navbar
