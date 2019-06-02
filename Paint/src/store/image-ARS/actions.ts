import { Action } from "redux";
import { Image } from "../../models/Image";

export const GET_IMAGES = "GET IMAGES";
export const CHANGE_STATE = "CHANGE STATE";

export interface GetImages extends Action {
}

export function getImages(): GetImages {
    return {
        type: GET_IMAGES
    };
}

export interface ChangeState extends Action {
    images: Image[]
}

export function changeState(images: Image[]): ChangeState {
    return {
        type: CHANGE_STATE,
        images: images
    }
}
