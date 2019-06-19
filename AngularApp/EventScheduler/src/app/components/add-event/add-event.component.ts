import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event-service/event.service';
import { Observable } from 'rxjs';
import { EventModel } from 'src/app/models/EventModel';
import { returnFormatedDate } from 'src/app/functions/formatingFunctions';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

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

    let imgPath = `../assets/img/${this.fileToUpload.name}`;
    let formData = new FormData();
    formData.append('photo', this.fileToUpload, this.fileToUpload.name);

    let newEvent:EventModel=this.returnNewEvent(headlineValue, descriptionValue, addressValue, dateValue, cityValue, capacityValue, imgPath, timeValue);

    this.eventService.addEvent(newEvent).subscribe(er => console.log(er));
    this.eventService.addEventPhoto(formData).subscribe(er => {
      console.log(er);
    });

  }

  returnNewEvent(headlineValue: string, descriptionValue: string, addressValue: string, dateValue: string, cityValue: string, capacityValue: string, imgPath: string, timeValue: string): EventModel {
    let newEvent = new EventModel();
    newEvent.id = parseInt((Math.random() * 7 * 13 * 17).toString());
    newEvent.headline = headlineValue;
    newEvent.description = descriptionValue;
    newEvent.address = addressValue;
    newEvent.date = dateValue;
    newEvent.city = cityValue;
    newEvent.maxCapacity = parseInt(capacityValue);
    newEvent.img = imgPath;
    newEvent.time = timeValue;
    return newEvent;
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file[0];
  }

}
