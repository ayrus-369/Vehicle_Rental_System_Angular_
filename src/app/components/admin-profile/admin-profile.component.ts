import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../model/admin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditAdminDialogComponent } from '../edit-admin-dialog/edit-admin-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
  admin:Admin=new Admin();
  duration:number=4000;
constructor(private adminService:AdminService,private dialog: MatDialog,private _snackBar:MatSnackBar,private router:Router) {
this.adminService.getAdmin().subscribe(
  {
    next:(data: Admin)=>{
          this.admin=data;
        },
      error:(error)=>{console.log("Error Occured")}
     
  }
)
}
openSnackBar(msg: string, time: number) {
  this._snackBar.open(msg,"OK",{
    horizontalPosition: 'center',
    verticalPosition:"bottom",
    duration: time,
    panelClass: ['custom-snackbar']
  });
}

updateAdmin(admin:Admin){
  const dialogRef=this.dialog.open(EditAdminDialogComponent,{
    width:'600px',
    data:admin,
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
     
      console.log(result);
   
      
      
      this.adminService.updateAdmin(result).subscribe(
        {
          next:(data)=>{
            console.log(data);
            this.openSnackBar("admin Updated",this.duration);
            this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
              this.router.navigate(['admin/adminProfile']);});
           
          },
          error:(err)=>{
            console.log(err);
            this.openSnackBar("Failed To Update admin ",this.duration);
   
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
