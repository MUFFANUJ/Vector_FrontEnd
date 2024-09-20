import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { Button } from "@/components/ui/button"
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
import { Dialog, DialogClose } from '@radix-ui/react-dialog'
import {tags} from "../ProjectList/ProjectList"
import { Cross1Icon } from '@radix-ui/react-icons'
import { useDispatch } from 'react-redux'
import { createProjects } from '../../Redux/project/action'

const CreateProjectForm = () => {
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues:{
            name:"",
            description:"",
            category:"",
            tags:["Javascript","React.js"]
        }
    })

    const onSubmit = (data)=>{
        dispatch(createProjects(data));
        console.log("Form submitted successfull" ,data)
    }

    const handleTagsChange=(newValue)=> {
        const currTags = form.getValues("tags");
        const updatedTags = currTags.includes(newValue) ? currTags.filter(tag => tag != newValue) :
        [...currTags,newValue];
        form.setValue("tags",updatedTags);
    }
  return (
    <div>
      <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} 
                name = "name"
                render = {({field})=> 
                <FormItem>
                    <FormControl>
                        <Input {...field}
                        type="text"
                        className="border w-full py-5 px-5"
                        placeholder = "Enter Project Name"
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
                        placeholder = "What's the project description? 👀"
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                }
                />

            <FormField control={form.control} 
                name = "category"
                render = {({field})=> 
                <FormItem>
                    <FormControl>
                        <Select 
                        defaultValue = "fullStack"
                        value={field.value}
                        onValueChange={(value)=> {field.onChange(value)}}
                        // className="border w-full py-5 px-5"
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue  placeholder="Category"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="fullStack">
                                    Full Stack
                                </SelectItem>
                                <SelectItem value="frontend">
                                    Frontend
                                </SelectItem>
                                <SelectItem value="backend">
                                    Backend
                                </SelectItem>
                                <SelectItem value="ai/ml">
                                    AI/ML
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                }
                />

<FormField control={form.control} 
                name = "tags"
                render = {({field})=> 
                <FormItem>
                    <FormControl>
                        <Select 
                        onValueChange={(value)=> {handleTagsChange(value)}}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue  placeholder="Tags"/>
                            </SelectTrigger>
                            <SelectContent>
                               { tags.map((item)=>
                               <SelectItem value={item} key={item}>
                                    {item}
                                </SelectItem>)}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <div className='flex flex-wrap gap-1'>
                            {field.value.map((item)=><div key={item} onClick={()=>handleTagsChange(item)} className='cursor-pointer flex px-2 items-center border gap-2 py-1 rounded-full'>
                                <span className='text-sm'>{item}</span>
                                <Cross1Icon className='h-3 w-3' />
                            </div>)}
                    </div>
                    <FormMessage />
                    </FormItem>
                }
                />
                <DialogClose>
                    {false? <div>
                        <p>
                            You Can create Only 4 Projects With the Free Plan, Upgrade Your plan To Create More Porjects.
                        </p>
                        </div> :
                        <Button type="submit" className="w-full mt-5">
                                Create Project 
                            </Button>}
                </DialogClose>
            </form>
      </Form>
    </div>
  )
}

export default CreateProjectForm
