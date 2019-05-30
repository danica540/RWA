import { put, all, takeEvery } from "@redux-saga/core/effects";
import { getAllImages, getImage } from "../services/image.service";
import { GET_IMAGES, changeState, GET_IMAGE } from "./actions/actions";


export function* fetchImages(){ //poziva API
    const images = yield getAllImages();
    yield put(changeState(images));
}

export function* fetchImage(id:number){ //poziva API
    const images = yield getImage(id);
    yield put(changeState(images));
}
