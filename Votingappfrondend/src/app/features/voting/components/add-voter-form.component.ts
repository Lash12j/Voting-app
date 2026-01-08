import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VoterService } from '../../../core/services/voter.service';
import { CardComponent } from '../../../shared/ui/card.component';

@Component({
  standalone: true,
  selector: 'app-add-voter-form',
  imports: [FormsModule, CommonModule, CardComponent],
  template: `
    <app-card title="Add New Voter">
      <form (ngSubmit)="onSubmit()" class="add-form">
        <div class="form-group">
          <label for="voterName">Voter Name</label>
          <input
            id="voterName"
            type="text"
            [(ngModel)]="voterName"
            name="voterName"
            placeholder="Enter voter name"
            required
            minlength="2"
            maxlength="50"
            class="form-input"
            [class.error]="error"
          />
          <div class="error-message" *ngIf="error">{{ error }}</div>
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="isSubmitting || !voterName.trim()">
          <span *ngIf="!isSubmitting">Add Voter</span>
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
export class AddVoterFormComponent {
  voterService = inject(VoterService);
  voterName = '';
  error = '';
  isSubmitting = false;

  async onSubmit() {
    if (!this.voterName.trim()) {
      this.error = 'Please enter a voter name';
      return;
    }

    if (this.voterName.trim().length < 2) {
      this.error = 'Voter name must be at least 2 characters';
      return;
    }

    this.error = '';
    this.isSubmitting = true;

    this.voterService.addVoter(this.voterName.trim()).subscribe({
      next: () => {
        this.voterName = '';
        this.isSubmitting = false;
      },
      error: (err) => {
        // Handle different error response formats
        let errorMessage = 'Failed to add voter. Please try again.';
        
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
