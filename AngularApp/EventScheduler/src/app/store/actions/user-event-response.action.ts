import { Action } from '@ngrx/store';
import { UserHasEvent } from 'src/app/models/UserHasEvent';

// DELETE

export enum UserEventResponseActionTypes {
    ADD_RESPONSE = "[Add Response]",
    ADD_RESPONSE_SUCCESS = "[Add Response Success]",
    DELETE_RESPONSE = "[Delete Response]",
    DELETE_RESPONSE_SUCCESS = "[Delete Response Success]",
    LOAD_RESPONSES = "[Load Responses]",
    LOAD_RESPONSES_SUCCESS = "[Load Responses Success]"
}

export class AddResponse implements Action {
    readonly type = UserEventResponseActionTypes.ADD_RESPONSE;
    constructor(public response: UserHasEvent) { }
}

export class AddResponseSuccess implements Action {
    readonly type = UserEventResponseActionTypes.ADD_RESPONSE_SUCCESS;
    constructor(public response: UserHasEvent) { }
}

export class DeleteResponse implements Action {
    readonly type = UserEventResponseActionTypes.DELETE_RESPONSE;
    constructor(public id: string) { }
}

export class DeleteResponseSuccess implements Action {
    readonly type = UserEventResponseActionTypes.DELETE_RESPONSE_SUCCESS;
    constructor(public id: string) { }
    // OVDE U KONSTRUKTORU
}


export class LoadResponse implements Action {
    readonly type = UserEventResponseActionTypes.LOAD_RESPONSES;
    constructor() { }
}

export class LoadResponseSuccess implements Action {
    readonly type = UserEventResponseActionTypes.LOAD_RESPONSES_SUCCESS
    constructor(public responses: UserHasEvent[]) { }
}

export type UserEventResponseActions
    = AddResponse
    | AddResponseSuccess
    | LoadResponse
    | LoadResponseSuccess
    | DeleteResponse
    | DeleteResponseSuccess