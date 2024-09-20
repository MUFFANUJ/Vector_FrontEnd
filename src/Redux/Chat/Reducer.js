import { FETCH_CHAT_BY_PROJECT_FAILTURE, FETCH_CHAT_BY_PROJECT_SUCCESS, FETCH_CHAT_MESSAGE_FAILTURE, FETCH_CHAT_MESSAGE_REQUEST, FETCH_CHAT_MESSAGE_SUCCESS, FETCH_MESSAGES_FAILTURE, FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS, SEND_MESSAGE_FAILTURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from "./ActionType";

const initialState = {
    messages:[],
    loading:false,
    error:null,
    chat:null,
}

const chatReducer = (state = initialState,action)=> {
    switch (action.type) {
        case FETCH_MESSAGES_REQUEST:
        case SEND_MESSAGE_REQUEST:
        case FETCH_CHAT_MESSAGE_REQUEST:
            return {
                ...state,
                loading:true,
                error:null
            }
        case FETCH_MESSAGES_SUCCESS:
        case FETCH_CHAT_MESSAGE_SUCCESS:
            return{
                ...state,
                loading:false,
                messages: action.messages,
            }
        case SEND_MESSAGE_SUCCESS:
            return{
                ...state,
                loading:false,
                messages: [...state.messages,action.message],
                
            }
        case FETCH_CHAT_BY_PROJECT_SUCCESS:
            return{
                ...state,
                loading:false,
                chat:action.chat,
            }
        case FETCH_MESSAGES_FAILTURE:
        case SEND_MESSAGE_FAILTURE:
        case FETCH_CHAT_MESSAGE_FAILTURE:
            return {
                ...state,
                loading:false,
                error:action.error
            }

        
        default:
            return state;
    }
}

export default chatReducer;