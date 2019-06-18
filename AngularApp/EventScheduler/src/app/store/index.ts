import { ActionReducerMap } from '@ngrx/store';
// import moviesReducer from './movies.reducer'; //zato sto je default, pa mozemo da ga krstimo kako hocemo
// import selectedMovieReducer from './selected-movie.reducer';
import { EventModel } from '../models/EventModel';
import eventReducer from './event.reducer';

export interface State {
    events: EventModel[];
    // selectedMovie: string;
}

export const rootReducer: ActionReducerMap<State> = {
    events: eventReducer,
    // selectedMovie: selectedMovieReducer
};