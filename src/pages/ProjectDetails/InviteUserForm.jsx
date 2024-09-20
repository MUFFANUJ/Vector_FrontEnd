import React from 'react'
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Dialog, DialogClose } from '@radix-ui/react-dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useDispatch } from 'react-redux'
import { inviteToProject } from '../../Redux/project/action'
import { useParams } from 'react-router-dom'

export default function InviteUserForm() {
  const dispatch = useDispatch();
  const {id} = useParams();
    const form = useForm({
        defaultValues:{
            email:""
        }
    })

    const onSubmit = (data)=>{
      dispatch(inviteToProject({email:data.email,projectId:id}))
        console.log("Form submitted successfull" ,data)
    }
  return (
    <div>
       <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} 
                name = "email"
                render = {({field})=> 
                <FormItem>
                    <FormControl>
                        <Input {...field}
                        type="email"
                        className="border w-full py-5 px-5"
                        placeholder = "Enter User Email"
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                }
                />

                <DialogClose>
                        <Button type="submit" className="w-full mt-2">
                                Invite User 
                            </Button>
                </DialogClose>
            </form>
      </Form>
    </div>
  )
}
