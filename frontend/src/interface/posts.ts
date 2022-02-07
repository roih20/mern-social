import { StringLiteralLike } from "typescript";

export interface IPost {
    message: string;
    creator: string;
    createdAt: Date | string;
    creatorId: string;
    creatorUsername: string
    _id: string,
    creatorAvatar: string
    comments: IComments[]
}

export interface IPostPost {
    message: string;
    creator: string;
    creatorUsername: string;
    creatorAvatar: string;
}

export interface PostState {
    posts: IPost[];
    post: IPost;
    isLoading: boolean;
}

export interface IComments {
    comment: string
    name: string;
    username: string;
    avatar: string;
    _id: string
}


export interface PostComment {
    comment: string
    name: string;
    username: string;
    avatar: string;
}