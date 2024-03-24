import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Car, VehicleService } from '../../services/vehicle.service';
import { CarDetailsDialogComponent } from '../car-details-dialog/car-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BookingService } from '../../services/booking.service';
import { map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-un-returned-cars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './un-returned-cars.component.html',
  styleUrl: './un-returned-cars.component.css'
})
export class UnReturnedCarsComponent {
  unreturnedBookings:any=[];
  bookings:any=[];
  constructor(private vehicleService:VehicleService,private dialog :MatDialog,private bookingService:BookingService){
    
    
    this.vehicleService.getUnReturnedVehicles.subscribe({
      next:(data:any)=>{
        this.unreturnedBookings=data;
      }

    })
   
  }
  // findBookingByVehicleId(vehicleId: number) { 
  //   // this.bookings=this.bookingService.findBookedVehicleByVehicleId(vehicleId).subscribe({
  //   //   next: (data: any) => {
  //   //     this.bookings = data;
  //   //   },
  //   //   error: (err) =>console.log(err)
      
  //   // // });
  //   // return this.bookings;
  //   return this.bookingService.findBookedVehicleByVehicleId(vehicleId).pipe(
  //     map(bookings => bookings[0]) // Correctly use map here
  //   );

  // }
  
  findBookingByVehicleId(vehicleId: number) {
    return this.bookingService.findBookedVehicleByVehicleId(vehicleId).pipe(
      tap(data => console.log('Booking data received:', data)), // Log the data for debugging
      map(bookings => bookings[0])
    );
  }
  openDetailsDialog(car: Car): void {
    console.log(car);
    
    this.dialog.open(CarDetailsDialogComponent, {
      width: '400px',
      data: car // Pass the car data to the dialog
    });
  }


}
