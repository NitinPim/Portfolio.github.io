using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Models;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[Route("api/[controller]")]
public class ExperiencesController : BaseApiController
{
    private readonly IPortfolioService _portfolioService;

    public ExperiencesController(IPortfolioService portfolioService)
    {
        _portfolioService = portfolioService;
    }

    /// <summary>
    /// Retrieves full career experience timeline with client/edge HTTP caching (5 min).
    /// </summary>
    [HttpGet]
    [ResponseCache(Duration = 300, Location = ResponseCacheLocation.Any, NoStore = false)]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<Experience>>), StatusCodes.Status200OK)]
    public async Task<ActionResult<ApiResponse<IEnumerable<Experience>>>> GetAll()
    {
        var experiences = await _portfolioService.GetAllExperiencesAsync();
        return Success(experiences, "Experiences retrieved successfully.");
    }
}
