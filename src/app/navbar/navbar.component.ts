import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/auth.service";
import firebase from "firebase/compat/app";


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  appUser: firebase.User;

  constructor(private authService: AuthService) {
    this.authService.appUser$.subscribe((appUser) => (this.appUser = appUser));
   }
   login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    
  }

}
