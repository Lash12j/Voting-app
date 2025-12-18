import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { VotersComponent } from './components/voters/voters.component';
import { VoteComponent } from './components/vote/vote.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    CandidatesComponent,
    VotersComponent,
    VoteComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
