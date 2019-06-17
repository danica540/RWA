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
    time:string;

    constructor(){
        this.maxCapacity=null;
        //"Not limited"
    }

    setAttributes(headline:string,description:string,address:string,date:string,city:string,maxCapacity:number,img:string,time:string){
        this.numberOfPeopleComing=0;
        this.id=parseInt((Math.random()*7*13*17).toString());
        console.log(this.id);
        this.headline=headline;
        this.description=description;
        this.address=address;
        this.date=date;
        this.city=city;
        this.maxCapacity=maxCapacity;
        this.time=time;
        this.img=img;
    }
}

