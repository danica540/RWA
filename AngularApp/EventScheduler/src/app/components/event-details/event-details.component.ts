import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventModel } from 'src/app/models/EventModel';
import { EventService } from 'src/app/services/event-service/event.service';
import { MapServiceService } from 'src/app/services/map-service/map-service.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { UserHasEvent } from 'src/app/models/UserHasEvent';
import { returnFormatedDate } from 'src/app/functions/formatingFunctions';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  eventId: number;
  event: EventModel;
  latitude: number;
  longitude: number;
  isLoggedIn: boolean;
  userId: number;
  userResponse: UserHasEvent;
  isNumberOfPeopleMax:boolean=false;

  constructor(private userService: UserService, private route: ActivatedRoute, private mapService: MapServiceService, private eventService: EventService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.eventId = params["eventId"];
      this.getEvent(this.eventId);
    })
    if (localStorage.getItem("isLoggedIn") === "true") {
      this.isLoggedIn = true;
      this.userId = parseInt(localStorage.getItem("userId"));
      this.getUserResponse(this.userId, this.eventId);
    }
  }

  getEvent(id: number) {
    this.eventService.getEventById(id).subscribe(event => {
      this.event = event;
      this.checkIfMaximumCapacityIsReached();
      this.getCoordinates(this.event.address, this.event.city);
    });
  }

  checkIfMaximumCapacityIsReached(){
    if(this.event.maxCapacity===this.event.numberOfPeopleComing){
      this.isNumberOfPeopleMax=true;
    }
    else{
      this.isNumberOfPeopleMax=false;
    }
  }

  getUserResponse(userId: number, eventId: number) {
    this.userService.getEventsThatUserIsInteresstedIn(userId, eventId).subscribe(response => {
      this.userResponse = response[0];
    })
  }

  getCoordinates(address: string, city: string) {
    let fullAddress = this.returnFullAddress(address, city);
    this.mapService.getAddressLatLong(fullAddress).subscribe(rez => {
      this.latitude = (rez[0] as any).lat;
      this.longitude = (rez[0] as any).lon;
    });
  }

  returnFullAddress(address: string, city: string): string {
    address = address.replace(/ /g, "%20");
    city = city.replace(/ /g, "%20");
    return `${address}+${city}`;
  }

  registerCommingEvent() {
    this.userResponse=this.returnNewResponse();
    this.userService.addEventThatUserIsInteresstedIn(this.userResponse).subscribe(res => console.log(res));
    this.incrementNumberOfPeopleComming();
    this.updateEvent();
  }

  returnNewResponse(){
    let newResponse= new UserHasEvent();
    newResponse.eventId=this.eventId;
    newResponse.userId=this.userId;
    newResponse.isComming=true;
    newResponse.id=parseInt((Math.random()*7*13*17).toString());
    return newResponse;
  }

  incrementNumberOfPeopleComming(){
    this.event.numberOfPeopleComing += 1;
  }

  updateEvent(){
    this.checkIfMaximumCapacityIsReached();
    this.eventService.updateEvent(this.event).subscribe(res => console.log(res));
  }

  unregisterCommingEvent() {
    this.userService.deleteEventThatUserIsInteresstedIn(this.userResponse.id).subscribe(res => console.log(res));
    this.userResponse = null;

    this.decrementNumberOfPeopleComming();
    this.updateEvent();
  }

  decrementNumberOfPeopleComming(){
    this.event.numberOfPeopleComing -= 1;
  }

  returnFormatedDate(){
    return returnFormatedDate(this.event.date);
  }

}
