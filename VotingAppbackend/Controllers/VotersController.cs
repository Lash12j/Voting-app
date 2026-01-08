using Microsoft.AspNetCore.Mvc;
using VotingAppAPI.DTOs.Requests;
using VotingAppAPI.DTOs.Responses;
using VotingAppAPI.Services.Interfaces;

namespace VotingAppAPI.Controllers
{
    [ApiController]
    [Route("api/voters")]
    public class VotersController : ControllerBase
    {
        private readonly IVoterService _voterService;

        public VotersController(IVoterService voterService)
        {
            _voterService = voterService;
        }

        [HttpPost]
        public async Task<IActionResult> AddVoter([FromBody] CreateVoterRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Name))
            {
                return BadRequest(new ApiResponse<string>
                {
                    Success = false,
                    Message = "Voter name is required"
                });
            }

            await _voterService.AddVoterAsync(request.Name);

            return Ok(new ApiResponse<string>
            {
                Success = true,
                Message = "Voter added successfully"
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetVoters()
        {
            var voters = await _voterService.GetVotersAsync();

            return Ok(new ApiResponse<IEnumerable<object>>
            {
                Success = true,
                Data = voters.Select(v => new
                {
                    v.Id,
                    v.Name,
                    v.HasVoted
                })
            });
        }
    }
}
