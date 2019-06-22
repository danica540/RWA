export class EventModel{
    id?:number;
    headline:string;
    description:string;
    date:string;
    address:string;
    city:string;
    img:string;
    maxCapacity:number;
    numberOfPeopleComing:number;
    time:string;

    constructor(){
        this.numberOfPeopleComing=0;
    }
}

