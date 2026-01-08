namespace VotingAppAPI.DTOs.Requests
{
    public class CastVoteRequest
    {
        public int CandidateId { get; set; }
        public int VoterId { get; set; }
    }
}
