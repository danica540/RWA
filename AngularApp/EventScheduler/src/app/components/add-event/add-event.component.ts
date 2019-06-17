import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event-service/event.service';
import { Observable } from 'rxjs';
import { EventModel } from 'src/app/models/EventModel';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  ifAddressIsFilled: boolean = false;
  ifCityIsFilled: boolean = false;
  cities: Observable<any>;
  fileToUpload: File;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.cities = this.eventService.getEventLocations();
  }

  onAddEvent() {
    let headlineValue = (document.getElementById("headline") as HTMLInputElement).value;
    let descriptionValue = (document.getElementById("description") as HTMLTextAreaElement).value;
    let cityValue = (document.getElementById("city") as HTMLSelectElement).value;
    let addressValue = (document.getElementById("event-address") as HTMLInputElement).value;
    let timeValue = (document.getElementById("event-time") as HTMLInputElement).value;
    let capacityValue = (document.getElementById("event-capacity") as HTMLInputElement).value;
    let dateValue = (document.getElementById("event-date") as HTMLInputElement).value;

    let formData = new FormData();
    formData.append('photo', this.fileToUpload, this.fileToUpload.name);


    let imgPath = `../assets/img/${this.fileToUpload.name}`;

    let newEvent = new EventModel();
    newEvent.setAttributes(headlineValue, descriptionValue, addressValue, dateValue, cityValue, parseInt(capacityValue), imgPath, timeValue);
    console.log(newEvent);
    this.eventService.addEventPhoto(formData).subscribe(er => console.log(er));
    this.eventService.addEvent(newEvent).subscribe(er => console.log(er));

  }

  handleFileInput(file: FileList) {
    console.log(file);
    this.fileToUpload = file[0];
  }

}
