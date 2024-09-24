import { GET_USER_SUBSCRIPTION_FAILURE, GET_USER_SUBSCRIPTION_REQUEST, GET_USER_SUBSCRIPTION_SUCCESS, UPDATE_SUBSCRIPTION_FAILURE, UPDATE_SUBSCRIPTION_REQUEST, UPDATE_SUBSCRIPTION_SUCCESS } from "./ActionTypes";

export const getUserSubscription = () => async(dispatch) => {
    dispatch({type:GET_USER_SUBSCRIPTION_REQUEST})
    try{
        const response = await api.get("/api/subscriptions/user",{
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        // console.log("User Subscription ", response.data);
        dispatch({type:GET_USER_SUBSCRIPTION_SUCCESS, payload:response.data})
    }catch(error){
        console.log("error",error.message);
        dispatch({type:GET_USER_SUBSCRIPTION_FAILURE, error:error.message})
    }
}

export const upgradeSubscription = ({planType}) => async(dispatch) => {
    dispatch({type:UPDATE_SUBSCRIPTION_REQUEST})
    try{
        const response = await api.get("/api/subscriptions/upgrade",null,{
            params:{
                planType:planType
            },
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        // console.log("upgraded Subscription ", response.data);
        dispatch({type:UPDATE_SUBSCRIPTION_SUCCESS, payload:response.data})
    }catch(error){
        console.log("error",error.message);
        dispatch({type:UPDATE_SUBSCRIPTION_FAILURE, error:error.message})
    }
}