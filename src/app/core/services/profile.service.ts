import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/users'; 

  constructor(private http: HttpClient) {}

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  updateUser(userId: string, updatedUser: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, updatedUser);
  }
}
