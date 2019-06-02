
import { Action } from "redux";
import { Image } from "../../models/Image";
import { CHANGE_STATE, ChangeState } from "./actions";

const initialState: Image[] = [];

export function reducer(state: Image[] = initialState, action: Action) {
    switch (action.type) {
        case CHANGE_STATE: {
            const { images } = (action as ChangeState);
            const state = images;
            return state;
        }
        default:
            return state;
    }
}