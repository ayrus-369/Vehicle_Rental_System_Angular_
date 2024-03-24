import {Router, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
export const customerGuard: CanActivateFn = (route, state) => {
 let customer= sessionStorage.getItem('isLoggedIn');
 if(customer){
  return true;
 }
 inject(Router).navigateByUrl('login');
 return false;
};
