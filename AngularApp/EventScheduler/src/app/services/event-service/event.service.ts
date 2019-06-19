import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventModel } from 'src/app/models/EventModel';
import { environmentVariables } from "src/app/constants/url-constant";

const API_URL = environmentVariables.JSON_API_URL;
const PHOTO_UPLOAD_API_URL = environmentVariables.IMAGE_API_URL;

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`${API_URL}/events?_sort=date&_order=asc`);
  }

  getEventById(id: number): Observable<EventModel> {
    return this.http.get<EventModel>(`${API_URL}/events/${id}`);
  }

  getEventLocations(): Observable<any> {
    return this.http.get<any>(`${API_URL}/cities?_sort=name&_order=asc`);
  }

  addEventPhoto(photo: FormData) {
    return this.http.post(`${PHOTO_UPLOAD_API_URL}/api/users`, photo);
  }

  addEvent(newEvent: EventModel) {
    return this.http.post(`${API_URL}/events`, newEvent)
  }

  getEventsBySearchValue(searchValue: string): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`${API_URL}/events?_sort=date&_order=asc&q=${searchValue}`);
  }

  updateEvent(newEvent: EventModel) {
    return this.http.put(`${API_URL}/events/${newEvent.id}`, newEvent);
  }

}
