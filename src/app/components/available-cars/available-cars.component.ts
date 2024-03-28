import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Car } from '../../model/car';
import { VehicleService } from '../../services/vehicle.service';
import { AddCarDialogComponent } from '../add-car-dialog/add-car-dialog.component';
import { CarDetailsDialogComponent } from '../car-details-dialog/car-details-dialog.component';
import { EditCarDialogComponent } from '../edit-car-dialog/edit-car-dialog.component';
import { CommonModule } from '@angular/common';
import { SearchCarPipe } from '../../pipes/search-car.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-available-cars',
  standalone: true,
  imports: [CommonModule,FormsModule,SearchCarPipe],
  templateUrl: './available-cars.component.html',
  styleUrl: './available-cars.component.css'
})
export class AvailableCarsComponent {
  searchTerm:string="";
  message:string="";
  errorMessage:string="";
  cars:Car[]=[]
  duration:number=4000;
  constructor(private dialog: MatDialog,private router:Router,private vehicleService:VehicleService,private _snackBar: MatSnackBar){
   
    
      }
      openSnackBar(msg: string, time: any) {
        this._snackBar.open(msg,"OK",{
          horizontalPosition: 'center',
          verticalPosition:"bottom",
          duration: time,
          panelClass: ['custom-snackbar']
        });
      }
      ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.vehicleService.getAllAvailabeVehicles.subscribe(
          {
            next:(data: any)=>{
    
              this.cars=data;
                
              },
              error:(err: any)=>{
                if(err.error=="No Vehicles exist!")
               this.openSnackBar("No Vehicles Founded !!",this.duration);
              else 
              this.openSnackBar("We apologize, there is an internal error. Please try again later !",this.duration);
    
              },
              complete:()=>{
                console.log("Server completed sending data.");
                
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
  deleteCar(car :Car){
    if(confirm("Do you really want to delete this "+car.brand))
    this.vehicleService.deleteVechicleById(car.id)
    .subscribe({
      next:(res:any)=> {
        console.log(res);
        this.openSnackBar("Deactivated the car",this.duration);
      this.cars.filter(obj=> obj.id !== res.id);
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['admin/cars']);});
      },
        error:(err: any)=>{console.log(err);
        },
        complete:()=>{
          console.log("Server completed sending data.");
          
        }
      });



  }
  updateCar(car:Car){
    const dialogRef=this.dialog.open(EditCarDialogComponent,{
      width:'600px',
      data:car,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log(result.isActive);
        console.log(result);
     
        
        // Process the result here (e.g., save the car)
        this.vehicleService.updateVehicle(result).subscribe(
          {
            next:(data:any)=>{
              console.log(data);
              this.message = "Vehicle Updated";
              this.openSnackBar(this.message,  this.duration);
              this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                this.router.navigate(['admin/cars']);});
            },
            error:(err:any)=>{
              console.log(err);
              this.errorMessage = err.error;
              this.openSnackBar(this.errorMessage,this.duration)
            },
            complete:()=>{
              console.log("Server completed sending data");
            }
          }
        )
  
      }
    });
  
  }
// Inside CarsComponent

openAddCarModal(): void {
  const dialogRef = this.dialog.open(AddCarDialogComponent, {
    width: '600px',
  
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // console.log(result.isActive);
      console.log(result);
      
      
      // Process the result here (e.g., save the car)
      this.vehicleService.addVehicle(result).subscribe(
        {
          next:(data:any)=>{
            console.log(data);
            this.message = "Car added";
            this.openSnackBar(this.message,this.duration);
            this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
              this.router.navigate(['admin/cars']);});
            },
          
          error:(err:any)=>{
            console.log(err);
            this.errorMessage = "No Available Vehicles !!";
            this.openSnackBar(this.errorMessage,  this.duration);
          },
          complete:()=>{
            console.log("Server completed sending data");
          }
        }
      )

    }
  });

}

}
