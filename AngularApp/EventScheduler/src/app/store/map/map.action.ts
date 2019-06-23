import { Action } from '@ngrx/store';


export enum MapActionTypes {
    LOAD_MAP = "[Load Map]",
    LOAD_MAP_SUCCESS = "[Load Map Success]"
}


export class LoadMap implements Action {
    readonly type = MapActionTypes.LOAD_MAP;
    constructor(public address: string) { }
}

export class LoadMapSuccess implements Action {
    readonly type = MapActionTypes.LOAD_MAP_SUCCESS;
    constructor(public obj: any[]) { }
}

export type MapActions
    = LoadMap
    | LoadMapSuccess