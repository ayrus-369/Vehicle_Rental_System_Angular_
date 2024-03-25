import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { BookInputDto } from '../../model/book-input-dto';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../services/customer.service';
import { BookedDetailsService } from '../../services/booked-details.service';

@Component({
  selector: 'app-book-vehicle',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './book-vehicle.component.html',
  styleUrls: ['./book-vehicle.component.css'] // Corrected property name and made it an array
})
export class BookVehicleComponent implements OnInit {
  bookInputDto: BookInputDto = new BookInputDto(); // Initialize it here
  id: string | null = "";
  carId: string | null = "";
  customer: Customer = new Customer();
  message: string = "";
  errorMessage: string = "";
  
  constructor(private activatedRoute: ActivatedRoute, private bookingService: BookingService,private router:Router,private customerService:CustomerService,private bookedDetails:BookedDetailsService) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("User:" + this.id);
    this.carId = this.activatedRoute.snapshot.paramMap.get('carId'); // Corrected to this.carId
    console.log("Vehicle:" + this.carId);
    this.customerService.getCustomerById(Number(this.id || '0')).subscribe({
     
      next:(data)=>{
        this.customer= data;
        console.log(data);
        this.bookInputDto.customerEmailId=this.customer.email;
      },
      error:(err)=>{
        console.log(err);
        
      }
      
    })
    
  }


  formatDateToISO(dateInput: Date | string): string {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  
  

  bookNow(orderForm: NgForm) {
    console.log(orderForm.value.pickupDate); // Check the value
    console.log(orderForm.value.dropDate);
    

    let id: number = Number(this.id || '0');
    let carId: number = Number(this.carId || '0');

    this.bookInputDto.customerId = id;
    this.bookInputDto.customerEmailId=orderForm.value.customerEmailId;
    this.bookInputDto.vehicleId = carId; 
    if (orderForm.value.pickupDate) {
      this.bookInputDto.pickupDate = this.formatDateToISO(orderForm.value.pickupDate);
    }
  
    if (orderForm.value.dropDate) {
      this.bookInputDto.dropDate = this.formatDateToISO(orderForm.value.dropDate);
    }
    this.bookInputDto.dropLocation=orderForm.value.dropLocation;
  
    console.log(this.bookInputDto);
   this.bookedDetails.setBookedDetails(this.bookInputDto);
    this.router.navigateByUrl("payment/" +this.id+'/'+this.carId);
  }
}
        