import { Injectable } from '@angular/core';
import { environmentVariables } from 'src/app/constants/url-constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/UserModel';
import { UserHasEvent } from 'src/app/models/UserHasEvent';


const API_URL = environmentVariables.JSON_API_URL;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  checkIfEmailIsAvailable(email: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${API_URL}/users?email=${email}`);
  }

  checkIfUsernameIsAvailable(username: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${API_URL}/users?username=${username}`);
  }

  registerUser(newUser: UserModel) {
    return this.http.post(`${API_URL}/users`, newUser);
  }

  getUserByUsername(username: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${API_URL}/users?username=${username}`);
  }

  getEventsThatUserIsInteresstedIn(userId: number, eventId: number): Observable<UserHasEvent> {
    return this.http.get<UserHasEvent>(`${API_URL}/eventsInteresstedIn?userId=${userId}&eventId=${eventId}`)
  }

  addEventThatUserIsInteresstedIn(newUserResponse: UserHasEvent) {
    return this.http.post(`${API_URL}/eventsInteresstedIn`, newUserResponse);
  }

  deleteEventThatUserIsInteresstedIn(responseId: number) {
    return this.http.delete(`${API_URL}/eventsInteresstedIn/${responseId}`);
  }

  getResponses(): Observable<UserHasEvent[]> {
    return this.http.get<UserHasEvent[]>(`${API_URL}/eventsInteresstedIn`);
  }

}
