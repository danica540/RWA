export class UserHasEvent {
    id: number;
    eventId: number;
    userId: number;
    isComming: boolean;

    constructor(){}

    setAttributes(eventId:number,userId:number,isComming:boolean){
        this.id=(Math.random()*7*13)%123;
        this.eventId=eventId;
        this.userId=userId;
        this.isComming=isComming;
    }
}