import { EventModel } from './EventModel';

export class UserHasEvent {
    id: string;
    eventId: number;
    userId: number;
    isComming: boolean;
    event?:EventModel

    constructor(){
    }

    setAttributes(id:string, eventId:number,userId:number,isComming:boolean){
        this.userId=userId;
        this.id=id;
        this.eventId=eventId;
        this.isComming=isComming;
    }
}