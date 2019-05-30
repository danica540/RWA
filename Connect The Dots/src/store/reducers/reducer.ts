
import { Action } from "redux";
import { Dot } from "../../models/Dot";
import { GET_IMAGE, GetImage, CHANGE_STATE, ChangeState } from "../actions/actions";
import { Image } from "../../models/Image";

const initialState: Image[] = [];

export function reducer(state: Image[] = initialState, action: Action) { 
    switch (action.type) {
        case GET_IMAGE: {
            const {id} = action as GetImage;
            console.log("SAGA "+id);
            return state.filter((img: Image) => img.id === id);
        }
        case CHANGE_STATE: {
            const { images } = (action as ChangeState);
            const state = images;
            return state;
        }
        default:
            return state; //uvek mora da ima default koji vraca staro stanje
    }
}