import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Generate a Unique ID
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Sign Up
  signUp(
    username: string,
    email: string,
    password: string,
    role: string = 'individual'
  ): Observable<User> {
    const newUser: User = {
      id: this.generateId(),
      username,
      email,
      role,
      password,
    };

    return this.http
      .post<User>(this.apiUrl, newUser)
      .pipe(catchError(this.handleError));
  }

  // Login
  login(email: string, password: string): Observable<User | null> {
    return this.http
      .get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        map((users) => (users.length > 0 ? users[0] : null)),
        catchError(this.handleError)
      );
  }

  getUserById(id: string): Observable<User> {
    return this.http
      .get<User>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('AuthService Error:', error);
    return throwError(
      () => new Error(error.error?.message || 'An unknown error occurred')
    );
  }
}
