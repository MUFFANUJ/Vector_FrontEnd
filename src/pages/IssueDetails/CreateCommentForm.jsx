import React from 'react'
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
import { createComment } from '../../Redux/Comment/Action'

export default function CreateCommentForm({issueId}) {
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues:{
            content:""
        }
    })

    const onSubmit = (data)=>{
        dispatch(createComment({content:data.content,issueId},{headers: {
            'Content-Type': 'application/json',
          }}));
        console.log("Form submitted successfull" ,data)
    }
  return (
    <div>
      <Form {...form}>
            <form className='flex gap-2' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} 
                name = "content"
                render = {({field})=> 
                <FormItem>
                    <div className='flex gap-2'> 
                        <div>
                            <Avatar>
                                <AvatarFallback>
                                    AS
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <FormControl>
                            <Input {...field}
                            type="text"
                            className="w-[20rem]"
                            placeholder = "Comment Here"
                            />
                        </FormControl>
                    </div>
                    <FormMessage />
                    </FormItem>
                }
                />
                        <Button type="submit">
                                Send 
                            </Button>
               
            </form>
      </Form>
    </div>
  )
}
