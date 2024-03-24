import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { BookInputDto } from '../../model/book-input-dto';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../services/customer.service';

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
  
  constructor(private activatedRoute: ActivatedRoute, private bookingService: BookingService,private router:Router,private customerService:CustomerService) {}

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

  // formatDateToISO(date: Date): string { // Moved inside the class
  //   return date.toISOString().split('T')[0];
  // }
  // formatDateToISO(date: Date | string): string {
  //   if (!date) {
  //     return ''; // or handle as you see fit, maybe return undefined or null
  //   }
  //   const dateObj = typeof date === 'string' ? new Date(date) : date;
  //   // Check if the dateObj is an Invalid Date
  //   if (isNaN(dateObj.getTime())) {
  //     console.error('Invalid date:', date);
  //     return ''; // Handle the invalid date as needed
  //   }
  //   return dateObj.toISOString().split('T')[0];
  // }
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
    // if (orderForm.value.pickupDate) {
    //   this.bookInputDto.pickupDate = this.formatDateToISO(orderForm.value.pickupDate);
    // }

    // if (orderForm.value.dropDate) {
    //   this.bookInputDto.dropDate = this.formatDateToISO(orderForm.value.dropDate);
    // }
    // if (orderForm.value.pickupDate) {
    //   // Assuming orderForm.value.pickupDate is a Date object
    //   this.bookInputDto.pickupDate = new Date(orderForm.value.pickupDate);
    // }
  
    // if (orderForm.value.dropDate) {
    //   // Assuming orderForm.value.dropDate is a Date object
    //   this.bookInputDto.dropDate = new Date(orderForm.value.dropDate);
    // }
   

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
  
    // this.bookInputDto.dropDate=orderForm.value.dropDate;
    // this.bookInputDto.pickupDate=orderForm.value.pickupDate;
    // Corrected the typo here as well
    console.log(this.bookInputDto);
    this.bookingService.newBooking(this.bookInputDto).subscribe({
      next: (data) => {
        console.log(data);
        
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.message;
      }
    });
    this.router.navigateByUrl("payment/" +this.id+'/'+this.carId);
  }
}
        //this.customerId = customerId;
        //  this.customerEmailId = customerEmailId;
        //  this.vehileId = vehileId;
        //  this.pickupDate = pickupDate;
        //  this.dropDate = dropDate;
        //  this.dropLocation = dropLocation;


// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import { BookInputDto } from '../../model/book-input-dto';
// import { ActivatedRoute } from '@angular/router';
// import { BookingService } from '../../services/booking.service';
// import { Customer } from '../../model/customer';


// @Component({
//   selector: 'app-book-vehicle',
//   standalone: true,
//   imports: [FormsModule,CommonModule],
//   templateUrl: './book-vehicle.component.html',
//   styleUrl: './book-vehicle.component.css'
// })
// function formatDateToISO(date: Date): string {
//   return date.toISOString().split('T')[0];
// }
// export class BookVehicleComponent 
// {
//   bookInputDto:BookInputDto=new BookInputDto;
//   id:string | null = "";
//   carId:string | null = "";
//   customer:Customer = new Customer();
//   message:string="";
//   errorMessage:string="";
  
  
//   constructor(private activatedRoute: ActivatedRoute,private bookingService:BookingService,private bookingInputDto:BookInputDto)
//     {
    
//     }
  
//     ngOnInit() {
//       // Access snapshot here
//       this.id = this.activatedRoute.snapshot.paramMap.get('id');
//       console.log("User:"+this.id);
//       this.id = this.activatedRoute.snapshot.paramMap.get('carId');
//       console.log("Vehicle:"+this.carId);
//     }
//   bookNow(orderform:NgForm)
//   {
    
// // this.bookingInputDto.pickupDate = this.bookingInputDto.pickupDate ? formatDateToISO(this.bookInputDto.pickupDate) : undefined;
// // this.bookingInputDto.dropDate = this.bookingInputDto.dropDate ? formatDateToISO(this.bookInputDto.dropDate) : undefined;
// // let numericValue: number = Number(this.id || '0');
// //     this.bookInputDto.customerId = '12345'; // Set this to the actual customer ID you need to use
// // this.bookInputDto.customerEmailId = 'customer@example.com'; // Set the customer email

// // // If 'pickupLocation' is not bound via [(ngModel)], set it manually as well
// // this.bookInputDto.pickupLocation = orderForm.value.pickupLocation;
//       let  id: number = Number(this.id || '0');
//       let carId:number=Number(this.carId|| '0');
// // Assuming this.pickupDate and this.dropDate are JavaScript Date objects
// // If they're already in 'YYYY-MM-DD' string format, you can assign them directly

// if (orderform.value.pickupDate) {
//   this.bookingInputDto.pickupDate = formatDateToISO(orderform.value.pickupDate);
// }

// if (orderform.value.dropDate) {
//   this.bookingInputDto.dropDate = formatDateToISO(orderform.value.dropDate);
// }

//       // this.customer=this.orderform.
//       this.bookingInputDto.customerId=id;
//       this.bookingInputDto.vehiclleId=carId;
//       // this.bookInputDto.customerEmailId=orderform.value.customerEmailId;
//       // this.bookingInputDto.dropLocation=orderform.value.dropLocation;
//       this.bookingInputDto.pickupDate=orderform.value.pickupDate;
//       this.bookingInputDto.dropDate=orderform.value.dropDate;
//       this.bookingService.newBooking(this.bookInputDto).subscribe(
//         {
//           next: (data) => {
//             console.log(data);
  
//           },
//           error: (err) => {
//             console.log(err);
//             this.errorMessage = err.message;
//             // this.customer=undefined;
//           }
//         })
      
//     }
//   }  

