import { put } from "@redux-saga/core/effects";
import { changeState } from "./actions";
import { getAllImages } from "../../services/image.service";


export function* fetchImages() {
    const images = yield getAllImages();
    yield put(changeState(images));
}
