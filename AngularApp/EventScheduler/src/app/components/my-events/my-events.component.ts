import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/EventModel';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/root.reducer';
import { LoadUserEvents, RemoveAllUserEvents } from 'src/app/store/actions/user-events.action';
import { selectAllUserEvents } from 'src/app/store/reducers/user-events.reducer';
import { Observable } from 'rxjs';
import { UserHasEvent } from 'src/app/models/UserHasEvent';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  eventList: EventModel[]=null;
  finished:boolean=false;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.eventList=null;
    let userId = parseInt(localStorage.getItem("userId"));
    this.store.dispatch(new LoadUserEvents(userId));
    this.getEventList();
  }

  getEventList() {
    this.store.select(selectAllUserEvents).subscribe(list=>{
      this.eventList=[];
      list.forEach((element:UserHasEvent)=>this.eventList.push(element.event));
    });
  }
}
