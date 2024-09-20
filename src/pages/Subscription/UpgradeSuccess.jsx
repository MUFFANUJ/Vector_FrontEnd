import React, { useEffect } from 'react'
import {Card ,CardContent} from "@/components/ui/card"
import { CheckCheckIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserSubscription, upgradeSubscription } from '../../Redux/Subscription/Action'

export default function UpgradeSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {subscription} = useSelector(store=> store);
  const queryParams = new URLSearchParams(location.search);

  const payment_id = queryParams.get("payment_id")
  const planType = queryParams.get("planType")


  useEffect(()=>{
    dispatch(upgradeSubscription({planType}));
    dispatch(getUserSubscription());
  },[])
  return (
    <div className='flex justify-center'>
      <Card className="mt-20 space-y-5 flex flex-col items-center p-6">
          <div className='flex items-center gap-4'>
              <CheckCheckIcon  className='h-9 w-9 text-green-500'/>
              <p className='text-xl'>
                Plan Upgraded Successfully
              </p>
          </div>
          <div className='space-y-3'>
              <p className='text-green-500'>
                Start Date : {subscription.userSubscription?.subscriptionStartDate}
              </p>
              <p className='text-red-500'>
                End Date : {subscription.userSubscription?.getSubscriptionEndDate}
              </p>
              <p className=''>
                Plan Type : {subscription.userSubscription?.planType}
              </p>
          </div>
          <Button onClick={()=> navigate("/")}>
              Go To Home
          </Button>
      </Card>
      
    </div>
  )
}
