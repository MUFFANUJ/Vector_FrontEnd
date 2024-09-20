import React from 'react'
import {Button } from "@/components/ui/button"
import { CheckCircleIcon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { createPayment } from '../../Redux/Payment/Action';

export default function SubscriptionCard({data}) {
  const dispatch = useDispatch();
  const handleUpgrade = () => {
    dispatch(createPayment({planType:data.planType,jwt:localStorage.getItem('jwt')}));
  }
  return (
    <div className='rounded-xl bg-[#1b1b1b] bg-capacity-20 shadow-[#14173b] shadow-2xl card p-5 space-y-5 w-[18rem]'>
      <p>{data.planName}</p>
      <p>
        <span className='text-xl font-semibold m-1'> {data.price}</span>
        <span>{data.planType}</span>
      </p>
      {data.planType === "ANNUAL" && <p className='text-green-500'>30% OFF</p>}

      <Button className="w-full" onClick={handleUpgrade}>
        {data.buttonName}
      </Button>

      <div className=' flex flex-col gap-2'>
        {data.features.map((item) => <div key={item} className='flex items-center gap-2'>
            <CheckCircleIcon />
            <p>{item}</p>
        </div>)}
      </div>
    </div>
  )
}
