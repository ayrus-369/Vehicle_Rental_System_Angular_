import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Car } from '../../model/car';
import { HttpClient } from '@angular/common/http';
import { VehicleService } from '../../services/vehicle.service';


@Component({
  selector: 'app-add-car-dialog',
  standalone: true,
  imports: [CommonModule,FormsModule, MatFormFieldModule, MatInputModule,MatDialogActions,MatDialogContent,MatDialogModule],
  templateUrl: './add-car-dialog.component.html',
  styleUrl: './add-car-dialog.component.css'
})
export class AddCarDialogComponent {
  constructor(private dialogRef: MatDialogRef<AddCarDialogComponent>,private http: HttpClient,private vehicleService:VehicleService){}
  car:Car=new Car();



  }



