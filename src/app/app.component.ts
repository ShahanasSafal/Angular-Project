import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth.service";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = 'my-crud-app';
  constructor(private authService: AuthService, private router: Router) {
    this.authService.appUser$.subscribe((user) => {
      if (!user) {
        return;
      } else {
        /*
         * If the user is logged in fetch the return URL from local storage.
         * Navigate to the return URL if available.
         */
        const returnUrl = localStorage.getItem("returnUrl");
        if (!returnUrl) {
          return;
        }
        localStorage.removeItem("returnUrl");
        this.router.navigateByUrl(returnUrl);
      }
    });
  }
}
