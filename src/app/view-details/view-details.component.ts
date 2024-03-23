import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Car } from '../model/car';

@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [MatDialogModule,CommonModule],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.css'
})
export class ViewDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public car: Car) {}
}
