export interface IUserLogin {
    email: string
    password: string
}
export interface IUserRegister {
    email: string
    password: string
    confirm_password: string
    username: string
    access_code: string
}

export interface IReducerAction<T> {
    type: T;
    payload?: string | { [key: string]: string };
    data?: string | { [key: string]: string };
    name?: string;
}

export interface ILoginReducerAction extends IReducerAction<"email" | "password"> {
    payload: string
}

export interface IRegistereducerAction extends IReducerAction<"email" | "password" | "confirm_password" | "username" | "access_code"> {
    payload: string
}


