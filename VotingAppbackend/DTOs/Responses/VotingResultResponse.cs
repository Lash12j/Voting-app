namespace VotingAppAPI.DTOs.Responses
{
    public class VotingResultResponse
    {
        public string CandidateName { get; set; } = string.Empty;
        public int VoteCount { get; set; }
    }
}
