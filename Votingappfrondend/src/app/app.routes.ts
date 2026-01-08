import { Routes } from '@angular/router';
import { VotingPage } from './features/voting/voting.page';

export const routes: Routes = [
  { path: '', component: VotingPage },
  { path: '**', redirectTo: '' }
];
