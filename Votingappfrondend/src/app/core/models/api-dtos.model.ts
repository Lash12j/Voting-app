
import { Candidate } from './candidate.model';
import { Voter } from './voter.model';

export interface CreateCandidateRequest {
  name: string;
}

export interface CreateVoterRequest {
  name: string;
}

export interface CastVoteRequest {
  voterId: number;
  candidateId: number;
}

export interface ApiResponse<T> {
  data?: T;
  success: boolean;
  message?: string;
}


export interface CandidateApiResponse extends ApiResponse<Candidate[]> {
  data?: Candidate[];
}

export interface VoterApiResponse extends ApiResponse<Voter[]> {
  data?: Voter[];
}
