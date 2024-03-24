import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookInputDto } from '../model/book-input-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  findBookedVehicleByVehicleId(vehicleId: number):Observable<any> {
 return this.http.get("http:localhost:4200/booking/vehicle/"+vehicleId);
  }

  constructor(private http:HttpClient) { }
  newBooking(bookInputDto:BookInputDto):Observable<any>{
    return this.http.post("http://localhost:8090/booking/vehicle",bookInputDto);
  }
  getBookings():Observable<any>{
    return this.http.get("http://localhost:8090/booking");
  }

}