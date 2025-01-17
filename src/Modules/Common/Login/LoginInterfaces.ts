import { SET_TOKEN,SET_INTERVAL  } from './LoginActionTypes';

export interface ILoginRequestData {
    userName: string;
    password: string;
}

export interface ILoginResponse {
    Token: string;
    Expiry: string;
    RefreshToken: string;
    TokenType: string;
    Scope: string;
    UserName?: string;
    EmailAddress?: string;
    FirstName?: string;
    LastName?: string;
    FullName?: string;
    UserRoleId?: string;
    Role?: IRole[];
    VerificationFlag?: number;
}

export interface User {
    UserName: string;
    Password: string;
    FirstName: string;
    LastName: string;
    IntialName: string;
    Token: string;
    DateOn: number;
    isAuthenticated: boolean;
    ApplicationID: string;
    Role: IRole[];
}

export interface IRole {
    userRoleId: number;
    roleCode: string;
}


export interface IToken  {
    type: typeof SET_TOKEN;
    token: string;
}

export interface IDisableInterval  {
    type: typeof SET_INTERVAL;
    isActive: boolean;
}

export type TokenTypes =
    IDisableInterval
    | IToken;
