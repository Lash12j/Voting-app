using Microsoft.AspNetCore.Mvc;
using VotingAppAPI.Models;

namespace VotingAppAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VotersController : ControllerBase
    {
        private readonly VotingDbContext _context;

        public VotersController(VotingDbContext context)
        {
            _context = context;
        }

        // GET: api/voters
        [HttpGet]
        public IActionResult GetVoters()
        {
            return Ok(_context.Voters.ToList());
        }

        // POST: api/voters
        [HttpPost]
        public IActionResult AddVoter([FromBody] Voter voter)
        {
            if (voter == null || string.IsNullOrWhiteSpace(voter.Name))
                return BadRequest("Voter name is required.");

            voter.HasVoted = false;
            _context.Voters.Add(voter);
            _context.SaveChanges();
            return Ok(voter);
        }
    }
}
