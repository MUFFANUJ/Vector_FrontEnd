import { GET_USER_SUBSCRIPTION_FAILURE, GET_USER_SUBSCRIPTION_REQUEST, GET_USER_SUBSCRIPTION_SUCCESS, UPDATE_SUBSCRIPTION_FAILURE, UPDATE_SUBSCRIPTION_REQUEST, UPDATE_SUBSCRIPTION_SUCCESS } from "./ActionTypes";

const initialState = {
    userSubscription : null,
    loading:false,
    error:null,
}

const subscriptionReducer = (state = initialState,action)=> {
    switch (action.type) {
        case GET_USER_SUBSCRIPTION_REQUEST:
        case UPDATE_SUBSCRIPTION_REQUEST:
            return {
                ...state,
                loading:true,
                error:null,
            }
        case GET_USER_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading:false,
                userSubscription:action.payload,
                error:null,
            }
        case UPDATE_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading:false,
                userSubscription:action.payload,
                error:null,
            }

        case GET_USER_SUBSCRIPTION_FAILURE:
        case UPDATE_SUBSCRIPTION_FAILURE:
            return {
                ...state,
                loading:false,
                error:action.error,
            }
        default:
            return state;
    }
}
export default subscriptionReducer;