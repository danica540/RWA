import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventModel } from 'src/app/models/EventModel';
import { UserHasEvent } from 'src/app/models/UserHasEvent';
import { returnFormatedDate } from 'src/app/functions/formatingFunctions';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/root.reducer';
import { UpdateEvent } from 'src/app/store/actions/event.action';
import { AddResponse, DeleteResponse, LoadResponse } from 'src/app/store/actions/user-event-response.action';
import { LoadMap } from 'src/app/store/actions/map.action';
import { selectAllResponses } from 'src/app/store/reducers/user-event-response.reducer';
import { flatMap, filter } from 'rxjs/operators';
import { LoadUserEvents } from 'src/app/store/actions/user-events.action';

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
  isNumberOfPeopleMax: boolean = false;

  constructor(private store: Store<State>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.eventId = parseInt(params["eventId"]);
      this.getEvent(this.eventId);
    })
    if (localStorage.getItem("isLoggedIn") === "true") {
      this.isLoggedIn = true;
      this.userId = parseInt(localStorage.getItem("userId"));
      this.getUserResponse(this.userId, this.eventId);
    }
  }

  getEvent(id: number) {
    this.store.select(store => store.events.entities ? store.events.entities[`${id}`] : null).subscribe(event => {
      if (event) {
        this.event = event;
        this.checkIfMaximumCapacityIsReached();
        let fullAddress = this.returnFullAddress(this.event.address, this.event.city);
        this.store.dispatch(new LoadMap(fullAddress));
        this.getCoordinates();
      }
    })
  }

  checkIfMaximumCapacityIsReached() {
    if (this.event.maxCapacity === this.event.numberOfPeopleComing) {
      this.isNumberOfPeopleMax = true;
    }
    else {
      this.isNumberOfPeopleMax = false;
    }
  }

  getUserResponse(userId: number, eventId: number) {
    this.store.select(selectAllResponses).pipe(
      flatMap(response => response),
      filter(response => response.userId === this.userId && response.eventId===this.eventId)
    ).subscribe(res => {
      this.userResponse = res;
    });
  }

  getCoordinates() {
    this.store.select(store => store.map.entities ? store.map.entities : null).subscribe(res => {
      if (res['undefined']) {
        this.latitude = (res['undefined'] as any).lat;
        this.longitude = (res['undefined'] as any).lon;
      }
    })
  }

  returnFullAddress(address: string, city: string): string {
    address = address.replace(/ /g, "%20");
    city = city.replace(/ /g, "%20");
    return `${address}+${city}`;
  }

  registerCommingEvent() {
    this.userResponse = this.returnNewResponse();
    this.store.dispatch(new AddResponse(this.userResponse));
    this.incrementNumberOfPeopleComming();
    this.updateEvent(this.event);
  }

  returnNewResponse() {
    let newResponse = new UserHasEvent();
    newResponse.setAttributes(this.eventId, this.userId, true);
    return newResponse;
  }

  incrementNumberOfPeopleComming() {
    this.event.numberOfPeopleComing += 1;
  }

  updateEvent(event: EventModel) {
    this.checkIfMaximumCapacityIsReached();
    this.store.dispatch(new UpdateEvent(event));
  }

  unregisterCommingEvent() {
    this.store.dispatch(new DeleteResponse(this.userResponse.id));
    this.userResponse = null;
    this.decrementNumberOfPeopleComming();
    this.updateEvent(this.event);
  }

  decrementNumberOfPeopleComming() {
    this.event.numberOfPeopleComing -= 1;
  }

  returnFormatedDate() {
    return returnFormatedDate(this.event.date);
  }

}
