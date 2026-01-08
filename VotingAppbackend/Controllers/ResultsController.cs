using Microsoft.AspNetCore.Mvc;
using VotingAppAPI.DTOs.Responses;
using VotingAppAPI.Services.Interfaces;

namespace VotingAppAPI.Controllers
{
    [ApiController]
    [Route("api/results")]
    public class ResultsController : ControllerBase
    {
        private readonly ICandidateService _candidateService;

        public ResultsController(ICandidateService candidateService)
        {
            _candidateService = candidateService;
        }

        [HttpGet]
        public async Task<IActionResult> GetResults()
        {
            var results = await _candidateService.GetResultsAsync();

            return Ok(new ApiResponse<IEnumerable<VotingResultResponse>>
            {
                Success = true,
                Data = results
            });
        }
    }
}
