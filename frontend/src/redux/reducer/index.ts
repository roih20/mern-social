import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
    posts: postReducer,
    user: userReducer,
    auth: authReducer
})


export default reducers;

export type RootState = ReturnType<typeof reducers>