import { Component, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VoterService } from '../../../core/services/voter.service';
import { CandidateService } from '../../../core/services/candidate.service';
import { VoteService } from '../../../core/services/vote.service';

@Component({
  standalone: true,
  selector: 'app-vote-form',
  imports: [FormsModule, CommonModule],
  template: `
    <div class="vote-section">
      <h3>Vote!</h3>
      <form (ngSubmit)="submit()" class="vote-form">
        <div class="form-row">
          <label for="voterSelect">I am</label>
          <select
            id="voterSelect"
            [(ngModel)]="voterId"
            name="voterId"
            class="form-select"
            required
          >
            <option [value]="">Select voter</option>
            <option *ngFor="let v of getVotersArray()" [value]="v.id">
              {{ v.name }}
            </option>
          </select>
        </div>

        <div class="form-row">
          <label for="candidateSelect">I vote for</label>
          <select
            id="candidateSelect"
            [(ngModel)]="candidateId"
            name="candidateId"
            class="form-select"
            required
          >
            <option [value]="">Select candidate</option>
            <option *ngFor="let c of getCandidatesArray()" [value]="c.id">
              {{ c.name }}
            </option>
          </select>
        </div>

        <div class="form-row">
          <button
            type="submit"
            class="submit-btn"
            [disabled]="isSubmitting || !voterId || !candidateId"
          >
            Submit
          </button>
        </div>

        <div class="error-message" *ngIf="error">{{ error }}</div>
        <div class="success-message" *ngIf="successMessage">{{ successMessage }}</div>
      </form>
    </div>
  `,
  styles: [`
    .vote-section {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      padding: 16px;
    }

    .vote-section h3 {
      margin: 0 0 16px 0;
      font-size: 1rem;
      font-weight: 600;
    }

    .vote-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .form-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .form-row label {
      min-width: 80px;
      font-weight: 500;
      font-size: 0.875rem;
    }

    .form-select {
      flex: 1;
      padding: 6px 12px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 0.875rem;
    }

    .form-select:focus {
      outline: none;
      border-color: #3b82f6;
    }

    .submit-btn {
      padding: 6px 16px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
    }

    .submit-btn:hover:not(:disabled) {
      background: #2563eb;
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 8px;
    }

    .success-message {
      color: #10b981;
      font-size: 0.875rem;
      margin-top: 8px;
    }
  `]
})
export class VoteFormComponent {
  voterId: number | string = '';
  candidateId: number | string = '';
  error = '';
  successMessage = '';
  isSubmitting = false;

  voterService = inject(VoterService);
  candidateService = inject(CandidateService);
  voters = this.voterService.voters;
  candidates = this.candidateService.candidates;
  voteService = inject(VoteService);

  getVotersArray() {
    const votersValue = this.voters();
    return Array.isArray(votersValue) ? votersValue.filter(v => !v.hasVoted) : [];
  }

  getCandidatesArray() {
    const candidatesValue = this.candidates();
    return Array.isArray(candidatesValue) ? candidatesValue : [];
  }


  submit() {
    if (!this.voterId || !this.candidateId) {
      this.error = 'Please select both a voter and a candidate';
      return;
    }

    this.error = '';
    this.successMessage = '';
    this.isSubmitting = true;

    this.voteService.castVote(Number(this.voterId), Number(this.candidateId)).subscribe({
      next: (response) => {
        this.successMessage = 'Vote cast successfully!';
        this.voterId = '';
        this.candidateId = '';
        this.isSubmitting = false;
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err: any) => {
        // Handle different error response formats
        let errorMessage = 'Failed to cast vote. Please try again.';
        
        if (err.error) {
          if (typeof err.error === 'string') {
            errorMessage = err.error;
          } else if (err.error.message) {
            errorMessage = err.error.message;
          } else if (err.error.error) {
            errorMessage = err.error.error;
          }
        } else if (err.message) {
          errorMessage = err.message;
        }
        
        this.error = errorMessage;
        this.isSubmitting = false;
      }
    });
  }
}
