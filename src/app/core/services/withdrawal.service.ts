import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/auth/auth.selectors';

export interface Withdrawal {
  id?: number;
  userId: string;
  points: number;
  money: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class WithdrawalService {
  private apiUrl = 'http://localhost:3000/withdrawals'; // JSON Server endpoint
  private userId!: string;

  constructor(private http: HttpClient, private store: Store) {
    this.store.select(selectUser).subscribe((user) => {
      if (user) {
        this.userId = user.id!;
      }
    });
  }

  getUserWithdrawals(): Observable<Withdrawal[]> {
    return this.http.get<Withdrawal[]>(`${this.apiUrl}?userId=${this.userId}`);
  }

  saveWithdrawal(points: number, money: number): Observable<Withdrawal> {
    const withdrawal: Withdrawal = {
      userId: this.userId,
      points,
      money,
      timestamp: new Date().toISOString(),
    };
    return this.http.post<Withdrawal>(this.apiUrl, withdrawal);
  }
}
