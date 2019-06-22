import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { MyEventsComponent } from './components/my-events/my-events.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/events', pathMatch: 'full'
  },
  {
    path: "myEvents",
    component: MyEventsComponent
  },
  {
    path: 'events/search/:search_value',
    component: EventListComponent,
    pathMatch: 'full'
  },
  {
    path: "events",
    component: EventListComponent,
    pathMatch: 'full'
  },
  {
    path: "events/:eventId",
    component: EventDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: "addEvent",
    component: AddEventComponent
  },
  {
    path: "signUp",
    component: SignUpComponent
  },
  {
    path: "signIn",
    component: LogInComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
