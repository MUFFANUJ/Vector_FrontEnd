import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import  authreducer  from "./Auth/Reducer";
import  projectReducer  from "./project/Reducer";
import chatReducer from "./Chat/Reducer";
import commentReducer from "./Comment/Reducer";
import issueReducer from "./Issue/Reducer";
import subscriptionReducer from "./Subscription/Reducer";

const rootReducer = combineReducers({
    auth:authreducer,
    project:projectReducer,
    chat:chatReducer,
    comment:commentReducer,
    issue:issueReducer,
    subscription:subscriptionReducer,
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));