import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../services/vehicle.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule,
    FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  bookings: any[] = [];

  constructor(private bookingService: BookingService,private vehicleService:VehicleService,private customerService:CustomerService) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe(data => {
      this.bookings = data;
     
    });
  }



}
