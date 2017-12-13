import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  storageKey: string = 'report-manager-jwt';
  username: string = 'username';
  checkUsername: string;  
  userType: string = 'admin';  
  userType2: string = 'manage'; 
  _id: string = '_id';
  

  constructor(private router: Router) { }

  setToken(token: string, admin: boolean, manage: boolean, username: string, _id: string) {
    localStorage.setItem(this.storageKey, token);
    localStorage.setItem(this.userType, admin.toString());   
    localStorage.setItem(this.userType2, manage.toString());      
    localStorage.setItem(this.username, username);
    localStorage.setItem(this._id, _id);
  }

  /////////////////// Retrieve from local storage ///////////////////

  getToken() {
    return localStorage.getItem(this.storageKey);
  }

  getUsername() {
    return localStorage.getItem(this.username);
  }

  getID() {
    return localStorage.getItem(this._id);
  }

  getAdmin() {
    return localStorage.getItem(this.userType);
  }

  getManage() {
    return localStorage.getItem(this.userType2);
  }
    
  isAdmin() {
    var isAdmin = false;
    if(this.getAdmin() === "true"){
      isAdmin = true;
    }
    return isAdmin;
  }

  isManage() {
    var isManage = false;
    if(this.getManage() === "true"){
      isManage = true;
    }
    return isManage;
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  isLoggedOut() {
    return this.getToken() == null;
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.username);
    this.router.navigate(['/login']);
  }

}
