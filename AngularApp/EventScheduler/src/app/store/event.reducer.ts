import { Action } from '@ngrx/store';
import { DELETE_EVENT, DeleteEvent } from './event.action';
import { EventModel } from '../models/EventModel';

const initialState: EventModel[] = [];
//stanje samo u ovom reducer-u, nije globalno stanje
export default function eventReducer(state: EventModel[] = initialState, action: Action) {
    switch (action.type) {
        case (DELETE_EVENT): {
            const { eventId } = action as DeleteEvent;
            return state.filter((event: EventModel) => event.id !== eventId);
        }
        default:
            return state;
    }
}