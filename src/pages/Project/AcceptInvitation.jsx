import React from 'react'
import { Button } from "@/components/ui/button"
import { useDispatch } from 'react-redux'
import { acceptInvitation } from '../../Redux/project/action';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AcceptInvitation() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleAcceptInvitation = () => {
        const urlParam = new URLSearchParams(location.search);
        const token = urlParam.get("token");
        dispatch(acceptInvitation({
            token,
            navigate
        }))
    }
  return (
    <div className='h-[85vh] flex flex-col justify-center items-center'>
        <h1 className='py-5 font-semibold text-xl'>
            You Are Invited To Join The Project Click Below To Accept The Invitation
        </h1>
        <Button onClick={handleAcceptInvitation}>
                Count Me In !!!
        </Button>
    </div>
  )
}
