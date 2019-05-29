import { Action } from "redux";
import { User } from "../../models/User";
import { GET_USER } from "../actions/user-actions";

const initialState: User = null;

export function userReducer(state: User = initialState, action: Action) { //ako state nije naveden da bude inicijalno!
    switch (action.type) {
        case GET_USER: {

            return state;
        }
        default:
            return state; //uvek mora da ima default koji vraca staro stanje
    }
}