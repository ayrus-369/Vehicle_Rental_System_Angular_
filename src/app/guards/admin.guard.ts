import { Router,CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
 let admin =sessionStorage.getItem('admin');
 if(admin){
   return true;}
   inject(Router).navigateByUrl('login');
   return false;
};
