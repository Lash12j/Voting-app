namespace VotingAppAPI.DTOs.Responses
{
    public class CandidateResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int VoteCount { get; set; }
    }
}
