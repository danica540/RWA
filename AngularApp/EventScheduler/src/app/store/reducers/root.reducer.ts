import { ActionReducerMap } from '@ngrx/store';
import { ResponseState, responseReducer } from '../user-event-response/user-event-response.reducer';
import { EventsState, eventsReducer } from '../events/event.reducer';
import { mapReducer, MapState } from '../map/map.reducer';
import { locationReducer, LocationState } from '../location/location.reducer';
import { UserEventsState, userEventsReducer } from '../user-events/user-events.reducer';
import { UsersState, userReducer } from '../user/user.reducer';

export interface State {
    responses: ResponseState,
    events: EventsState,
    map: MapState,
    locations: LocationState,
    userEvents:UserEventsState
    users:UsersState
}

export const rootReducer: ActionReducerMap<State> = {
    responses: responseReducer,
    events: eventsReducer,
    map: mapReducer,
    locations: locationReducer,
    userEvents:userEventsReducer,
    users:userReducer
};