import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../../model/customer';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  [x: string]: any;
  title = 'vrs';
  isLoggedIn=sessionStorage.getItem("isLoggedIn");
  currentCustomerId:string | null ="";
  customer:Customer=new Customer();
 
  currentCustomer:Observable<any>=new Observable<any>();
  id:string | null = "";
  message:string="";
  errorMessage:string="";
 

  constructor(public  router:Router,private authService:AuthService){
   
  }
  
  logout()
  {
    let id: number = Number(this.currentCustomerId || '0');
  
    this.authService.logout(id);
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem('id');
    // this.router.navigateByUrl('home');
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['home']);
  }); 
   
  }
  bookingList()
  {
    let id: number = Number(this.currentCustomerId || '0');
    console.log(id);
    // this.router.navigateByUrl("update-customer/" + this.currentCustomerId);
    
    this.router.navigateByUrl( "display-bookings/" + sessionStorage.getItem('id'));
  }

  paymentList()
  {
    let id: number = Number(this.currentCustomerId || '0');
    console.log(id);
    // this.router.navigateByUrl("update-customer/" + this.currentCustomerId);
    this.router.navigateByUrl( "display-payments/" + sessionStorage.getItem('id'));
  }
  update()
  {
    let id: number = Number(this.currentCustomerId || '0');
    console.log(id);
    // this.router.navigateByUrl("update-customer/" + this.currentCustomerId);
    this.router.navigateByUrl( "update-customer/" + sessionStorage.getItem('id'));

  }

  goHome(){
    let id: number = Number(this.currentCustomerId || '0');
    console.log(id);
    // this.router.navigateByUrl("update-customer/" + this.currentCustomerId);
    this.router.navigateByUrl( "home/" + sessionStorage.getItem("id"));
  }
  goViewCars(){
    let id: number = Number(this.currentCustomerId || '0');
    console.log(id);
    // this.router.navigateByUrl("update-customer/" + this.currentCustomerId);
    this.router.navigateByUrl( "viewcars/" + sessionStorage.getItem('id'));
  }

}
