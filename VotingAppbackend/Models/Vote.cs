namespace VotingAppAPI.Models
{
    public class Vote
    {
        public int Id { get; set; }
        public int CandidateId { get; set; }
        public int VoterId { get; set; }
    }
}
