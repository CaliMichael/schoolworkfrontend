import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root' // This makes the service available application-wide
})
export class EmployeeService {

    private apiUrl = environment.apiUrl+"/api"; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employees/all`)
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employees/add`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/employees/update`, employee);
  }

  public deleteEmployee(employeeId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/employees/delete/${employeeId}`);
  }

}