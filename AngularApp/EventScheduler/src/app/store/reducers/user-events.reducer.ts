
import {createEntityAdapter} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import { UserEventsActions, UserEventsActionTypes } from '../actions/user-events.action';
import { UserHasEvent } from 'src/app/models/UserHasEvent';


export const userEventsAdapter = createEntityAdapter<UserHasEvent>({
//    sortComparer:sortByDate
});
// function sortByDate(e1: myComment, e2: myComment) {
//     return Number(e2.dateOfPublish) - Number(e1.dateOfPublish)
// }

export interface UserEventsState {
    ids:string[],
    entities:{[key:string]:UserHasEvent}
};

export const initialState:UserEventsState={
    ids:[],
    entities:{}
}



export function userEventsReducer(state:UserEventsState=initialState,action:UserEventsActions) {

    switch(action.type){
        case UserEventsActionTypes.LOAD_USER_EVENTS_SUCCESS:{
            console.log("LOAD_USERS_EVENTS_SUCCESS");
            return userEventsAdapter.addAll(action.userEvents, state)
        }
        default:
            return state;
    }
}

export const getUserEventState= createFeatureSelector<UserEventsState>('user-events');

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = userEventsAdapter.getSelectors(getUserEventState);  //u zagradi je bilo getCommentState

export const selectAllUserEvents=selectAll;
export const selectTotalUserEvents=selectTotal;
