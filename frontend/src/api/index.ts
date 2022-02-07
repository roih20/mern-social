import axios, { AxiosRequestConfig } from 'axios'
import { IComments, IPostPost, PostComment } from '../interface/posts';
import { ICreateUser, ILogUser, IUpdateUser, IUserLoged } from '../interface/user';





const token : IUserLoged = JSON.parse(localStorage.getItem('user') as string)

const API = axios.create({baseURL: 'http://localhost:4000', headers: {
}})

API.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    if(localStorage.getItem('user')) {
        config.headers.Authorization = `Bearer ${token.token}`
    }
    
    return config
}, error => {
    return Promise.reject((error))
})

export const getAllPosts = () => API.get('/post');
export const createPost = (post: IPostPost) => API.post('/post', post)
export const getUserPost = (username: string | any) => API.get(`/post/${username}`)
export const deletePost = (id: string) => API.delete(`/post/${id}`)
export const getOnePostById = (id: string | any) => API.get(`/post/view-post/${id}`);
export const commentsPost = (comment: PostComment, id: string) => API.post(`/post/${id}/comment-post`, comment)



export const registerUser = (newUser: ICreateUser) => API.post('/auth/signUp', newUser)
export const loginUser = (olUser: ILogUser) => API.post('/auth/signIn', olUser);
export const updateUser = (id: string, userUpdated: IUpdateUser) => API.patch(`/auth/updateUser/${id}`, userUpdated);
export const deleteUser = (id: string) => API.delete(`/auth/deleteUser/${id}`)
export const changeUserPassword = (id: string, password: string) => API.patch(`/auth/changePassword/${id}`, password);
export const getOneUser = (username: string | any) => API.get(`auth/${username}`);

