
import {createEntityAdapter} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import { LocationActions, LocationsActionTypes } from '../actions/location.action';


export const locationAdapter = createEntityAdapter<any>({
//    sortComparer:sortByDate
});
// function sortByDate(e1: myComment, e2: myComment) {
//     return Number(e2.dateOfPublish) - Number(e1.dateOfPublish)
// }

export interface LocationState {
    ids:number[],
    entities:{[key:number]:any}
};

export const initialState:any={
    ids:[],
    entities:{}
}

export function locationReducer(state:LocationState=initialState,action:LocationActions) {

    switch(action.type){
        case LocationsActionTypes.LOAD_ALL_LOCATIONS_SUCCESS:{
            console.log("LOAD_LOCATIONS_SUCCESS");
            return locationAdapter.addAll(action.locations, state)
        }
        default:
            return state;
    }
}

export const getLocationState= createFeatureSelector<LocationState>('locations');

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = locationAdapter.getSelectors(getLocationState);  //u zagradi je bilo getCommentState

export const selectAllLocations=selectAll;
export const selectTotalLocations=selectTotal;
