import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventModel } from 'src/app/models/EventModel';
import { EventService } from 'src/app/services/event-service/event.service';
import { MapServiceService } from 'src/app/services/map-service/map-service.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { UserHasEvent } from 'src/app/models/UserHasEvent';

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
  userResponse: UserHasEvent = null;

  constructor(private userService: UserService, private route: ActivatedRoute, private mapService: MapServiceService, private eventService: EventService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.eventId = params["eventId"];
      this.getEvent(this.eventId);
    })
    // this.eventId = parseInt(this.route.snapshot.paramMap.get("eventId"));
    // this.getEvent(this.eventId);

    if (localStorage.getItem("isLoggedIn") === "true") {
      this.isLoggedIn = true;
      this.userId = parseInt(localStorage.getItem("userId"));
      this.getUserResponse(this.userId, this.eventId);
    }
  }

  getEvent(id: number) {
    this.eventService.getEventById(id).subscribe(event => {
      this.event = event;
      this.getCoordinates(this.event.address, this.event.city);
    });
  }

  getUserResponse(userId: number, eventId: number) {
    this.userService.getEventsThatUserIsInteresstedIn(userId, eventId).subscribe(response => {
      console.log(response);
      this.userResponse = response[0];
    })
  }

  getCoordinates(address: string, city: string) {
    let fullAddress = this.returnFullAddress(address, city);
    this.mapService.getAddressLatLong(fullAddress).subscribe(rez => {
      console.log(rez);
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
    this.userResponse.eventId=this.eventId;
    this.userResponse.userId=this.userId;
    this.userResponse.isComming=true;
    this.userResponse.id=parseInt((Math.random()*7*13*17).toString());
    this.userService.addEventThatUserIsInteresstedIn(this.userResponse).subscribe(res => console.log(res));

    this.incrementNumberOfPeopleComming();
    this.updateEvent();
  }

  incrementNumberOfPeopleComming(){
    this.event.numberOfPeopleComing += 1;
  }

  updateEvent(){
    this.eventService.updateEvent(this.event).subscribe(res => console.log(res));
  }

  unregisterCommingEvent() {
    this.userService.deleteEventThatUserIsInteresstedIn(this.userResponse.id).subscribe(res => console.log(res));
    this.userResponse = null;

    this.decrementNumberOfPeopleComming();
    this.updateEvent();
  }

  decrementNumberOfPeopleComming(){
    this.event.numberOfPeopleComing += 1;
  }

}
