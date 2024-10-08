import React, { useEffect, useState } from 'react'
import {Card ,CardContent} from "@/components/ui/card"
import {Button } from "@/components/ui/button"
import {ScrollArea } from "@/components/ui/scroll-area"
import { MagnifyingGlassIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import ProjectCard from '../Project/ProjectCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects, searchProjects } from '../../Redux/project/Action'
import { Calendar } from "@/components/ui/calendar"



export const tags = [
    "ALL",
    "Javascript",
    "Typescript",
    "HTML CSS",
    "React.js",
    "Next.js",
    "Angular.js",
    "Vue.js",
    "PHP",
    "Laravel",
    "Spring Boot",
    "Python",
    "Django",
    "Flask",
    "MySql",
    "MongoDB",
    "FireBase",
    "Node.js",
    "Express.js",
    "Java",
    "Docker",
    "Kubernetes",
    "C++"
]

const ProjectList = () => {
    const [keyword,setKeyword] = useState("")
    const [showIndex,setShowIndex] = useState(3)
    const [showFilter,setShowFilter] = useState(false)
    const [date, setDate] = useState(new Date())
    const {project}  = useSelector(store => store);
    const dispatch = useDispatch();
    const handleFilterCategory= (value) => {
        if(value == "all"){
            dispatch(fetchProjects({}))
        }else{
            dispatch(fetchProjects({category:value}));
        }
        // console.log(section,value);
    }

    const handleFilterTags = (value) => {
        if(value == "ALL"){
            dispatch(fetchProjects({}))
        }else{
            dispatch(fetchProjects({tag:value}));
        }
    }
    const handleSearchChange= (e)=> {
        setKeyword(e.target.value);
        dispatch(searchProjects(e.target.value));
    }
    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth < 800) {
            setShowFilter(true);
          } else {
            setShowFilter(false); 
          }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
  return (
    <>
      <div className='relative px-3 lg:px-4 lg:flex gap-5 justify-center py-5'>
        <section className={`filterSection `}>
            <Card className="p-5 sticky top-10">
                <div className='flex justify-between lg:w-[20rem]'>
                    <p className={`text-xl -tracking-wider`}>
                        Filters
                    </p>
                    <Button varient="ghost" size="icon" className="cursor-pointer" onClick={()=> setShowFilter(!showFilter)}>
                        <MixerHorizontalIcon/>
                    </Button>
                </div>

                <CardContent className={showFilter ? `mt-5 hidden` :"mt-5"}>
                    <ScrollArea className="space-y-3 h-[73vh]">
                        <div>
                            <h1 className='pb-2 text-gray-400 border-b'>
                                Category
                            </h1>
                            <div className='pt-5 '>
                                <RadioGroup defaultValue="all" onValueChange={(value) => handleFilterCategory(value)} className="space-y-2 pt-2">
                                <div className='flex items-center gap-2 cursor-pointer'>
                                    <RadioGroupItem value='all' id='r1'/>
                                    <Label htmlFor = "r1">ALL</Label>
                                </div>
                                <div className='flex items-center gap-2 cursor-pointer'>
                                    <RadioGroupItem value='fullStack' id='r2'/>
                                    <Label htmlFor = "r2">Full Stack</Label>
                                </div>
                                <div className='flex items-center gap-2 cursor-pointer'>
                                    <RadioGroupItem value='frontend' id='r3'/>
                                    <Label htmlFor = "r3">Frontend</Label>
                                </div>
                                <div className='flex items-center gap-2 cursor-pointer'>
                                    <RadioGroupItem value='backend' id='r4'/>
                                    <Label htmlFor = "r4">Backend</Label>
                                </div>
                                <div className='flex items-center gap-2 cursor-pointer'>
                                    <RadioGroupItem value='ai/ml' id='r5'/>
                                    <Label htmlFor = "r5">AI/ML</Label>
                                </div>
                                </RadioGroup>
                            </div>
                        </div>

                        <div className='pt-5'> 
                            <h1 className='pb-2 text-gray-400 border-b'>
                                Tags
                            </h1>
                            <div className='pt-5 '>
                                <RadioGroup defaultValue="ALL" onValueChange={(value) => handleFilterTags(value)} className="space-y-2 pt-2">
                                {
                                    tags.map((item,index)=> {
                                        if (index <= showIndex){
                                            return (
                                                <div className='flex items-center gap-2 cursor-pointer' key={item}>
                                    <RadioGroupItem value={item} id={`r1-${item}`}/>
                                    <Label htmlFor = {`r1-${item}`}>{item}</Label>
                                </div>
                                            )
                                        }
                                
                                    })}
                               
                                </RadioGroup>
                                <div className="flex justify-center mt-1 ">
                                <Button className="mb-3" onClick={()=> {
                                    if(showIndex < tags.length){
                                        setShowIndex(tags.length)
                                    }else{
                                        setShowIndex(3)
                                    }
                                }}>
                                    {showIndex < tags.length ? (<span>Show More</span>) : (<span>Show Less</span>)}
                                </Button>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </CardContent>
                
            </Card>
            
        </section>

        <section className='projectListSection w-full lg:w-[48rem]'>
            <div className='flex gap-2 items-center pb-5 justify-between'>
                <div className='relative p-0 w-full mt-4 sm:mt-4 md:mt-4 lg:mt-0'>
                    <Input 
                    onChange={handleSearchChange}
                    placeholder = "Search For Projects"
                    className="40% px-9"
                    />
                    <MagnifyingGlassIcon className='absolute top-3 left-4'/>
                </div>
            </div>

            <div>
                <div className='space-y-5 mb-8'>
{
    keyword ? project.searchProjects.map((item) => 
        <ProjectCard key={item.id+1039302032939} item={item}/> // same id ho jayegi dono project card me isliye have to make the ids different
    ) : project.projects?.map((item) => 
    // <ProjectCard key={item.id} item = {item} />
    item ? <ProjectCard key={item.id} item={item} /> : null
    )
}
                </div>
            </div>

        </section>
        { window.innerWidth > 1024 ?<section>
       


  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-md border"
  />
    {/* <div>
        <h2>
            Alerts
        </h2>
        <div>
            Random
        </div>
    </div> */}

        </section> : ""}
      </div>
    </>
  )
}

export default ProjectList
