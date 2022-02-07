import { UserState } from "../../interface/user";
import { Action } from "../action";
import { ActionType } from "../action-types";


const initialState = {
    user: {
        name: '',
        createdAt: '',
        username: '',
        avatar: '',
        
    },
    updateUser: {
      name: ''
    }
}


const userReducer = (state: UserState = initialState, action: Action) => {
    switch(action.type) {
        case ActionType.USER_PROFILE: 
          return {user: action.payload}
        case ActionType.UPDATE_USER:
          return {updateUser: action.payload} 
        default:
            return state
    }

}


export default userReducer;