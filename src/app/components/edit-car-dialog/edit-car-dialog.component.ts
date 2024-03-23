import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Car } from '../../model/car';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit-car-dialog',
  standalone: true,
  imports: [FormsModule,MatDialogActions,MatDialogContent,MatDialogClose,CommonModule],
  templateUrl: './edit-car-dialog.component.html',
  styleUrl: './edit-car-dialog.component.css'
})
export class EditCarDialogComponent {

car : Car=new Car();
  constructor(
    public dialogRef: MatDialogRef<EditCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Car) { 
      this.car=data;
    }


}