
import {createEntityAdapter} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import { EventModel } from 'src/app/models/EventModel';
import { EventsActions, EventsActionTypes } from './event.action';


export const eventsAdapter = createEntityAdapter<EventModel>({
});

export interface EventsState {
    ids:number[],
    entities:{[key:number]:EventModel}
};

export const initialState:EventsState={
    ids:[],
    entities:{}
}



export function eventsReducer(state:EventsState=initialState,action:EventsActions) {

    switch(action.type){
        case EventsActionTypes.ADD_EVENT_SUCCESS:{
            return eventsAdapter.addOne(action.event, state)
        }
        case EventsActionTypes.LOAD_ALL_EVENTS_SUCCESS:{
            return eventsAdapter.addAll(action.events, state)
        }
        case EventsActionTypes.ADD_PHOTO_SUCCESS:{
            return state;
        }
        case EventsActionTypes.UPDATE_EVENT_SUCCESS:{
            return eventsAdapter.updateOne({
                id:action.updatedEvent.id,
                changes:action.updatedEvent
            },state)
        }
        default:
            return state;
    }
}

export const getEventsState= createFeatureSelector<EventsState>('events');

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = eventsAdapter.getSelectors(getEventsState);

export const selectAllEvents=selectAll;
export const selectTotalEvents=selectTotal;
