
import { createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { UserEventsActions, UserEventsActionTypes } from '../actions/user-events.action';
import { UserHasEvent } from 'src/app/models/UserHasEvent';


export const userEventsAdapter = createEntityAdapter<UserHasEvent>({
});

export interface UserEventsState {
    ids: number[],
    entities: { [key: number]: UserHasEvent }
};

export const initialState: UserEventsState = {
    ids: [],
    entities: {}
}



export function userEventsReducer(state: UserEventsState = initialState, action: UserEventsActions) {

    switch (action.type) {
        case UserEventsActionTypes.LOAD_USER_EVENTS_SUCCESS: {
            userEventsAdapter.removeAll(state);
            return userEventsAdapter.addAll(action.userEvents, state)
        }
        case UserEventsActionTypes.REMOVE_ALL_USER_EVENTS: {
            userEventsAdapter.removeAll(state);
        }
        default:
            return state;
    }
}

export const getUserEventState = createFeatureSelector<UserEventsState>('userEvents');

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = userEventsAdapter.getSelectors(getUserEventState);

export const selectAllUserEvents = selectAll;
export const selectTotalUserEvents = selectTotal;
