
import {createEntityAdapter} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import { MapActions, MapActionTypes } from '../actions/map.action';


export const mapAdapter = createEntityAdapter<any>({

});

export interface MapState {
    ids:number[],
    entities:{[key:number]:any}
};

export const initialState:any={
    ids:[],
    entities:{}
}



export function mapReducer(state:MapState=initialState,action:MapActions) {

    switch(action.type){
        case MapActionTypes.LOAD_MAP_SUCCESS:{
            return mapAdapter.addAll(action.obj, state)
        }
        default:
            return state;
    }
}

export const getMapState= createFeatureSelector<MapState>('map');

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = mapAdapter.getSelectors(getMapState);

export const selectAllMaps=selectAll;
export const selectTotalMaps=selectTotal;
