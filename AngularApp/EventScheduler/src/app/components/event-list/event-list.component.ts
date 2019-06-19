import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event-service/event.service';
import { EventModel } from 'src/app/models/EventModel';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsState, selectAllEvents, selectTotalEvents } from 'src/app/store/reducers/event.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { flatMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  eventList: EventModel[] = [];
  private searchValue: string;

  constructor(private activeRoute: ActivatedRoute, private store: Store<EventsState>, private router: Router) { }

  ngOnInit() {
    this.getEvents();
  }

  onEventClick(event: EventModel) {
    this.router.navigate(["/events", event.id]);
  }

  getEvents() {
    this.activeRoute.params.subscribe(routeParams => {
      this.searchValue = routeParams.search_value;
      if (!this.searchValue) {
        this.store.select(selectAllEvents).subscribe(list => this.eventList = list);
      }
      else {
        this.store.select(selectAllEvents).pipe(
          flatMap(event => event),
          filter((event: EventModel) => (event.description.includes(this.searchValue)
            || event.headline.includes(this.searchValue)
            || event.city.includes(this.searchValue)
            || event.address.includes(this.searchValue)))
        ).subscribe((event:EventModel)=>this.eventList.push(event));
      }
    });
  }

}
