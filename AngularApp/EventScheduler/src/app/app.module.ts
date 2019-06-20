import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";

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
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { MyEventsComponent } from './components/my-events/my-events.component';
import { rootReducer } from './store/reducers/root.reducer';
import { UserEventResponseEffects } from './store/effects/user-event-response.effects';
import { EventEffects } from './store/effects/event.effects';
import { MapEffects } from './store/effects/map.effects';
import { LocationEffects } from './store/effects/location.effects';
import { UserEventsEffects } from './store/effects/user-events.effects';

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
    EventDetailsComponent,
    MyEventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([UserEventResponseEffects, EventEffects, MapEffects,LocationEffects,UserEventsEffects]),
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 20
    })
  ],
  providers: [MapServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
