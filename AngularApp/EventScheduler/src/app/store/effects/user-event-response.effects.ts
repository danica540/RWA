import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { mergeMap, map } from 'rxjs/operators';
import { EventService } from 'src/app/services/event-service/event.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { UserEventResponseActionTypes, AddResponse } from '../actions/user-event-response.action';

@Injectable()
export class UserEventResponseEffects {

    constructor(private action$: Actions, private eventService: EventService, private userService: UserService) { }


    getResponses = createEffect(() =>
        this.action$.pipe(
            ofType(UserEventResponseActionTypes.LOAD_RESPONSES),
            mergeMap(() => this.userService.getResponses().pipe(
                map(responseList => ({ type: UserEventResponseActionTypes.LOAD_RESPONSES_SUCCESS, responses: responseList }))
            ))
        )
    )

    addResponse = createEffect(() =>
        this.action$.pipe(
            ofType<AddResponse>(UserEventResponseActionTypes.ADD_RESPONSE),
            map(action => action.response),
            mergeMap(() => this.userService.getResponses().pipe(
                map(newResponse => ({ type: UserEventResponseActionTypes.ADD_RESPONSE_SUCCESS, responses: newResponse }))
            ))
        )
    )

    // TO DO
    // deleteEvent = createEffect(() =>
    //     this.action$.pipe(
    //         ofType<UpdateEvent>(UserEventResponseActionTypes.UPDATE_EVENT),
    //         map(action => action.event),
    //         mergeMap((updatedEvent) => this.eventService.updateEvent(updatedEvent).pipe(
    //             map(event => ({ type: UserEventResponseActionTypes.UPDATE_EVENT_SUCCESS, event: event, id: event.id }))
    //         ))
    //     )
    // )


}
