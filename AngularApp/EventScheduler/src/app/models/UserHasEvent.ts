import { EventModel } from './EventModel';

export class UserHasEvent {
    id: string;
    eventId: number;
    userId: number;
    isComming: boolean;
    event?:EventModel

    constructor(){
        
    }
}