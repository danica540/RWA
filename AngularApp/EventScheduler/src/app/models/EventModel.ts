export class EventModel{
    id:number;
    headline:string;
    description:string;
    date:string;
    address:string;
    city:string;
    img:string;
    maxCapacity:number;
    numberOfPeopleComing:number;

    constructor(){
        this.maxCapacity=null;
        //"Not limited"
    }
}

