import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-add-candidate-modal',
  imports: [FormsModule, CommonModule],
  template: `
    <div class="modal-overlay" (click)="close()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>Add New Candidate</h3>
          <button class="close-btn" (click)="close()">×</button>
        </div>
        <form (ngSubmit)="onSubmit()" class="modal-form">
          <div class="form-group">
            <label for="candidateName">Name</label>
            <input
              id="candidateName"
              type="text"
              [(ngModel)]="candidateName"
              name="candidateName"
              placeholder="Enter candidate name"
              required
              class="form-input"
              [class.error]="error"
            />
            <div class="error-message" *ngIf="error">{{ error }}</div>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-cancel" (click)="close()">Cancel</button>
            <button type="submit" class="btn btn-submit" [disabled]="isSubmitting || !candidateName.trim()">
              <span *ngIf="!isSubmitting">Add</span>
              <span *ngIf="isSubmitting">Adding...</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 8px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid #e5e7eb;
    }

    .modal-header h3 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #6b7280;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn:hover {
      color: #374151;
    }

    .modal-form {
      padding: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;
    }

    label {
      font-weight: 500;
      color: #374151;
      font-size: 0.875rem;
    }

    .form-input {
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 1rem;
    }

    .form-input:focus {
      outline: none;
      border-color: #3b82f6;
    }

    .form-input.error {
      border-color: #ef4444;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
    }

    .modal-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
    }

    .btn-cancel {
      background: #f3f4f6;
      color: #374151;
    }

    .btn-cancel:hover {
      background: #e5e7eb;
    }

    .btn-submit {
      background: #3b82f6;
      color: white;
    }

    .btn-submit:hover:not(:disabled) {
      background: #2563eb;
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class AddCandidateModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() addCandidate = new EventEmitter<string>();

  candidateName = '';
  error = '';
  isSubmitting = false;

  close() {
    this.reset();
    this.closeModal.emit();
  }

  onSubmit() {
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
    this.addCandidate.emit(this.candidateName.trim());
  }

  setError(message: string) {
    this.error = message;
    this.isSubmitting = false;
  }

  reset() {
    this.candidateName = '';
    this.error = '';
    this.isSubmitting = false;
  }
}
