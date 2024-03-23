import { Injectable } from '@angular/core';
// import { SessionStorageService } from 'ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn:Boolean=false;
  // constructor(private sessionStorage:sessionStorageService) { }
}
