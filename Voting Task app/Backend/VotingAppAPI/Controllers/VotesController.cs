using Microsoft.AspNetCore.Mvc;
using VotingAppAPI.Models;

namespace VotingAppAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VotesController : ControllerBase
    {
        private readonly VotingDbContext _context;

        public VotesController(VotingDbContext context)
        {
            _context = context;
        }

        // POST: api/votes
        [HttpPost]
        public IActionResult CastVote([FromBody] VoteRequest request)
        {
            if (request == null || request.VoterId <= 0 || request.CandidateId <= 0)
                return BadRequest("Invalid request. VoterId and CandidateId are required.");

            var voter = _context.Voters.FirstOrDefault(v => v.Id == request.VoterId);
            var candidate = _context.Candidates.FirstOrDefault(c => c.Id == request.CandidateId);

            if (voter == null || candidate == null)
                return BadRequest("Invalid voter or candidate.");

            if (voter.HasVoted)
                return BadRequest("Voter has already voted.");

            // Cast vote
            voter.HasVoted = true;
            candidate.VoteCount++;

            _context.Votes.Add(new Vote
            {
                VoterId = request.VoterId,
                CandidateId = request.CandidateId
            });

            _context.SaveChanges();

            return Ok(new { message = "Vote cast successfully" });
        }
    }

    public class VoteRequest
    {
        public int VoterId { get; set; }
        public int CandidateId { get; set; }
    }
}
