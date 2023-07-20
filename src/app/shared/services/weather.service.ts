import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get("https://api.openweathermap.org/data/2.5/onecall?lat=46.673595&lon=21.087730&exclude=minutely,hourly&appid=bc006ae7b600a53c514a0d4e91e4442c&units=metric");
  }
}
