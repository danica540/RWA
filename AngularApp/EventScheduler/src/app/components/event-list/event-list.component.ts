import { Component, OnInit, Input } from '@angular/core';
import { EventModel } from 'src/app/models/EventModel';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsState, selectAllEvents } from 'src/app/store/reducers/event.reducer';
import { Store } from '@ngrx/store';
import { flatMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  @Input() inputEvents:EventModel[];

  eventList: EventModel[] = [];
  private searchValue: string;

  constructor(private activeRoute: ActivatedRoute, private store: Store<EventsState>, private router: Router) { }

  ngOnInit() {
    if(!this.inputEvents){
      this.getEvents();
    }
    else{
      (document.getElementById('header') as HTMLHeadingElement).innerHTML="YOUR EVENTS";
      this.eventList=this.inputEvents;
    }
    
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
        this.eventList=[];
        this.store.select(selectAllEvents).pipe(
          flatMap(event => event),
          filter((event: EventModel) => (event.description.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())
            || event.headline.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())
            || event.city.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())
            || event.address.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())))
        ).subscribe((event:EventModel)=>this.eventList.push(event));
      }
    });
  }

}
