import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './store/reducers/root.reducer';
import { LoadEvents } from './store/actions/event.action';
import { LoadLocations } from './store/actions/location.action';
import { LoadUsers } from './store/actions/user.action';
import { LoadResponse } from './store/actions/user-event-response.action';
import { LoadUserEvents } from './store/actions/user-events.action';

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
