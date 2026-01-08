import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateService } from '../../../core/services/candidate.service';
import { AddCandidateModalComponent } from './add-candidate-modal.component';
import { Candidate } from '../../../core/models/candidate.model';

@Component({
  standalone: true,
  selector: 'app-candidates-table',
  imports: [CommonModule, AddCandidateModalComponent],
  template: `
    <div class="candidates-section">
      <div class="section-header">
        <h3>Candidates</h3>
        <button class="add-btn" (click)="showAddModal = true" title="Add Candidate">
          <span>+</span>
        </button>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let candidate of getCandidatesArray()">
            <td>{{ candidate.name }}</td>
            <td>{{ candidate.voteCount }}</td>
          </tr>
          <tr *ngIf="getCandidatesArray().length === 0">
            <td colspan="2" class="empty-message">No candidates yet</td>
          </tr>
        </tbody>
      </table>
    </div>
    <app-add-candidate-modal
      *ngIf="showAddModal"
      (closeModal)="onCloseModal()"
      (addCandidate)="onAddCandidate($event)"
      #addCandidateModal
    ></app-add-candidate-modal>
  `,
  styles: [`
    .candidates-section {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
    }

    .section-header h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
    }

    .add-btn {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid #d1d5db;
      background: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      line-height: 1;
      color: #374151;
    }

    .add-btn:hover {
      background: #f3f4f6;
      border-color: #9ca3af;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th {
      padding: 12px 16px;
      text-align: left;
      font-weight: 600;
      font-size: 0.875rem;
      background: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
    }

    .data-table td {
      padding: 12px 16px;
      border-bottom: 1px solid #e5e7eb;
    }

    .data-table tbody tr:last-child td {
      border-bottom: none;
    }

    .empty-message {
      text-align: center;
      color: #6b7280;
      font-style: italic;
    }
  `]
})
export class CandidatesTableComponent {
  @ViewChild('addCandidateModal', { static: false }) addCandidateModal?: AddCandidateModalComponent;
  
  candidateService = inject(CandidateService);
  candidates = this.candidateService.candidates;
  showAddModal = false;

  getCandidatesArray(): Candidate[] {
    const candidatesValue = this.candidates();
    return Array.isArray(candidatesValue) ? candidatesValue : [];
  }

  onCloseModal() {
    this.showAddModal = false;
  }

  onAddCandidate(name: string) {
    this.candidateService.addCandidate(name).subscribe({
      next: (response) => {
        // Data is automatically refreshed from API, just close the modal
        if (this.addCandidateModal) {
          this.addCandidateModal.reset();
        }
        this.showAddModal = false;
      },
      error: (err: any) => {
        // Use setTimeout to ensure ViewChild is available after view update
        setTimeout(() => {
          if (this.addCandidateModal) {
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
            this.addCandidateModal.setError(errorMessage);
          }
        }, 0);
      }
    });
  }
}
