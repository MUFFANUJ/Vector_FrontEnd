import api from "../../config/Api";
import { ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS, CREATE_PROJECT_FAILTURE, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS, FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS, INVITE_TO_PROJECT_REQUEST, INVITE_TO_PROJECT_SUCCESS, SEARCH_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS } from "./ActionType";

export const fetchProjects = ({category,tag}) => {
    return async(dispatch)=>{

    dispatch({type:FETCH_PROJECTS_REQUEST})
    try{
        const {data} = await api.get("/api/projects",{params:{category,tag}});
        console.log("all category projects data", data);
        dispatch({type:FETCH_PROJECTS_SUCCESS, projects:data})
    }catch(error){
        console.log("error",error);
    }
}
}


export const searchProjects = (keyword) => async(dispatch) => {
    dispatch({type:SEARCH_PROJECT_REQUEST})
    try{
        const {data} = await api.get("/api/projects/search?keyword="+keyword);
        console.log("searched project data", data);
        dispatch({type:SEARCH_PROJECT_SUCCESS, projects:data})
    }catch(error){
        console.log("error",error);
    }
}


export const createProjects = (projectData) => async(dispatch) => {
    dispatch({type:CREATE_PROJECT_REQUEST})
    try{
        const {data} = await api.post("/api/projects" ,projectData,{headers: {
            'Content-Type': 'application/json',
          }});
        console.log("project created successfully", data);
        dispatch({type:CREATE_PROJECT_SUCCESS, projects:data})
    }catch(error){

        console.log("error",error.message);
        // dispatch({type:CREATE_PROJECT_FAILTURE, error:error.message})
    }
}


export const fetchProjectById = (projectId) => async(dispatch) => {
    dispatch({type:FETCH_PROJECT_BY_ID_REQUEST})
    try{
        const {data} = await api.get("/api/projects/"+projectId);
        console.log("project data", data);
        dispatch({type:FETCH_PROJECT_BY_ID_SUCCESS, project:data})
    }catch(error){
        console.log("error",error);
    }
}


export const deleteProjectById = ({projectId}) => async(dispatch) => {
    dispatch({type:DELETE_PROJECT_REQUEST})
    try{
        const {data} = await api.delete("/api/projects/"+projectId);
        console.log("deleted data", data);
        dispatch({type:DELETE_PROJECT_SUCCESS, projectId})
    }catch(error){
        console.log("error",error);
    }
}


export const inviteToProject = ({email,projectId}) => async(dispatch) => {
    dispatch({type:INVITE_TO_PROJECT_REQUEST})
    try{
        const {data} = await api.post("/api/projects/invite",{email,projectId},{headers: {
            'Content-Type': 'application/json',
          }});
        console.log("Invited to project with id", projectId);
        dispatch({type:INVITE_TO_PROJECT_SUCCESS, payload:data})
    }catch(error){
        console.log("error",error);
    }
}


export const acceptInvitation = ({token,navigate}) => async(dispatch) => {
    dispatch({type:ACCEPT_INVITATION_REQUEST})
    try{
        const {data} = await api.get("/api/projects/accept_invitation",{params:{
            token
        }
    ,
    headers:{
        "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
    }});
        console.log(data)
        navigate("/project/"+ data.projectId)
        console.log("Accepted Invite to project with id", data.projectId);
        dispatch({type:ACCEPT_INVITATION_SUCCESS, payload:data})
    }catch(error){
        console.log("error",error);
    }
}