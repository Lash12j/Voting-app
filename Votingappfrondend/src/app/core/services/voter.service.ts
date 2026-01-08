import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of, switchMap, map } from 'rxjs';
import { Voter } from '../models/voter.model';
import { CreateVoterRequest, ApiResponse } from '../models/api-dtos.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VoterService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/voters`;
  
  voters = signal<Voter[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  loadVoters(): Observable<Voter[]> {
    this.isLoading.set(true);
    this.error.set(null);
    
    return this.http.get<ApiResponse<Voter[]> | Voter[]>(this.apiUrl).pipe(
      map((response: ApiResponse<Voter[]> | Voter[]) => {
    
        let votersArray: Voter[] = [];
        
        if (Array.isArray(response)) {
          
          votersArray = response;
        } else if (response && typeof response === 'object') {
          
          const data = (response as any).data || (response as any).Data;
          if (Array.isArray(data)) {
            votersArray = data;
          }
        }
        
        return votersArray;
      }),
      tap({
        next: (votersArray) => {
          this.voters.set(votersArray);
          this.isLoading.set(false);
        }
      }),
      catchError((err) => {
        
        this.voters.set([]);
        this.error.set(err.message || 'Failed to load voters');
        this.isLoading.set(false);
        console.error('Error loading voters:', err);
        
        return of([]);
      })
    );
  }

  addVoter(name: string): Observable<ApiResponse<string>> {
    this.isLoading.set(true);
    this.error.set(null);
    
    const request: CreateVoterRequest = { name };
    
    return this.http.post<ApiResponse<string>>(this.apiUrl, request).pipe(
      switchMap((response) => {
        
        this.isLoading.set(false);
        return this.loadVoters().pipe(
          switchMap(() => {
           
            return of(response);
          })
        );
      }),
      catchError((err) => {
        this.error.set(err.error?.message || err.message || 'Failed to add voter');
        this.isLoading.set(false);
        console.error('Error adding voter:', err);
        return of({ success: false, message: err.error?.message || err.message || 'Failed to add voter' } as ApiResponse<string>);
      })
    );
  }
}
