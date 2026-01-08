import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoterService } from '../../../core/services/voter.service';
import { AddVoterModalComponent } from './add-voter-modal.component';
import { Voter } from '../../../core/models/voter.model';

@Component({
  standalone: true,
  selector: 'app-voters-table',
  imports: [CommonModule, AddVoterModalComponent],
  template: `
    <div class="voters-section">
      <div class="section-header">
        <h3>Voters</h3>
        <button class="add-btn" (click)="showAddModal = true" title="Add Voter">
          <span>+</span>
        </button>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Has voted</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let voter of getVotersArray()">
            <td>{{ voter.name }}</td>
            <td>{{ voter.hasVoted ? 'v' : 'x' }}</td>
          </tr>
          <tr *ngIf="getVotersArray().length === 0">
            <td colspan="2" class="empty-message">No voters yet</td>
          </tr>
        </tbody>
      </table>
    </div>
    <app-add-voter-modal
      *ngIf="showAddModal"
      (closeModal)="onCloseModal()"
      (addVoter)="onAddVoter($event)"
      #addVoterModal
    ></app-add-voter-modal>
  `,
  styles: [`
    .voters-section {
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
export class VotersTableComponent {
  @ViewChild('addVoterModal', { static: false }) addVoterModal?: AddVoterModalComponent;
  
  voterService = inject(VoterService);
  voters = this.voterService.voters;
  showAddModal = false;

  getVotersArray(): Voter[] {
    const votersValue = this.voters();
    return Array.isArray(votersValue) ? votersValue : [];
  }

  onCloseModal() {
    this.showAddModal = false;
  }

  onAddVoter(name: string) {
    this.voterService.addVoter(name).subscribe({
      next: (response) => {
       
        if (this.addVoterModal) {
          this.addVoterModal.reset();
        }
        this.showAddModal = false;
      },
      error: (err: any) => {
        // Use setTimeout to ensure ViewChild is available after view update
        setTimeout(() => {
          if (this.addVoterModal) {
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
            this.addVoterModal.setError(errorMessage);
          }
        }, 0);
      }
    });
  }
}
