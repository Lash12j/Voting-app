import { Component, OnInit } from '@angular/core';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  voters: any[] = [];
  candidates: any[] = [];
  selectedVoterId: number | null = null;
  selectedCandidateId: number | null = null;

  constructor(private voteService: VoteService) {}

  ngOnInit() {
    this.loadVoters();
    this.loadCandidates();
    // Also react to global refresh events
    this.voteService.refresh$.subscribe(() => {
      this.loadVoters();
      this.loadCandidates();
    });
  }

  loadVoters() {
    this.voteService.getVoters().subscribe(res => this.voters = res);
  }

  loadCandidates() {
    this.voteService.getCandidates().subscribe(res => this.candidates = res);
  }

  castVote() {
    if (this.selectedVoterId && this.selectedCandidateId) {
      const selectedVoter = this.voters.find(v => v.id === this.selectedVoterId);
      if (selectedVoter && selectedVoter.hasVoted) {
        alert('This voter has already voted!');
        return;
      }
      
      this.voteService.castVote(this.selectedVoterId, this.selectedCandidateId)
        .subscribe(
          res => {
            alert('Vote cast successfully!');
            this.selectedVoterId = null;
            this.selectedCandidateId = null;
            // Notify other components that data has changed
            this.voteService.notifyRefresh();
          },
          error => {
            let errorMessage = 'Error casting vote';
            if (error.error) {
              if (typeof error.error === 'string') {
                errorMessage = error.error;
              } else if (error.error.message) {
                errorMessage = error.error.message;
              }
            }
            alert(errorMessage);
          }
        );
    } else {
      alert('Please select both voter and candidate');
    }
  }
}
