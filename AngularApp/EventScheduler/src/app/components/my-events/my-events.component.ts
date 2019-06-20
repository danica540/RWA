import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/EventModel';
import { selectAllUserEvents } from 'src/app/store/reducers/user-events.reducer';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/root.reducer';
import { UserHasEvent } from 'src/app/models/UserHasEvent';
import { LoadUserEvents } from 'src/app/store/actions/user-events.action';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  eventList: EventModel[] = [];

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new LoadUserEvents(parseInt(localStorage.getItem("userId"))));
    this.store.select(store => store.userEvents.entities).subscribe(list => {
      for (var key in list) {
        this.eventList.push(list[key].event);
      }
    });
  }

}
