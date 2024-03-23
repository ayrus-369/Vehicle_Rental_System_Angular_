import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Customer } from './model/customer';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
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
    this.router.navigateByUrl('home');
   
  }
  update()
  {
    let id: number = Number(this.currentCustomerId || '0');
    console.log(id);
    // this.router.navigateByUrl("update-customer/" + this.currentCustomerId);
    this.router.navigateByUrl( "update-customer/" + id);
  }

  goHome(){
    let id: number = Number(this.currentCustomerId || '0');
    console.log(id);
    // this.router.navigateByUrl("update-customer/" + this.currentCustomerId);
    this.router.navigateByUrl( "home/" + id);
  }
}
