import { Injectable } from '@angular/core'
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects'
import { mergeMap, map } from 'rxjs/operators';
import { EventService } from 'src/app/services/event-service/event.service';
import { EventsActionTypes, AddEvent, UpdateEvent, AddPhoto } from '../actions/event.action';

@Injectable()
export class EventEffects {

    constructor(private action$: Actions, private eventService: EventService) { }


    getEvents = createEffect(() =>
        this.action$.pipe(
            ofType(EventsActionTypes.LOAD_ALL_EVENTS),
            mergeMap(() => this.eventService.getEvents().pipe(
                map(events => ({ type: EventsActionTypes.LOAD_ALL_EVENTS_SUCCESS, events: events }))
            ))
        )
    )

    addEvent = createEffect(() =>
        this.action$.pipe(
            ofType<AddEvent>(EventsActionTypes.ADD_EVENT),
            map(action => action.event),
            mergeMap(() => this.eventService.getEvents().pipe(
                map(newEvent => ({ type: EventsActionTypes.ADD_EVENT_SUCCESS, event: newEvent }))
            ))
        )
    )

    addPhoto = createEffect(() =>
        this.action$.pipe(
            ofType<AddPhoto>(EventsActionTypes.ADD_PHOTO),
            map(action => action.formData),
            mergeMap((formData) => this.eventService.addEventPhoto(formData).pipe(
                map(newEvent => ({ type: EventsActionTypes.ADD_PHOTO_SUCCESS, formData: newEvent }))
            ))
        )
    )

    updateEvent = createEffect(() =>
        this.action$.pipe(
            ofType<UpdateEvent>(EventsActionTypes.UPDATE_EVENT),
            map(action => action.event),
            mergeMap((updatedEvent) => this.eventService.updateEvent(updatedEvent).pipe(
                map(event => ({ type: EventsActionTypes.UPDATE_EVENT_SUCCESS, event: event, id: event.id }))
            ))
        )
    )


}
