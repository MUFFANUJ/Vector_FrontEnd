import React, { useState } from 'react'
import SignUp from './SignUp';
import SignIn from './SignIn';
import { Button } from "@/components/ui/button"
import "./Auth.css"

export default function Auth() {
    const [active,setActive] = useState(true);
  return (
    <div className='loginContainer'>
        <div className='box h-[30rem] w-[25rem]'>
            <div className='minContainer login'>
                <div className='loginBox w-full px-20 space-y-5'>
                    {active ? <SignUp/> : <SignIn />}

                    <div>
                        <span>{active?"already have an account?":"doesn't have a account"}</span>
                        <Button onClick={()=> setActive(!active)} variant = "ghost">
                            {active ? "SignIn" : "SignUp"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
