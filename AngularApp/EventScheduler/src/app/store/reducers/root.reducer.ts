import { ActionReducerMap, reduceState } from '@ngrx/store';
import { ResponseState, responseReducer } from './user-event-response.reducer';
import { EventsState, eventsReducer } from './event.reducer';
import { mapReducer, MapState } from './map.reducer';

export interface State {
    responses:ResponseState,
    events:EventsState,
    map:MapState
}

export const rootReducer: ActionReducerMap<State> = {
    responses:responseReducer,
    events:eventsReducer,
    map:mapReducer
};