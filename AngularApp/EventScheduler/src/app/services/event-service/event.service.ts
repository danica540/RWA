import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventModel } from 'src/app/models/EventModel';
import { environmentVariables } from "src/app/constants/url-constant";

const API_URL = environmentVariables.JSON_API_URL;

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }

  getEvents():Observable<EventModel[]>{
    return this.http.get<EventModel[]>(`${API_URL}/events`);
  }

  getEventById(id:number):Observable<EventModel>{
    return this.http.get<EventModel>(`${API_URL}/events/${id}`);
  }

}
