import {createEntityAdapter} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import { UserHasEvent } from 'src/app/models/UserHasEvent';
import { UserEventResponseActions, UserEventResponseActionTypes } from '../actions/user-event-response.action';

export const responseAdapter = createEntityAdapter<UserHasEvent>({
//    sortComparer:sortById
});

export interface ResponseState {
    ids:number[],
    entities:{[key:number]:UserHasEvent}
};

export const initialState:ResponseState={
    ids:[],
    entities:{}
}

// function sortById(e1: Publication, e2: Publication) {
//     return e2.id - e1.id
// }

export function responseReducer(state:ResponseState=initialState,action:UserEventResponseActions) {

    switch(action.type){
        case UserEventResponseActionTypes.ADD_RESPONSE_SUCCESS:{
            console.log("----------------Response is added----------------");
            return responseAdapter.addOne(action.response, state)
        }
        case UserEventResponseActionTypes.LOAD_RESPONSES_SUCCESS:{
            console.log("----------------Responses are loaded----------------");
            return responseAdapter.addAll(action.responses,state)
        }
        case UserEventResponseActionTypes.DELETE_RESPONSE_SUCCESS:{
            console.log("----------------Responses is deleted---------------");
            return responseAdapter.removeOne(action.id,state)
        }
        default:
            return state;
    }
}

export const getResponseState= createFeatureSelector<ResponseState>('responses');

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = responseAdapter.getSelectors(getResponseState);  //u zagradi je bilo getCommentState

export const selectAllResponses=selectAll;
export const selectTotalResponses=selectTotal;
