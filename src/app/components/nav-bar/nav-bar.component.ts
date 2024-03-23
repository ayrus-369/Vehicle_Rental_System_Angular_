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
