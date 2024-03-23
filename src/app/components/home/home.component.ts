import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent 
{
    id:string | null = "";
    constructor(private router:Router,private activatedRoute: ActivatedRoute,private navBarComponent:NavBarComponent)
    {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.navBarComponent.currentCustomerId=this.id;
    }
  showDetails(){
    this.router.navigateByUrl('/viewcars');
  }
}
