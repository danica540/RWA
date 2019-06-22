import { EventModel } from './EventModel';

export class UserHasEvent {
    id?: number;
    eventId: number;
    userId: number;
    isComming: boolean;
    event?:EventModel

    constructor(){
    }

    setAttributes(eventId:number,userId:number,isComming:boolean){
        this.userId=userId;
        this.eventId=eventId;
        this.isComming=isComming;
    }
}