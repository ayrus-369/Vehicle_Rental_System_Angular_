import { Routes } from '@angular/router';
import { ViewcarsComponent } from './components/viewcars/viewcars.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BookingComponent } from './components/booking/booking.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { CarsComponent } from './components/cars/cars.component';
import { EditCarDialogComponent } from './components/edit-car-dialog/edit-car-dialog.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { UsersComponent } from './components/users/users.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';


export const routes: Routes = [
    {path:'',component:NavBarComponent,children:[
    {path:'viewcars',component:ViewcarsComponent},
    { path: 'home', component: HomeComponent },
    { path: 'home/:id', component: HomeComponent },
    {path:'login' , component :LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'booking',component:BookingComponent},
    {path:'update-customer',component:UpdateCustomerComponent},
    {path:'update-customer/:id',component:UpdateCustomerComponent},
        {path:'',redirectTo:"home",pathMatch:"full"},
    ]},
  
    { path: 'admin', component: AdminComponent ,children:[
        { path: 'admin-home', component: AdminHomeComponent },
        { path: 'cars', component: CarsComponent },
        { path: 'users', component: UsersComponent },
        { path: 'orders', component: OrdersComponent },
        {path:'admin',component: AdminComponent},
        {path:'editCar',component:EditCarDialogComponent},
        {path:'adminProfile',component: AdminProfileComponent},
     

    ]},
    {path:"**",component:PagenotfoundComponent}

];
