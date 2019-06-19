import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event-service/event.service';
import { EventModel } from 'src/app/models/EventModel';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  eventList: EventModel[] = [];
  private searchValue: string;

  constructor(private activeRoute: ActivatedRoute, private eventService: EventService, private router: Router) { }

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
        this.eventService.getEvents().subscribe(data => {
            this.eventList = data;
          });
      }
      else {
        this.eventService.getEventsBySearchValue(this.searchValue).subscribe(data => {
            if (!data[0]) {
              this.eventList = null;
            }
            else {
              this.eventList = data;
            }
          });
      }
    });
  }

}
