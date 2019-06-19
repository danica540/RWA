import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user-service/user.service';
import { map, mergeMap } from 'rxjs/operators';
import { UserEventResponseActionTypes, AddResponse, DeleteResponse } from '../actions/user-event-response.action';



@Injectable()
export class UserEventResponseEffects {

    constructor(private action$: Actions, private userService: UserService) { }


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
            mergeMap((response) => this.userService.addEventThatUserIsInteresstedIn(response).pipe(
                map(newResponse => ({ type: UserEventResponseActionTypes.ADD_RESPONSE_SUCCESS, responses: newResponse }))
            ))
        )
    )

    deleteResponse = createEffect(() =>
        this.action$.pipe(
            ofType<DeleteResponse>(UserEventResponseActionTypes.DELETE_RESPONSE),
            map(action=>action.id),
            mergeMap((id) => this.userService.deleteEventThatUserIsInteresstedIn(id).pipe(
                map(object => ({ type: UserEventResponseActionTypes.DELETE_RESPONSE_SUCCESS, obj: object }))
            ))
        )
    )


}
