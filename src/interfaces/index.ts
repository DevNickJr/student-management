export interface IUserLogin {
    email: string
    password: string
}

export interface IForgotPassword { 
    email: string, 
    redirect_url: string 
}

export interface IChangePassword { 
    password: string,
    confirm_password: string, 
    token: string, 
    uidb64: 'MTI' 
}

export interface IUserRegister {
    email: string
    password: string
    confirm_password: string
    phone: string
    first_name: string      
    last_name: string        
    level: string      
    matric_no: string  
}

export interface IRegisterFace {
    email: string
    image: string
}

export interface IVerifiedFace {
    level: string
    image: string
}

export interface IProfile {
    email: string
    phone: string
    first_name: string      
    last_name: string        
    middle_name: string
    level: string      
    matric_no: string 
  }

export interface IUser extends IUserRegister {
    status: string
    middle_name: string | null,
    profile_picture_url: string,
    is_active: boolean | null,
    is_verified: boolean | null,
    is_staff: boolean | null
}

export interface IPassword {
    old_password: string
    new_password: string
    confirm_password: string
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

export interface IRegistereducerAction extends IReducerAction<"email" | "password" | "confirm_password" | "phone" | "first_name" | "last_name" | "level" | "matric_no"> {
    payload: string
}


export interface ITableColumn {
    name: string;
    label: string;
    extra?: boolean;
    custom?: (value: string, meta: any) => JSX.Element;
    options?: {
        filter: boolean;
        sort: boolean;
    };
}