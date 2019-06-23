import { Action } from '@ngrx/store';
import { UserModel } from 'src/app/models/UserModel';


export enum UsersActionTypes {
    ADD_USER = "[Add User]",
    ADD_USER_SUCCESS = "[Add User Success]",
    LOAD_ALL_USERS = "[Load All Users]",
    LOAD_ALL_USERS_SUCCESS = "[Load All Users Success]"
}

export class AddUser implements Action {
    readonly type = UsersActionTypes.ADD_USER;
    constructor(public user: UserModel) { }
}

export class AddUserSuccess implements Action {
    readonly type = UsersActionTypes.ADD_USER_SUCCESS;
    constructor(public user: UserModel) { }
}

export class LoadUsers implements Action {
    readonly type = UsersActionTypes.LOAD_ALL_USERS;
    constructor() { }
}

export class LoadUsersSuccess implements Action {
    readonly type = UsersActionTypes.LOAD_ALL_USERS_SUCCESS;
    constructor(public users: UserModel[]) { }
}

export type UsersActions
    = AddUser
    | AddUserSuccess
    | LoadUsers
    | LoadUsersSuccess