import { Injectable } from '@angular/core'
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects'
import { mergeMap, map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user-service/user.service';
import { LoadUserEvents, UserEventsActionTypes } from '../actions/user-events.action';

@Injectable()
export class UserEventsEffects {

    constructor(private action$: Actions, private userService: UserService) { }

    getUserEvents = createEffect(() =>
        this.action$.pipe(
            ofType<LoadUserEvents>(UserEventsActionTypes.LOAD_USER_EVENTS),
            map(action=>action.userId),
            mergeMap((id) => this.userService.getEventsUserIsGoingTo(id).pipe(
                map(object => ({ type: UserEventsActionTypes.LOAD_USER_EVENTS_SUCCESS, userEvents: object }))
            ))
        )
    )
}
