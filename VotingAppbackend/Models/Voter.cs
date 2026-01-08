namespace VotingAppAPI.Models
{
    public class Voter
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool HasVoted { get; set; }
    }
}
