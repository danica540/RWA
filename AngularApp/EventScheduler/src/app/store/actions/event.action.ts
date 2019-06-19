import { Action } from '@ngrx/store';
import { EventModel } from 'src/app/models/EventModel';


export enum EventsActionTypes {
    ADD_EVENT = "[Add Event]",
    ADD_EVENT_SUCCESS = "[Add Event Success]",
    LOAD_ALL_EVENTS = "[Load All Events]",
    LOAD_ALL_EVENTS_SUCCESS = "[Load All Events Success]",
    ADD_PHOTO = "[Add Photo]",
    ADD_PHOTO_SUCCESS = "[Add Photo Success]",
    UPDATE_EVENT = "[Update Event]",
    UPDATE_EVENT_SUCCESS = "[Update Event Success]"
}

export class AddEvent implements Action {
    readonly type = EventsActionTypes.ADD_EVENT;
    constructor(public event: EventModel) { }
}

export class AddEventSuccess implements Action {
    readonly type = EventsActionTypes.ADD_EVENT_SUCCESS;
    constructor(public event: EventModel) { }
}

export class UpdateEvent implements Action {
    readonly type = EventsActionTypes.UPDATE_EVENT;
    constructor(public event: EventModel) { }
}

export class UpdateEventSuccess implements Action {
    readonly type = EventsActionTypes.UPDATE_EVENT_SUCCESS;
    constructor(public id: number, public updatedEvent: Partial<EventModel>) { }
}

export class LoadEvents implements Action {
    readonly type = EventsActionTypes.LOAD_ALL_EVENTS;
    constructor() { }
}

export class LoadEventsSuccess implements Action {
    readonly type = EventsActionTypes.LOAD_ALL_EVENTS_SUCCESS;
    constructor(public events: EventModel[]) { }
}

export class AddPhoto implements Action {
    readonly type = EventsActionTypes.ADD_PHOTO;
    constructor(public formData:FormData) { }
}

export class AddPhotoSuccess implements Action {
    readonly type = EventsActionTypes.ADD_PHOTO_SUCCESS;
    constructor() { }
}

export type EventsActions
    = AddEvent
    | AddEventSuccess
    | AddPhoto
    | AddPhotoSuccess
    | UpdateEvent
    | UpdateEventSuccess
    | LoadEvents
    | LoadEventsSuccess