export interface ICreateUser {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    avatar: File | null | string
}


export interface ILogUser {
    email: string;
    password: string;
}

export interface IUpdateUser {
  name: string
}

export interface AuthState {
    authData: null
}

export interface IUserLoged {
    result: {
        oldUser: OldUser
    },
    token: string
}

export interface IUserProfile {
    createdAt: string;
    name: string;
    username: string
    avatar: string
}

export interface UserState {
    user: IUserProfile;
    updateUser: IUpdateUser;
}


interface OldUser {
   avatar: string;
   name: string;
   username: string;
   id: string
}