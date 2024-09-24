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
import { Register } from '../../Redux/Auth/Action'

export default function SignUp() {
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues:{
            email:"",
            password:"",
            fullName:""
        }
    })

    const onSubmit = (data)=>{
        dispatch(Register(data));
        // console.log("Form submitted successfull" ,data)
    }
  return (
    <div>
      <h1>Register</h1>
      <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} 
                name = "fullName"
                render = {({field})=> 
                <FormItem>
                    <FormControl>
                        <Input {...field}
                        type="text"
                        className="border w-full py-5 px-5"
                        placeholder = "Enter Full Name"
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>

                
                }
                />

            <FormField control={form.control} 
                name = "email"
                render = {({field})=> 
                <FormItem>
                    <FormControl>
                        <Input {...field}
                        type="email"
                        className="border w-full py-5 px-5"
                        placeholder = "Enter your Email"
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                }
                />

            <FormField control={form.control} 
                name = "password"
                render = {({field})=> 
                <FormItem>
                    <FormControl>
                        <Input {...field}
                        type="password"
                        className="border w-full py-5 px-5"
                        placeholder = "Enter your Password"
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                }
                />
    
                        <Button type="submit" className="w-full mt-2">
                                SignUp Now! 
                            </Button>

            </form>
      </Form>
    </div>
  )
}
