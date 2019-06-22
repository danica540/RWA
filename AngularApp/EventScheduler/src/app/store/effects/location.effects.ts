import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { mergeMap, map } from 'rxjs/operators';
import { EventService } from 'src/app/services/event-service/event.service';
import { LocationsActionTypes } from '../actions/location.action';

@Injectable()
export class LocationEffects {

    constructor(private action$: Actions, private eventService: EventService) { }

    getEventLocations = createEffect(() =>
        this.action$.pipe(
            ofType(LocationsActionTypes.LOAD_ALL_LOCATIONS),
            mergeMap(() => this.eventService.getEventLocations().pipe(
                map(eventLocations => ({ type: LocationsActionTypes.LOAD_ALL_LOCATIONS_SUCCESS, locations: eventLocations }))
            ))
        )
    )



}
