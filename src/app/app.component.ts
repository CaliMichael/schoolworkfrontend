import { Component } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'schoolwork';

  public employees: Employee[] = [];

  ngOnInit(){
    this.getEmployees();
  }

  constructor(private employeeService: EmployeeService) { }

  public getEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (response: Employee[])=>{
        this.employees = response;
      }
    )
  }
}
