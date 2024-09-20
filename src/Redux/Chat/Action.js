import api from "../../config/api";
import { FETCH_CHAT_BY_PROJECT_FAILTURE, FETCH_CHAT_BY_PROJECT_REQUEST, FETCH_CHAT_BY_PROJECT_SUCCESS, FETCH_CHAT_MESSAGE_FAILTURE, FETCH_CHAT_MESSAGE_REQUEST, FETCH_CHAT_MESSAGE_SUCCESS, FETCH_MESSAGES_REQUEST, SEND_MESSAGE_FAILTURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from "./ActionType"

export const sendMessage = (messageData) => {
    return async(dispatch) => {
        dispatch({type:SEND_MESSAGE_REQUEST});
        try{
            const response = await api.post("/api/messages/send", messageData,{headers: {
                'Content-Type': 'application/json',
              }})
            console.log("message sent",response.data);
            dispatch({type:SEND_MESSAGE_SUCCESS,message:response.data});
        }catch(error){
            dispatch({type:SEND_MESSAGE_FAILTURE, error:error.message})
            console.log("error",error);
        }
    }
}


export const fetchChatByProject = (projectId) => {
    return async(dispatch) => {
        dispatch({type:FETCH_CHAT_BY_PROJECT_REQUEST});
        try{
            const response = await api.get(`/api/projects/${projectId}/chat`);
            console.log("fetch chat",response.data);
            dispatch({type:FETCH_CHAT_BY_PROJECT_SUCCESS,chat:response.data});
        }catch(error){
            dispatch({type:FETCH_CHAT_BY_PROJECT_FAILTURE, error:error.message})
            console.log("error",error);
        }
    }
}


export const fetchChatMessages = (chatId) => {
    return async(dispatch) => {
        dispatch({type:FETCH_CHAT_MESSAGE_REQUEST});
        try{
            const response = await api.get(`/api/messages/chat/${chatId}`);
            console.log("fetch messages",response.data);
            dispatch({type:FETCH_CHAT_MESSAGE_SUCCESS,chatId,messages:response.data});
        }catch(error){
            dispatch({type:FETCH_CHAT_MESSAGE_FAILTURE, error:error.message})
            console.log("error",error);
        }
    }
}

