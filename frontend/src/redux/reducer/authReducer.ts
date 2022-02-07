import { AuthState } from "../../interface/user";
import { Action } from "../action";
import { ActionType } from "../action-types";

const initialState = {
    authData: null
}


const authReducer = (state: AuthState = initialState , action: Action) => {
    switch(action.type){
        case ActionType.SIGN_IN: 
            localStorage.setItem('user', JSON.stringify({...action.payload}))
            return {...state, authData: action.payload}
        case ActionType.SIGN_UP:
            return {...state, authData: action.payload }
        case ActionType.LOG_OUT:
            localStorage.clear()
            return {...state, authData: null}
        default: 
          return state
    }
}


export default authReducer;