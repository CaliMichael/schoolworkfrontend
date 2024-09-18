import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'schoolwork';

  public employees: Employee[] = [];
  public editEmployee: any;
  public deleteEmployee: any;


  private allEmployees: Employee[] = []; // Store the original list

  ngOnInit() {
    this.getEmployees();
  }

  constructor(private employeeService: EmployeeService) { }

  public getEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        this.allEmployees = response; // Store the original unfiltered list
      }
    )
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    if (container == null) {
      return;
    }
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }

  public searchEmployees(key: string): void {
    console.log(key);
    
    // If the search key is empty, reset to the original employee list
    if (!key) {
      this.employees = [...this.allEmployees]; // Reset to the full list
      return;
    }
  
    const results: Employee[] = this.allEmployees.filter((employee: Employee) =>
      employee.name.toLowerCase().includes(key.toLowerCase()) 
      // employee.email?.toLowerCase().includes(key.toLowerCase()) ||
      // employee.employeeCode.toLowerCase().includes(key.toLowerCase()) ||
      // employee.address?.toLowerCase().includes(key.toLowerCase())
    );
  
    this.employees = results;
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      }
    );
  }

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      // (error: HttpErrorResponse) => {
      //   alert(error.message);
      // }
    );
  }

  public onDeleteEmployee(employeeId: string): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        this.getEmployees();
      },
      // (error: HttpErrorResponse) => {
      //   alert(error.message);
      // }
    );
  }



}
