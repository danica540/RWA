import { Action } from '@ngrx/store';
import { UserHasEvent } from 'src/app/models/UserHasEvent';


export enum UserEventsActionTypes {
    LOAD_USER_EVENTS = "[Load User Events]",
    LOAD_USER_EVENTS_SUCCESS = "[Load User Events Success]",
    REMOVE_ALL_USER_EVENTS = "[Remove All User Events]"
}

export class LoadUserEvents implements Action {
    readonly type = UserEventsActionTypes.LOAD_USER_EVENTS;
    constructor(public userId: number) { }
}

export class LoadUserEventsSuccess implements Action {
    readonly type = UserEventsActionTypes.LOAD_USER_EVENTS_SUCCESS;
    constructor(public userEvents: UserHasEvent[]) { }
}

export class RemoveAllUserEvents implements Action {
    readonly type = UserEventsActionTypes.REMOVE_ALL_USER_EVENTS;
    constructor() { }
}


export type UserEventsActions
    = LoadUserEvents
    | LoadUserEventsSuccess
    | RemoveAllUserEvents