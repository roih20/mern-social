import { stat } from "fs";
import { IPost, PostState } from "../../interface/posts";
import { Action } from "../action";
import { ActionType } from "../action-types";

const intialState = {
    posts: [],
    post: {
        message: '',
        creator: '',
        createdAt: '',
        creatorId: '',
        _id: '',
        creatorAvatar: '',
        creatorUsername: '',
        comments: []
    },
    isLoading: true
}

const postReducer = (state: PostState = intialState, action: Action) => {
    switch(action.type){
        case ActionType.START_LOADING: 
            return {...state, isLoading: true}
        case ActionType.END_LOADING: 
            return {...state, isLoading: false}
        case ActionType.FETCH_ALL:
            return  {posts: action.payload}
        case ActionType.FETCH_USER_POST: 
          return{posts: action.payload}
        case ActionType.COMMENTS: 
           return {
               ...state.posts,
            posts: state.posts.map((p: IPost) => {
                if(p._id === action.payload._id){
                    return action.payload
                }
                return p
            })
           }
        case ActionType.FETCH_ONE_POST:
            return {...state.post ,post: action.payload}
        case ActionType.CREATE_POST: 
           return {...state.posts, posts: [...state.posts, action.payload]}
        case ActionType.DELETE_POST: 
           const deletePost = state.posts.filter((post: IPost) => post._id !== action.payload);
           return {...state.posts, posts: deletePost}
        default: 
         return state
    }
}

export default postReducer;