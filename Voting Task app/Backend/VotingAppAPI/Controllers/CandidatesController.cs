using Microsoft.AspNetCore.Mvc;
using VotingAppAPI.Models;

namespace VotingAppAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CandidatesController : ControllerBase
    {
        private readonly VotingDbContext _context;

        public CandidatesController(VotingDbContext context)
        {
            _context = context;
        }

        // GET: api/candidates
        [HttpGet]
        public IActionResult GetCandidates()
        {
            return Ok(_context.Candidates.ToList());
        }

        // POST: api/candidates
        [HttpPost]
        public IActionResult AddCandidate([FromBody] Candidate candidate)
        {
            if (candidate == null || string.IsNullOrWhiteSpace(candidate.Name))
                return BadRequest("Candidate name is required.");

            candidate.VoteCount = 0;
            _context.Candidates.Add(candidate);
            _context.SaveChanges();
            return Ok(candidate);
        }
    }
}
