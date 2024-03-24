import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Car } from '../model/car';
export { Car } from '../model/car';

@Injectable({
  providedIn: 'root'
})

export class VehicleService {
  private baseApiUrl = 'http://localhost:8090/vehicle';
  private locationSource = new BehaviorSubject<string>(''); // For storing the selected location
  currentLocation = this.locationSource.asObservable();
  constructor(private httpClient:HttpClient){}
  
  getAllVehicles:Observable<any> = this.httpClient.get("http://localhost:8090/vehicle");

  changeLocation(location: string) {
    this.locationSource.next(location);
  }
  
  getAllVehiclesByLocation(location: string): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${this.baseApiUrl}/${location}`);
    
  }
  getAllAvailabeVehicles:Observable<any> = this.httpClient.get("http://localhost:8090/availableVehicles");
addVehicle(newCar:Car):Observable<any>{return this.httpClient.post("http://localhost:8090/vehicle",newCar);}
deleteVechicleById(id?:number):Observable<any>{return this.httpClient.delete("http://localhost:8090/vehicle/"+id)};
updateVehicle(car:Car):Observable<any>{return this.httpClient.put("http://localhost:8090/vehicle", car);}
getAllBookedVehicles:Observable<any>= this.httpClient.get("http://localhost:8090/vehicle/booked");
getUnReturnedVehicles:Observable<any> = this.httpClient.get("http://localhost:8090/unreturnedVehicles/")
}