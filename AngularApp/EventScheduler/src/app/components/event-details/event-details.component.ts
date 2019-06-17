import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventModel } from 'src/app/models/EventModel';
import { EventService } from 'src/app/services/event-service/event.service';
import { MapServiceService } from 'src/app/services/map-service/map-service.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  eventId: number;
  event: EventModel;
  latitude: number;
  longitude: number;
  isLoggedIn:boolean;
  userId:number;

  constructor(private router: Router, private route: ActivatedRoute, private mapService: MapServiceService, private eventService: EventService) { }

  ngOnInit() {
    if (localStorage.getItem("isLoggedIn") === "true") {
      this.isLoggedIn = true;
      this.userId=parseInt(localStorage.getItem("userId"));
    }
    this.eventId = parseInt(this.route.snapshot.paramMap.get("eventId"));
    this.eventService.getEventById(this.eventId).subscribe(event => {
      this.event = event;
      this.getCoordinates(this.event.address, this.event.city);
    });

  }

  getCoordinates(address: string, city: string) {
    address=address.replace(/ /g,"%20");
    city=city.replace(/ /g,"%20");
    let fullAddress=`${address}+${city}`;
    console.log(fullAddress);
    this.mapService.getAddressLatLong(fullAddress).subscribe(rez => {
      console.log(rez);
      this.latitude = (rez[0] as any).lat;
      this.longitude = (rez[0] as any).lon;
    });
  }

}
