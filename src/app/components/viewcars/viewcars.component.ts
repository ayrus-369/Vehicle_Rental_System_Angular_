import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Car } from '../../model/car';
// import { ButtonModule } from 'primeng/button';
// import { CardModule } from 'primeng/card';
import { VehicleService } from '../../services/vehicle.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs'; // Import the Observable type from rxjs
import { SearchCarPipe } from '../../pipes/search-car.pipe';
import { ViewDetailsComponent } from '../../view-details/view-details.component';


@Component({
  selector: 'app-viewcars',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule,MatSnackBarModule,MatDialogModule,HttpClientModule,SearchCarPipe],
  templateUrl: './viewcars.component.html',
  styleUrl: './viewcars.component.css'
})

export class ViewcarsComponent implements OnInit{
  searchTerm:string="";
  message:string="";
  errorMessage:string="";
  cars:Car[]=[]
  duration:number=4000;

  constructor(private dialog: MatDialog, private router:Router, private vehicleService:VehicleService, private _snackBar: MatSnackBar){}
  openSnackBar(msg: string, time: any) {
    this._snackBar.open(msg,"OK",{
      horizontalPosition: 'center',
      verticalPosition:"bottom",
      duration: time,
      panelClass: ['custom-snackbar']
    });
  }
  ngOnInit(): void {
    // Initially fetch all vehicles
    this.fetchAllVehicles();
  
    // Subscribe to location changes
    this.vehicleService.currentLocation.subscribe(location => {
      if (location) {
        // Fetch vehicles for the provided location
        this.vehicleService.getAllVehiclesByLocation(location).subscribe({
          next: (data: Car[]) => {
            this.cars = data; // Update cars with those from the specified location
          },
          error: (err) => this.handleErrors(err)
        });
      }
      // If no location is provided, it keeps the initial list of all vehicles
    });
  }
  
  private fetchAllVehicles(): void {
    this.vehicleService.getAllVehicles.subscribe((data: Car[]) => { // Specify the type of data returned by getAllVehicles
      this.cars = data; // Initially set cars to all vehicles
    },
    (err: any) => this.handleErrors(err));
  }
  
  private handleErrors(err: any): void {
    if(err.error === "No Vehicles exist!") {
      this.openSnackBar("No Vehicles Founded !!", this.duration);
    } else {
      this.openSnackBar("We apologize, there is an internal error. Please try again later !", this.duration);
    }
  }
  
  // ngOnInit(): void {
  //   this.vehicleService.getAllVehicles.subscribe(
  //     {
  //       next:(data: any)=>{

  //         this.cars=data;
            
  //         },
  //         error:(err: any)=>{
  //           if(err.error=="No Vehicles exist!")
  //          this.openSnackBar("No Vehicles Founded !!",this.duration);
  //         else 
  //         this.openSnackBar("We apologize, there is an internal error. Please try again later !",this.duration);

  //         },
  //         complete:()=>{
  //           console.log("Server completed sending data.");
            
  //         } 
  //       } 
  //   )
  // }
  openDetailsDialog(car: Car): void {
    console.log(car);
    
    this.dialog.open(ViewDetailsComponent, {
      width: '400px',
      data: car // Pass the car data to the dialog
    });
  }
  bookVehicle(car: Car){
    console.log(car);
    this.router.navigateByUrl('/booking');
  }
  
}

  // onBookButtonClick(){
  //   this.router.navigateByUrl('/book-vehicle');
  // }

