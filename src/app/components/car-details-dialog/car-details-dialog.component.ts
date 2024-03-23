import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Car } from '../../model/car';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-car-details-dialog',
  standalone: true,
  imports: [MatDialogModule,CommonModule],
  
  templateUrl: './car-details-dialog.component.html',
  styleUrl: './car-details-dialog.component.css'
})
export class CarDetailsDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public car: Car) {}
 
}
