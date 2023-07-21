import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  baseURL: string = "https://api.openweathermap.org/data/2.5/onecall";
  lat: number = 47.497913;
  lon: number = 19.040236;

  constructor(private http: HttpClient) { }

  get(): Observable<any> {

    /*navigator.geolocation.getCurrentPosition(resp => {
      console.log(resp);
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;

      console.log(`${this.lat} ${this.lon}`);
    return this.http.get(`${this.baseURL}?lat=${this.lat}&lon=${this.lon}` + 
      "&exclude=minutely,hourly&appid=bc006ae7b600a53c514a0d4e91e4442c&units=metric");
    });*/

    return this.http.get(`${this.baseURL}?lat=${this.lat}&lon=${this.lon}` + 
      "&exclude=minutely,hourly&appid=bc006ae7b600a53c514a0d4e91e4442c&units=metric");
  }
}
