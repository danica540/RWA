import { Action } from '@ngrx/store';

export const DELETE_EVENT = "[Delete event]"; //oivici se da se lepse formatira
export const SELECT_EVENT = "[Select event]";

export class DeleteEvent implements Action {
    type = DELETE_EVENT;
    constructor(public eventId: number) { }

}

export class SelectEvent implements Action {
    type = SELECT_EVENT
    constructor(public eventId: number) { }
}