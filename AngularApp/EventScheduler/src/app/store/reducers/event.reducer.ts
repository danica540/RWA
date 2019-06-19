
import {createEntityAdapter} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import { EventModel } from 'src/app/models/EventModel';
import { EventsActions, EventsActionTypes } from '../actions/event.action';


export const eventsAdapter = createEntityAdapter<EventModel>({
//    sortComparer:sortByDate
});
// function sortByDate(e1: myComment, e2: myComment) {
//     return Number(e2.dateOfPublish) - Number(e1.dateOfPublish)
// }

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
            console.log("ADD_EVENT_SUCCESS");
            return eventsAdapter.addOne(action.event, state)
        }
        case EventsActionTypes.LOAD_ALL_EVENTS_SUCCESS:{
            console.log("LOAD_All_EVENTS_SUCCESS");
            return eventsAdapter.addAll(action.events, state)
        }
        case EventsActionTypes.ADD_PHOTO_SUCCESS:{
            console.log("UPLOADED PHOTO");
            return state;
        }
        case EventsActionTypes.UPDATE_EVENT_SUCCESS:{
            console.log("UPDATE_EVENT_SUCCESS");
            return eventsAdapter.updateOne({
                id:action.id,
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
} = eventsAdapter.getSelectors(getEventsState);  //u zagradi je bilo getCommentState

export const selectAllEvents=selectAll;
export const selectTotalEvents=selectTotal;
