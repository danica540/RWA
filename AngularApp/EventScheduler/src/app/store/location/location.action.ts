import { Action } from '@ngrx/store';


export enum LocationsActionTypes {
    LOAD_ALL_LOCATIONS = "[Load All Locations]",
    LOAD_ALL_LOCATIONS_SUCCESS = "[Load All Locations Success]"
}



export class LoadLocations implements Action {
    readonly type = LocationsActionTypes.LOAD_ALL_LOCATIONS;
    constructor() { }
}

export class LoadLocationsSuccess implements Action {
    readonly type = LocationsActionTypes.LOAD_ALL_LOCATIONS_SUCCESS;
    constructor(public locations: any[]) { }
}


export type LocationActions
    = LoadLocations
    | LoadLocationsSuccess