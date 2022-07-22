import { IAuth } from "./login.model";

export interface IAuthState {
    auth: IAuth | null;
}