import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { mergeMap, map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user-service/user.service';
import { UsersActionTypes, AddUser } from '../actions/user.action';

@Injectable()
export class UserEffects {

    constructor(private action$: Actions, private userService: UserService) { }


    getUsers = createEffect(() =>
        this.action$.pipe(
            ofType(UsersActionTypes.LOAD_ALL_USERS),
            mergeMap(() => this.userService.getAllUsers().pipe(
                map(users => ({ type: UsersActionTypes.LOAD_ALL_USERS_SUCCESS, users: users }))
            ))
        )
    )

    addUser = createEffect(() =>
        this.action$.pipe(
            ofType<AddUser>(UsersActionTypes.ADD_USER),
            map(action => action.user),
            mergeMap((user) => this.userService.registerUser(user).pipe(
                map(newUser => ({ type: UsersActionTypes.ADD_USER_SUCCESS, user: newUser }))
            ))
        )
    )

}
