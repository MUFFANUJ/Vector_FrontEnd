import api from "../../config/Api";
import { ASSIGNED_ISSUE_TO_USER_FAILURE, ASSIGNED_ISSUE_TO_USER_REQUEST, ASSIGNED_ISSUE_TO_USER_SUCCESS, CREATE_ISSUE_FAILURE, CREATE_ISSUE_REQUEST, CREATE_ISSUE_SUCCESS, DELETE_ISSUE_FAILURE, DELETE_ISSUE_REQUEST, DELETE_ISSUE_SUCCESS, FETCH_ISSUES_FAILURE, FETCH_ISSUES_REQUEST, FETCH_ISSUES_SUCCESS, FETCH_ISSUE_BY_ID_FAILURE, FETCH_ISSUE_BY_ID_REQUEST, FETCH_ISSUE_BY_ID_SUCCESS, UPDATE_ISSUE_STATUS_FAILURE, UPDATE_ISSUE_STATUS_REQUEST, UPDATE_ISSUE_STATUS_SUCCESS } from "./ActionType";

export const fetchIssues = (id) => {
    return async(dispatch)=> {
        dispatch({type:FETCH_ISSUES_REQUEST});
        try{
            const response = await api.get(`/api/issues/project/${id}`);
            // console.log("Issues FETCHED", response.data);
            dispatch({type:FETCH_ISSUES_SUCCESS, issues:response.data});
        }catch(error){
            console.log("ERROR", error.message);
            dispatch({type:FETCH_ISSUES_FAILURE,error:error.message});
        }
    }
}


export const fetchIssueById = (id) => {
    return async(dispatch)=> {
        dispatch({type:FETCH_ISSUE_BY_ID_REQUEST});
        try{
            const response = await api.get(`/api/issues/${id}`);
            // console.log("Issues By Id FETCHED", response.data);
            dispatch({type:FETCH_ISSUE_BY_ID_SUCCESS, issues:response.data});
        }catch(error){
            console.log("ERROR", error.message);
            dispatch({type:FETCH_ISSUE_BY_ID_FAILURE,error:error.message});
        }
    }
}


export const updateIssueStatus = ({id,status}) => {
    return async(dispatch)=> {
        dispatch({type:UPDATE_ISSUE_STATUS_REQUEST});
        try{
            const response = await api.put(`/api/issues/${id}/status/${status}`);
            // console.log("Issues status UPDATED", response.data);
            dispatch({type:UPDATE_ISSUE_STATUS_SUCCESS, issues:response.data});
        }catch(error){
            console.log("ERROR", error.message);
            dispatch({type:UPDATE_ISSUE_STATUS_FAILURE,error:error.message});
        }
    }
}

export const assignUserToIssue = ({IssueId,userid}) => {
    return async(dispatch)=> {
        dispatch({type:ASSIGNED_ISSUE_TO_USER_REQUEST});
        try{
            const response = await api.put(`/api/issues/${IssueId}/assignee/${userid}`);
            // console.log("User assigned to the Issue", response.data);
            dispatch({type:ASSIGNED_ISSUE_TO_USER_SUCCESS, issues:response.data});
        }catch(error){
            console.log("ERROR", error.message);
            dispatch({type:ASSIGNED_ISSUE_TO_USER_FAILURE,error:error.message});
        }
    }
}

export const createIssue = (issueData) => {
    return async(dispatch)=> {
        dispatch({type:CREATE_ISSUE_REQUEST});
        try{
            const response = await api.post(`/api/issues`,issueData,{headers: {
                'Content-Type': 'application/json',
              }});
            console.log("Issue Created Successfully", response.data);
            dispatch({type:CREATE_ISSUE_SUCCESS, issues:response.data});
        }catch(error){
            console.log("ERROR", error.message);
            dispatch({type:CREATE_ISSUE_FAILURE,error:error.message});
        }
    }
}

export const deleteIssue = (issueId) => {
    return async(dispatch)=> {
        dispatch({type:DELETE_ISSUE_REQUEST});
        try{
            const response = await api.delete(`/api/issues/`+issueId);
            console.log("Project Deleted successfully with id",issueId);
            dispatch({type:DELETE_ISSUE_SUCCESS, issueId});
        }catch(error){
            console.log("ERROR", error.message);
            dispatch({type:DELETE_ISSUE_FAILURE,error:error.message});
        }
    }
}