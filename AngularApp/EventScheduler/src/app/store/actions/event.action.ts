import { Action } from '@ngrx/store';
import { EventModel } from 'src/app/models/EventModel';


export enum EventsActionTypes {
    ADD_EVENT = "[Add Event]",
    ADD_EVENT_SUCCESS = "[Add Event Success]",
    UPDATE_EVENT = "[Update Event]",
    UPDATE_EVENT_SUCCESS = "[Update Event Success]",
    LOAD_ALL_EVENTS = "[Load All Events]",
    LOAD_ALL_EVENTS_SUCCESS = "[Load All Events Success]",
    LOAD_SEARCHED_EVENTS = "[Load Searched Events]",
    LOAD_SEARCHED_EVENTS_SUCCESS = "[Load Searched Events Success]"
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
    constructor(public id:number,public updatedEvent: Partial<EventModel>) { }
}

export class LoadEvents implements Action {
    readonly type = EventsActionTypes.LOAD_ALL_EVENTS;
    constructor() { }
}

export class LoadEventsSuccess implements Action {
    readonly type = EventsActionTypes.LOAD_ALL_EVENTS_SUCCESS;
    constructor(public events: EventModel[]) { }
}

// export class LoadSearchedEvents implements Action {
//     readonly type = EventsActionTypes.LOAD_SEARCHED_EVENTS;
//     constructor(public text:string) { }
// }

// export class LoadSearchedEventsSuccess implements Action {
//     readonly type = EventsActionTypes.LOAD_SEARCHED_EVENTS_SUCCESS;
//     constructor(public events: EventModel[]) { }
// }

export type EventsActions
    = AddEvent
    | AddEventSuccess
    | UpdateEvent
    | UpdateEventSuccess
    | LoadEvents
    | LoadEventsSuccess
    // | LoadSearchedEvents
    // | LoadSearchedEventsSuccess