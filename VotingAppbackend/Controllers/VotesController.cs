using Microsoft.AspNetCore.Mvc;
using VotingAppAPI.DTOs.Requests;
using VotingAppAPI.DTOs.Responses;
using VotingAppAPI.Services.Interfaces;

namespace VotingAppAPI.Controllers
{
    [ApiController]
    [Route("api/votes")]
    public class VotesController : ControllerBase
    {
        private readonly IVoteService _service;

        public VotesController(IVoteService service) => _service = service;

        [HttpPost]
        public async Task<IActionResult> Vote(CastVoteRequest request)
        {
            await _service.CastVoteAsync(request.VoterId, request.CandidateId);
            return Ok(new ApiResponse<string>
            {
                Success = true,
                Message = "Vote cast successfully"
            });
        }
    }
}
