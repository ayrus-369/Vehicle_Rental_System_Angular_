import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { Payment } from '../../model/payment';
import { Observable } from 'rxjs';
import { PaymentOutputDto } from '../../model/payment-output-dto';
import { AuthService } from '../../services/auth.service';
import { Customer } from '../../model/customer';
import { BookingService } from '../../services/booking.service';
import { BookingOutputDto } from '../../model/booking-output-dto';
import { BookedDetailsService } from '../../services/booked-details.service';
import { BookInputDto } from '../../model/book-input-dto';
import { Car, VehicleService } from '../../services/vehicle.service';
import { CarDetailsDialogComponent } from '../car-details-dialog/car-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDetailsService } from '../../services/payment-details.service';



declare var Razorpay:any;
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent  {
  paymnetInputDto:Payment=new Payment();
   dropDate:Date=new Date();
 pickupDate:Date=new Date();
  orderId:string='';
  id:string|null="";
  diffInDays:number=0;
  // numberOfDays?:number;
  pickupDateStr:any
  ;
  dropDateStr:any;
  
  car:any;
  carId:string|null="";
  vehicleId?:number | undefined;
  payments: PaymentOutputDto[] = [];
  customer:Customer=new Customer();
  bookInputDto:BookInputDto=new BookInputDto();

  constructor(private router:Router,private activatedRoute:ActivatedRoute,private paymentService:PaymentService,private paymentDetails:PaymentDetailsService,private bookedDetails:BookedDetailsService,private vehicleService:VehicleService,private bookingService:BookingService,private dialog:MatDialog){
   this.bookInputDto= this.bookedDetails.getBookedDetails();
this.vehicleId=this.bookInputDto.vehicleId;
console.log(this.vehicleId);

this.vehicleService.getVehicleById(this.vehicleId).subscribe(
  {
next:(data:any)=>{
  this.car=data;
  
},
error:(err:any)=>{
  console.log(err);
}
  }
)

    
  }
  openDetailsDialog(car: Car): void {
    console.log(car);
    
    this.dialog.open(CarDetailsDialogComponent, {
      width: '400px',
      data: car // Pass the car data to the dialog
    });
  }
 
  // ngOnInit() :void{
  //   this.id = this.activatedRoute.snapshot.paramMap.get('id');
  //   console.log("User:" + this.id);
  //   this.carId = this.activatedRoute.snapshot.paramMap.get('carId'); // Corrected to this.carId
  //   console.log("Vehicle:" + this.carId);
    
  //   this.Payment();
  // }
  //connect api 
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }
  Payment(){
   // Assuming dropDate and pickupDate are Date objects

// this.dropDate= new Date(this.bookedDetails.getBookedDetails().dropDate);
// this.pickupDate = new Date(this.bookedDetails.getBookedDetails().pickupDate);
// class YourClass {
  // Example dates in string format

  this.pickupDateStr=this.bookInputDto.pickupDate;
  this.dropDateStr=this.bookInputDto.dropDate;
    // Convert string dates to Date objects
    const pickupDate: Date = new Date(this.pickupDateStr);
    const dropDate: Date = new Date(this.dropDateStr);
    const today: Date = new Date(new Date().toDateString()); // Removes time part, keeping only the date for comparison

    // Check if both dates are >= today
    if (pickupDate >= today && dropDate >= today) {
      console.log("Both dates are greater than or equal to today's date.");
      
      // Check if drop date is later than pickup date
      if (dropDate > pickupDate) {
        console.log("Drop date is later than pickup date.");

        // Calculate the number of days between the dates
        const diffInMilliseconds: number = dropDate.getTime() - pickupDate.getTime();
        this.diffInDays = diffInMilliseconds / (1000 * 3600 * 24);

        console.log(`Number of days between pickup and drop date: ${this.diffInDays} days.`);
      } else {
        console.error("Drop date must be later than pickup date.");
      }
    } else {
      console.error("Both dates must be greater than or equal to today's date.");
    }
  


console.log(`Pickup Date: ${pickupDate.toISOString()}, Drop Date: ${dropDate.toISOString()},`);


// Calculate the difference in milliseconds
const differenceInMilliseconds: number = this.dropDate.getTime() - this.pickupDate.getTime();

// Convert milliseconds to days
const differenceInDays: number = differenceInMilliseconds / (1000 * 3600 * 24);

// If you need an integer number of days, you can round the result
const numberOfDays: number = Math.ceil(differenceInDays) ;
console.log(numberOfDays);
console.log(this.car.rentPerHour);
    this.paymnetInputDto.amount=(this.car.rentPerHour *24)*(this.diffInDays+1);
    this.paymnetInputDto.vehicleId=this.bookedDetails.getBookedDetails().vehicleId;
    this.paymnetInputDto.customerEmailId=this.bookedDetails.getBookedDetails().customerEmailId;
    this.paymnetInputDto.customerId=this.bookedDetails.getBookedDetails().customerId;

    console.log(this.paymnetInputDto);
    this.paymentService.createTransaction(this.paymnetInputDto).subscribe({
      next:(response:any)=>{
        console.log(response);
        this.orderId=response.orderId;
        this.openTransactionalModel(response);
        // this.message="Account added Successfully!....";
        },
     
        error:(err: any)=>{
        
        console.log(err);
        // this.message="Error Accured While Adding Account"
        // this.errorMessage=err.error
        },
        complete:()=>{
        console.log("Server completed sending data");
        }
      })
  }
 
 

  openTransactionalModel(response:any)
  {
    var options = {
      order_id:response.order_id,
      key:'rzp_test_TfpzfgmJsWW9Kg',
      amount:response.amount,
      currency:response.currency,
      name:'Payment',
      description:'Using Razor Payment',
      image:'homepage.jpg',
      handler:(response:any)=>{
        this.processResponse(response);
        console.log(this.orderId);
        
        this.paymentService.updatePaymentStatus(this.orderId).subscribe({
          next:(data:any)=>{
            console.log(data);
            
          },
          error:(error)=>{
            console.log(error);}

            
        })

      },
      prefill :{
        name:'JOHN DOE',
        email:'John2204@gmail.com',
        Contact:'9876556726'
      },
      notes:{
        address:'Car Rental Service'
      },
      theme:{
        color:'#31d2f2'
      }

    };
    var razorPayObject=new Razorpay(options);
    razorPayObject.open()
  }
  
  processResponse(resp:any){
    console.log(resp);
    this.bookingService.newBooking(this.bookInputDto).subscribe({
      next: (data) => {
        console.log(data);
        
      },
      error: (err) => {
        console.log(err);
       
      }
    });
  
    alert('Payment success');
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/display-bookings/'+ sessionStorage.getItem('id')]);});


  }

}

