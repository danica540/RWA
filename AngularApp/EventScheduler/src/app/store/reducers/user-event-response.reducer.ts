import {createEntityAdapter} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import { UserHasEvent } from 'src/app/models/UserHasEvent';
import { UserEventResponseActions, UserEventResponseActionTypes } from '../actions/user-event-response.action';

export const responseAdapter = createEntityAdapter<UserHasEvent>({
});

export interface ResponseState {
    ids:number[],
    entities:{[key:number]:UserHasEvent}
};

export const initialState:ResponseState={
    ids:[],
    entities:{}
}

export function responseReducer(state:ResponseState=initialState,action:UserEventResponseActions) {

    switch(action.type){
        case UserEventResponseActionTypes.ADD_RESPONSE_SUCCESS:{
            return responseAdapter.addOne(action.response, state)
        }
        case UserEventResponseActionTypes.LOAD_RESPONSES_SUCCESS:{
            return responseAdapter.addAll(action.responses,state)
        }
        case UserEventResponseActionTypes.DELETE_RESPONSE_SUCCESS:{
            return responseAdapter.removeOne(action.id,state);
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
} = responseAdapter.getSelectors(getResponseState);

export const selectAllResponses=selectAll;
export const selectTotalResponses=selectTotal;
