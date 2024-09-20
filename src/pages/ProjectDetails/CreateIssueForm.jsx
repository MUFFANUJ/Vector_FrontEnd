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
import { createIssue } from '../../Redux/Issue/Action'
import { useParams } from 'react-router-dom'

export default function CreateIssueForm({status}) {
    const dispatch = useDispatch();
    const {id} = useParams();
    const form = useForm({
        defaultValues:{
            issueName:"",
            description:""
        }
    })

    const onSubmit = (data)=>{
        data.projectId = id;
        dispatch(createIssue(
            {title:data.issueName,
            description:data.description,
            projectId:id,
            status,
        }))
        console.log("Form submitted successfull" ,data)
    }
  return (
    <div>
      <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} 
                name = "issueName"
                render = {({field})=> 
                <FormItem>
                    <FormControl>
                        <Input {...field}
                        type="text"
                        className="border w-full py-5 px-5"
                        placeholder = "Enter Issue"
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>

                
                }
                />

            <FormField control={form.control} 
                name = "description"
                render = {({field})=> 
                <FormItem>
                    <FormControl>
                        <Input {...field}
                        type="text"
                        className="border w-full py-5 px-5"
                        placeholder = "Enter Issue Description"
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                }
                />
                <DialogClose>
                        <Button type="submit" className="w-full mt-2">
                                Create Issue 
                            </Button>
                </DialogClose>
            </form>
      </Form>
    </div>
  )
}
