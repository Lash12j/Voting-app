using Microsoft.AspNetCore.Mvc;
using VotingAppAPI.DTOs.Requests;
using VotingAppAPI.DTOs.Responses;
using VotingAppAPI.Services.Interfaces;

namespace VotingAppAPI.Controllers
{
    [ApiController]
    [Route("api/candidates")]
    public class CandidatesController : ControllerBase
    {
        private readonly ICandidateService _candidateService;

        public CandidatesController(ICandidateService candidateService)
        {
            _candidateService = candidateService;
        }

       
        [HttpGet]
        public async Task<IActionResult> GetCandidates()
        {
            var candidates = await _candidateService.GetAllCandidatesAsync();

            return Ok(new ApiResponse<object>
            {
                Success = true,
                Data = candidates
            });
        }

       
        [HttpPost]
        public async Task<IActionResult> AddCandidate([FromBody] CreateCandidateRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Name))
            {
                return BadRequest(new ApiResponse<string>
                {
                    Success = false,
                    Message = "Candidate name is required"
                });
            }

            await _candidateService.AddCandidateAsync(request.Name);

            return Ok(new ApiResponse<string>
            {
                Success = true,
                Message = "Candidate added successfully"
            });
        }
    }
}
