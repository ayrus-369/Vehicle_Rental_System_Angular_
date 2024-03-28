import { Routes } from '@angular/router';
import { ViewcarsComponent } from './components/viewcars/viewcars.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

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
import { UnReturnedCarsComponent } from './components/un-returned-cars/un-returned-cars.component';
import { adminGuard } from './guards/admin.guard';
import { customerGuard } from './guards/customer.guard';
import { DisplayPaymentsComponent } from './components/display-payments/display-payments.component';
import { DisplayBookingsComponent } from './components/display-bookings/display-bookings.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BookVehicleComponent } from './components/book-vehicle/book-vehicle.component';
import { AvailableCarsComponent } from './components/available-cars/available-cars.component';
import { DeactivatedCarsComponent } from './components/deactivated-cars/deactivated-cars.component';
import { BookedCarsComponent } from './components/booked-cars/booked-cars.component';


export const routes: Routes = [
    {path:'',component:NavBarComponent,children:[
        {path:'viewcars',component:ViewcarsComponent},
        {path:'viewcars/:id',component:ViewcarsComponent},
    { path: 'home', component: HomeComponent },
    { path: 'home/:id', component: HomeComponent },
    {path:'login' , component :LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'book-vehicle',component:BookVehicleComponent,canActivate:[customerGuard]},
    {path:'book-vehicle/:id/:carId',component:BookVehicleComponent,canActivate:[customerGuard]},
    {path:'update-customer',component:UpdateCustomerComponent},
    {path:'update-customer/:id',component:UpdateCustomerComponent},
    {path:'display-payments/',component:DisplayPaymentsComponent},
    {path:'display-payments/:id',component:DisplayPaymentsComponent},
    {path:'display-bookings/',component:DisplayBookingsComponent},
    {path:'display-bookings/:id',component:DisplayBookingsComponent},
    {path:'payment',component:PaymentComponent},
    {path:'payment/:id/:carId',component:PaymentComponent},
        {path:'',redirectTo:"home",pathMatch:"full"},
    ]},
  
    { path: 'admin', component: AdminComponent ,canActivate:[adminGuard], children:[
        { path: 'admin-home', component: AdminHomeComponent },
        { path: 'cars', component: CarsComponent },
        { path: 'users', component: UsersComponent },
        { path: 'orders', component: OrdersComponent },
        {path:'editCar',component:EditCarDialogComponent},
        {path:'adminProfile',component: AdminProfileComponent},
        {path:'unReturnedCars',component: UnReturnedCarsComponent},
        {path:'availableCars',component: AvailableCarsComponent},
        {path:'deactivatedCars',component: DeactivatedCarsComponent},
        {path:'bookedCars',component: BookedCarsComponent},
    //  {path:'admin',redirectTo:"admin-home",component:AdminHomeComponent}

    ]},
    {path:"**",component:PagenotfoundComponent}

];
