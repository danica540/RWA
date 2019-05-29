import { Action } from "redux";
import { User } from "../../models/User";

export const GET_USER = "GET USER";
export const CHANGE_USER_STATE = "CHANGE USER STATE";

export interface GetUser extends Action {
    id: string
}

export function getUser(id_user: string): GetUser {
    return {
        type: GET_USER,
        id: id_user
    };
}

export interface ChangeUserState extends Action {
    user: User
}

export function changeUserState(user: User): ChangeUserState {
    return {
        type: CHANGE_USER_STATE,
        user: user
    }
}