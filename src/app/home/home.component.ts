import { Component, OnInit } from '@angular/core';
import { Employee } from "src/app/employee";
import { EmployeeService } from "src/app/employee.service";
import { AuthService } from "src/app/auth.service";
import firebase from "firebase/compat/app";
import { ReplaySubject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

  public employeeList: Employee[];
  appUser: firebase.User;
  private destroyed$ = new ReplaySubject<void>(1);

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService
  ) {
    this.authService.appUser$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((appUser) => (this.appUser = appUser));
   }

  ngOnInit(): void {
    this.getEmployees();

  }
  getEmployees() {
    this.employeeService
      .getAllEmployees()
      .subscribe((data: Employee[]) => (this.employeeList = data));
  }

  delete(employeeID:any) {
    if (confirm("Are you sure you want to delete this employee record ??")) {
      this.employeeService.deleteEmployee(employeeID).then(
        () => {
          this.getEmployees();
        },
        (error) => console.error(error)
      );
    }
  }



}
