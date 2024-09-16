import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root' // This makes the service available application-wide
})
export class EmployeeService {

    private apiUrl = environment.apiUrl+"/api"; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

//   // Get request example
  getAllEmployees(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employees/all`)
  }

//   // Post request example
//   postData(data: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, data)
//       .pipe(
//         catchError(this.handleError) // Error handling
//       );
//   }

//   // Put request example
//   updateData(id: number, data: any): Observable<any> {
//     const url = `${this.apiUrl}/${id}`;
//     return this.http.put<any>(url, data)
//       .pipe(
//         catchError(this.handleError) // Error handling
//       );
//   }

//   // Delete request example
//   deleteData(id: number): Observable<any> {
//     const url = `${this.apiUrl}/${id}`;
//     return this.http.delete<any>(url)
//       .pipe(
//         catchError(this.handleError) // Error handling
//       );
//   }

//   // Error handling method
//   private handleError(error: HttpErrorResponse) {
//     let errorMessage = 'Unknown error!';
//     if (error.error instanceof ErrorEvent) {
//       // Client-side error
//       errorMessage = `Error: ${error.error.message}`;
//     } else {
//       // Server-side error
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     console.error(errorMessage);
//     return throwError(errorMessage);
//   }
}