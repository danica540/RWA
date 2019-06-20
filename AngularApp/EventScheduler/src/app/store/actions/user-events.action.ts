import { Action } from '@ngrx/store';
import { UserHasEvent } from 'src/app/models/UserHasEvent';


export enum UserEventsActionTypes {
    LOAD_USER_EVENTS = "[Load User Events]",
    LOAD_USER_EVENTS_SUCCESS = "[Load User Events Success]"
}


export class LoadUserEvents implements Action {
    readonly type = UserEventsActionTypes.LOAD_USER_EVENTS;
    constructor(public userId: number) { }
}

export class LoadUserEventsSuccess implements Action {
    readonly type = UserEventsActionTypes.LOAD_USER_EVENTS_SUCCESS;
    constructor(public userEvents: UserHasEvent[]) { }
}

export type UserEventsActions
    = LoadUserEvents
    | LoadUserEventsSuccess