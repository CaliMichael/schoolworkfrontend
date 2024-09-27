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
  public editEmployee: any= {
    name: '',
    employeeCode: '',
    email: '',
    address: ''
  };
  public deleteEmployee: any;


  private allEmployees: Employee[] = []; // Store the original list

  public employeeCodeExists = false; // Track if the employee code is unique

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
      console.log(this.editEmployee)
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    if (mode === 'batch') {
      button.setAttribute('data-target', '#batchModal');
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
    );
  
    this.employees = results;
  }

   // Custom email validator function
   public validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();

    if (!this.validateEmail(addForm.value.email)) {
      console.error('Invalid email format');
      return;
    }


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

  public onExportList(): void {
    this.employeeService.runJob().subscribe(
      (response: void) => {
        this.getEmployees();
      },
      // (error: HttpErrorResponse) => {
      //   alert(error.message);
      // }
    );
  }

  public checkUniqueEmployeeCode(value: string, currentEmployeeId?: string): void {
    if (!value) {
      this.employeeCodeExists = false;
      return;
    }
    
    this.employeeCodeExists = this.allEmployees.some(employee => employee.employeeCode === value &&  employee.id !== currentEmployeeId);
    console.log(this.employeeCodeExists)
  }



}
