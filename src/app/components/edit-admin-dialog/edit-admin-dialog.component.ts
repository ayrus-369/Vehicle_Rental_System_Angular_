import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Admin } from '../../model/admin';
import { EditCarDialogComponent } from '../edit-car-dialog/edit-car-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-admin-dialog',
  standalone: true,
  imports: [CommonModule,FormsModule,MatDialogContent,MatDialogActions,MatDialogClose],
  templateUrl: './edit-admin-dialog.component.html',
  styleUrl: './edit-admin-dialog.component.css'
})
export class EditAdminDialogComponent {
admin:Admin=new Admin();
constructor(
  public dialogRef: MatDialogRef<EditCarDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Admin,private _snackBar:MatSnackBar) { 
    this.admin=data;
  }
 

}
