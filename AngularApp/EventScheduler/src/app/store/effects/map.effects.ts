import { Injectable } from '@angular/core'
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects'
import { mergeMap, map } from 'rxjs/operators';
import { MapActionTypes, LoadMap } from '../actions/map.action';
import { MapServiceService } from 'src/app/services/map-service/map-service.service';

@Injectable()
export class MapEffects {

    constructor(private action$: Actions, private mapService: MapServiceService) { }

    getMap = createEffect(() =>
        this.action$.pipe(
            ofType<LoadMap>(MapActionTypes.LOAD_MAP),
            map(action=>action.address),
            mergeMap((address) => this.mapService.getAddressLatLong(address).pipe(
                map(object => ({ type: MapActionTypes.LOAD_MAP_SUCCESS, obj: object }))
            ))
        )
    )
}
