import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of, switchMap, map } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { CreateCandidateRequest, ApiResponse } from '../models/api-dtos.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CandidateService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/candidates`;
  
  candidates = signal<Candidate[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  loadCandidates(): Observable<Candidate[]> {
    this.isLoading.set(true);
    this.error.set(null);
    
    return this.http.get<ApiResponse<Candidate[]> | Candidate[]>(this.apiUrl).pipe(
      map((response) => {
        
        let candidatesArray: Candidate[] = [];
        
        if (Array.isArray(response)) {
          
          candidatesArray = response;
        } else if (response && typeof response === 'object') {
         
          const data = (response as any).data || (response as any).Data;
          if (Array.isArray(data)) {
            candidatesArray = data;
          }
        }
        
        return candidatesArray;
      }),
      tap({
        next: (candidatesArray) => {
          this.candidates.set(candidatesArray);
          this.isLoading.set(false);
        }
      }),
      catchError((err) => {
      
        this.candidates.set([]);
        this.error.set(err.message || 'Failed to load candidates');
        this.isLoading.set(false);
        console.error('Error loading candidates:', err);
       
        return of([]);
      })
    );
  }

  addCandidate(name: string): Observable<ApiResponse<string>> {
    this.isLoading.set(true);
    this.error.set(null);
    
    const request: CreateCandidateRequest = { name };
    
    return this.http.post<ApiResponse<string>>(this.apiUrl, request).pipe(
      switchMap((response) => {
       
        this.isLoading.set(false);
        return this.loadCandidates().pipe(
          switchMap(() => {
            
            return of(response);
          })
        );
      }),
      catchError((err) => {
        this.error.set(err.error?.message || err.message || 'Failed to add candidate');
        this.isLoading.set(false);
        console.error('Error adding candidate:', err);
        return of({ success: false, message: err.error?.message || err.message || 'Failed to add candidate' } as ApiResponse<string>);
      })
    );
  }
}
