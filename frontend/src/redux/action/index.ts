import { IComments, IPost, IPostPost } from "../../interface/posts";
import { ICreateUser, ILogUser, IUpdateUser, IUserProfile } from "../../interface/user";
import { ActionType } from "../action-types";

interface GetAllPosts {
    type: ActionType.FETCH_ALL
    payload: IPost
}

interface GetUserPost {
    type: ActionType.FETCH_USER_POST
    payload: IPost
}

interface CreatePost {
    type: ActionType.CREATE_POST
    payload: IPostPost
}


interface DeletePost {
    type: ActionType.DELETE_POST
    payload: string
}

interface GetOnePost {
    type: ActionType.FETCH_ONE_POST;
    payload: IPost
}

interface CreateUser {
    type: ActionType.SIGN_UP
    payload: ICreateUser
}

interface LogUser {
    type: ActionType.SIGN_IN
    payload: ILogUser
}

interface UpdateUser {
    type: ActionType.UPDATE_USER
    payload: IUpdateUser
}

interface DeleteUser {
    type: ActionType.DELETE_USER
    payload: string
}

interface ChangePassword {
    type: ActionType.CHANGE_PASSWORD
    payload: string
}

interface UserProfle {
    type: ActionType.USER_PROFILE
    payload: IUserProfile
}

interface LogOut {
    type: ActionType.LOG_OUT
}

interface Loading {
    type: ActionType.START_LOADING
}

interface EndLoading {
    type: ActionType.END_LOADING
}

interface GetComments {
    type: ActionType.COMMENTS
    payload: IPost
}


export type Action = GetAllPosts | GetOnePost | GetUserPost | CreatePost  | DeletePost |  GetComments  | CreateUser | LogUser | UpdateUser | DeleteUser | ChangePassword | UserProfle | LogOut | Loading | EndLoading

