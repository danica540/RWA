import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './store/reducers/root.reducer';
import { LoadEvents } from './store/events/event.action';
import { LoadLocations } from './store/location/location.action';
import { LoadUsers } from './store/user/user.action';
import { LoadResponse } from './store/user-event-response/user-event-response.action';
import { LoadUserEvents } from './store/user-events/user-events.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EventScheduler';

  constructor(private store:Store<State>){

  }

  ngOnInit(){
    this.store.dispatch(new LoadEvents());
    this.store.dispatch(new LoadLocations());
    this.store.dispatch(new LoadUsers());
    this.store.dispatch(new LoadResponse());
    
  }
}
