import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap, catchError, throwError } from 'rxjs';
import { VoterService } from './voter.service';
import { CandidateService } from './candidate.service';
import { CastVoteRequest } from '../models/api-dtos.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VoteService {
  private http = inject(HttpClient);
  private voterService = inject(VoterService);
  private candidateService = inject(CandidateService);
  private apiUrl = `${environment.apiUrl}/votes`;

  castVote(voterId: number, candidateId: number): Observable<any> {
    const request: CastVoteRequest = { voterId, candidateId };
    
    return this.http.post<any>(this.apiUrl, request).pipe(
      switchMap((response) => {
       
        return this.voterService.loadVoters().pipe(
          switchMap(() => this.candidateService.loadCandidates()),
          switchMap(() => {
           
            return new Observable(observer => {
              observer.next(response || { success: true });
              observer.complete();
            });
          })
        );
      }),
      catchError((err) => {
        console.error('Error casting vote:', err);
        return throwError(() => err);
      })
    );
  }
}
