import { Component, inject, OnInit } from '@angular/core';
import { VotersTableComponent } from './components/voters-table.component';
import { CandidatesTableComponent } from './components/candidates-table.component';
import { VoteFormComponent } from './components/vote-form.component';
import { AddVoterFormComponent } from './components/add-voter-form.component';
import { AddCandidateFormComponent } from './components/add-candidate-form.component';
import { VoterService } from '../../core/services/voter.service';
import { CandidateService } from '../../core/services/candidate.service';

@Component({
  standalone: true,
  selector: 'app-voting-page',
  template: `
    <div class="voting-container">
      <h1 class="app-title">Voting app</h1>
      
      <div class="tables-row">
        <app-voters-table></app-voters-table>
        <app-candidates-table></app-candidates-table>
      </div>

      <app-vote-form></app-vote-form>
    </div>
  `,
  styles: [`
    .voting-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px;
    }

    .app-title {
      margin: 0 0 24px 0;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .tables-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }

    @media (max-width: 768px) {
      .tables-row {
        grid-template-columns: 1fr;
      }
    }
  `],
  imports: [
    VotersTableComponent,
    CandidatesTableComponent,
    VoteFormComponent
  ]
})
export class VotingPage implements OnInit {
  voterService = inject(VoterService);
  candidateService = inject(CandidateService);

  ngOnInit() {
    // Load initial data from API
    this.voterService.loadVoters().subscribe();
    this.candidateService.loadCandidates().subscribe();
  }
}
