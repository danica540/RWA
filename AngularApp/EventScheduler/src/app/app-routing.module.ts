import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"events",
    component:EventListComponent
  },
  {
    path:"addEvent",
    component:AddEventComponent
  },
  {
    path:"signUp",
    component:SignUpComponent
  },
  {
    path:"signIn",
    component:LogInComponent
  },
  {
    path:"events/:eventId",
    component:EventDetailsComponent
  }
  // ,
  // {
  //   path:"home",
  //   component:EventListComponent
  // },
  // {
  //   path:"home",
  //   component:EventListComponent
  // },
  // {
  //   path:"home",
  //   component:EventListComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
