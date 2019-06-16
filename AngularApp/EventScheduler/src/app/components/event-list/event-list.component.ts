import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event-service/event.service';
import { EventModel } from 'src/app/models/EventModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  eventList: EventModel[] = [];

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(list => this.eventList = list);
  }

  onEventClick(event: EventModel) {
    this.router.navigate(["/events", event.id]);
  }

}
