import { Action } from "redux";
import { Image } from "../../models/Image";

//action creator, akcija je jedan prost tip
export const GET_IMAGE = "GET IMAGE";
export const GET_IMAGES = "GET IMAGES";
export const CHANGE_STATE = "CHANGE STATE";

export interface GetImages extends Action {
}

export function getImages(): GetImages {
    return {
        type: GET_IMAGES
    };
}

export interface GetImage extends Action {
    id: number
}

export function getImage(id: number): GetImage {
    return {
        type: GET_IMAGE,
        id: id
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
