import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CandidateService } from '../../../core/services/candidate.service';
import { CardComponent } from '../../../shared/ui/card.component';

@Component({
  standalone: true,
  selector: 'app-add-candidate-form',
  imports: [FormsModule, CommonModule, CardComponent],
  template: `
    <app-card title="Add New Candidate">
      <form (ngSubmit)="onSubmit()" class="add-form">
        <div class="form-group">
          <label for="candidateName">Candidate Name</label>
          <input
            id="candidateName"
            type="text"
            [(ngModel)]="candidateName"
            name="candidateName"
            placeholder="Enter candidate name"
            required
            minlength="2"
            maxlength="50"
            class="form-input"
            [class.error]="error"
          />
          <div class="error-message" *ngIf="error">{{ error }}</div>
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="isSubmitting || !candidateName.trim()">
          <span *ngIf="!isSubmitting">Add Candidate</span>
          <span *ngIf="isSubmitting">Adding...</span>
        </button>
      </form>
    </app-card>
  `,
  styles: [`
    .add-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    label {
      font-weight: 500;
      color: #374151;
      font-size: 0.875rem;
    }

    .form-input {
      padding: 12px 16px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.2s ease;
      background: #f9fafb;
    }

    .form-input:focus {
      outline: none;
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-input.error {
      border-color: #ef4444;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 4px;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      align-self: flex-start;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-primary:active:not(:disabled) {
      transform: translateY(0);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class AddCandidateFormComponent {
  candidateService = inject(CandidateService);
  candidateName = '';
  error = '';
  isSubmitting = false;

  async onSubmit() {
    if (!this.candidateName.trim()) {
      this.error = 'Please enter a candidate name';
      return;
    }

    if (this.candidateName.trim().length < 2) {
      this.error = 'Candidate name must be at least 2 characters';
      return;
    }

    this.error = '';
    this.isSubmitting = true;

    this.candidateService.addCandidate(this.candidateName.trim()).subscribe({
      next: () => {
        this.candidateName = '';
        this.isSubmitting = false;
      },
      error: (err) => {
        // Handle different error response formats
        let errorMessage = 'Failed to add candidate. Please try again.';
        
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
