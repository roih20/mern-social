import { Dispatch } from "redux";
import { Action } from "../action";
import * as api from '../../api/index'
import { ActionType } from "../action-types";
import { ICreateUser, ILogUser, IUpdateUser } from "../../interface/user";
import { NavigateFunction } from "react-router-dom";
import { IComments, IPostPost, PostComment } from "../../interface/posts";

export const fetchAllPost = () => async (dispatch: Dispatch<Action>) => {
    
    try {
        const { data } = await api.getAllPosts()
        dispatch({type: ActionType.FETCH_ALL, payload: data})
    } catch (error) {
        console.log(error)
    }
}


export const fetchUserPost = (username: string | any) => async(dispatch: Dispatch<Action>) => {
      dispatch({type: ActionType.START_LOADING})
    try {
        const {data} = await api.getUserPost(username)
        dispatch({type: ActionType.FETCH_USER_POST, payload: data})
        dispatch({type: ActionType.END_LOADING})
    } catch (error) {
        console.log(error)
    }
}

export const userProfile = (username: string | any) => async(dispatch: Dispatch<Action>) => {
    try {
        const { data } = await api.getOneUser(username)
        dispatch({type: ActionType.USER_PROFILE, payload: data})
    } catch (error) {
        console.log(error)
    }
}



export const signUp = (newUser: ICreateUser) =>async (dispatch: Dispatch<Action>) => {
    try {
        const {data} = await api.registerUser(newUser)
        dispatch({type: ActionType.SIGN_UP, payload: data})
    } catch (error) {
        console.log(error)
    }
    
}

export const signIn = (oldUser: ILogUser, navigate: NavigateFunction) =>async (dispatch: Dispatch<Action>) => {
    try {
        const {data} = await api.loginUser(oldUser)
        dispatch({type: ActionType.SIGN_IN, payload: data})
        navigate('/')
    } catch (error) {
        console.log(error)
    }
    
}

export const submitPost = (post: IPostPost) => async (dispatch: Dispatch<Action>) => {
    try {
        const {data} = await api.createPost(post)
        dispatch({type: ActionType.CREATE_POST, payload: data})
    } catch (error) {
        console.log(error)
    }

}

export const getOnePost = (id: string | any) => async(dispatch: Dispatch<Action>) => {

    try {
        const { data } = await api.getOnePostById(id);
        dispatch({type: ActionType.FETCH_ONE_POST, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const deleteOwnPost = (id: string) =>async (dispatch: Dispatch<Action>) => {
    try {
        await api.deletePost(id);
        dispatch({type: ActionType.DELETE_POST, payload: id})
    } catch (error) {
        console.log(error)
    }
    
}

export const updatingUser = (id: string, updated: IUpdateUser) =>async (dispatch: Dispatch<Action>) => {
    try {
        const {data} = await api.updateUser(id, updated);
        dispatch({type: ActionType.UPDATE_USER, payload: data})

    } catch (error) {
        console.log(error);
    }    
}


export const commentPost = (comment: PostComment, id: string) => async(dispatch: Dispatch<Action>) => {
    try {
        const {data} = await api.commentsPost(comment, id)
        dispatch({type: ActionType.COMMENTS, payload: data})
        return data.comments
    } catch (error) {
        console.log(error)
    }
}