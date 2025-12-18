import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private apiUrl = `${environment.apiUrl}/api`;
  // Emits whenever data changes (candidate/voter/vote added)
  private refreshSource = new Subject<void>();
  refresh$ = this.refreshSource.asObservable();

  // Call this after any successful mutation to notify listeners
  notifyRefresh(): void {
    this.refreshSource.next();
  }

  constructor(private http: HttpClient) { }

  getCandidates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/candidates`);
  }

  getVoters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/voters`);
  }

  addCandidate(name: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/candidates`, { name });
  }

  addVoter(name: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/voters`, { name });
  }

  castVote(voterId: number, candidateId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/votes`, { voterId, candidateId });
  }
}
