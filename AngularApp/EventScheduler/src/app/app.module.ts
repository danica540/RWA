import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { MapServiceService } from './services/map-service/map-service.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventComponent } from './components/event/event.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavbarComponent,
    EventComponent,
    LogInComponent,
    SignUpComponent,
    AddEventComponent,
    EventListComponent,
    CommentComponent,
    CommentListComponent,
    EventDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MapServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
