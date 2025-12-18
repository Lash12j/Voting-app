import { Component, OnInit } from '@angular/core';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  candidates: any[] = [];
  showAddForm = false;
  newCandidateName = '';

  constructor(private voteService: VoteService) {}

  ngOnInit() {
    this.loadCandidates();
    // Reload whenever there is a global refresh (e.g. vote cast)
    this.voteService.refresh$.subscribe(() => this.loadCandidates());
  }

  loadCandidates() {
    this.voteService.getCandidates().subscribe((res: any) => this.candidates = res);
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.newCandidateName = '';
    }
  }

  addCandidate() {
    if (this.newCandidateName.trim()) {
      this.voteService.addCandidate(this.newCandidateName.trim()).subscribe(() => {
        this.loadCandidates();
        this.newCandidateName = '';
        this.showAddForm = false;
        // Notify others that a candidate was added
        this.voteService.notifyRefresh();
      });
    }
  }
}
