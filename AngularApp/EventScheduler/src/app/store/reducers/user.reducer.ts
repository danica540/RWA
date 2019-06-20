
import {createEntityAdapter} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import { UserModel } from 'src/app/models/UserModel';
import { UsersActions, UsersActionTypes } from '../actions/user.action';


export const userAdapter = createEntityAdapter<UserModel>({
//    sortComparer:sortByDate
});
// function sortByDate(e1: myComment, e2: myComment) {
//     return Number(e2.dateOfPublish) - Number(e1.dateOfPublish)
// }

export interface UsersState {
    ids:number[],
    entities:{[key:number]:UserModel}
};

export const initialState:UsersState={
    ids:[],
    entities:{}
}



export function userReducer(state:UsersState=initialState,action:UsersActions) {

    switch(action.type){
        case UsersActionTypes.ADD_USER_SUCCESS:{
            console.log("ADD_USER_SUCCESS");
            return userAdapter.addOne(action.user, state)
        }
        case UsersActionTypes.LOAD_ALL_USERS_SUCCESS:{
            console.log("LOAD_All_USERS_SUCCESS");
            return userAdapter.addAll(action.users, state)
        }
        default:
            return state;
    }
}

export const getUsersState= createFeatureSelector<UsersState>('users');

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = userAdapter.getSelectors(getUsersState);  //u zagradi je bilo getCommentState

export const selectAllUsers=selectAll;
export const selectTotalUsers=selectTotal;
