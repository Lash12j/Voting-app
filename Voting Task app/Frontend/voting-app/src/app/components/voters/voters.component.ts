import { Component, OnInit } from '@angular/core';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.css']
})
export class VotersComponent implements OnInit {
  voters: any[] = [];
  showAddForm = false;
  newVoterName = '';

  constructor(private voteService: VoteService) {}

  ngOnInit() {
    this.loadVoters();
    // Reload whenever there is a global refresh (e.g. vote cast)
    this.voteService.refresh$.subscribe(() => this.loadVoters());
  }

  loadVoters() {
    this.voteService.getVoters().subscribe((res: any) => this.voters = res);
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.newVoterName = '';
    }
  }

  addVoter() {
    if (this.newVoterName.trim()) {
      this.voteService.addVoter(this.newVoterName.trim()).subscribe(() => {
        this.loadVoters();
        this.newVoterName = '';
        this.showAddForm = false;
        // Notify others that a voter was added
        this.voteService.notifyRefresh();
      });
    }
  }
}
