import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmentVariables } from 'src/app/constants/url-constant';


const API_URL = environmentVariables.MAP_API_URL;

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {

  constructor(private http: HttpClient) { }

  getAddressLatLong(address) {
    return this.http.get(`${API_URL}/search?q=${address}&format=json`);
  }
}
