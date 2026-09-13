using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Models;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[Route("api/[controller]")]
public class EducationsController : BaseApiController
{
    private readonly IPortfolioService _portfolioService;

    public EducationsController(IPortfolioService portfolioService)
    {
        _portfolioService = portfolioService;
    }

    /// <summary>
    /// Retrieves educational background records with client/edge HTTP caching (5 min).
    /// </summary>
    [HttpGet]
    [ResponseCache(Duration = 300, Location = ResponseCacheLocation.Any, NoStore = false)]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<Education>>), StatusCodes.Status200OK)]
    public async Task<ActionResult<ApiResponse<IEnumerable<Education>>>> GetAll()
    {
        var educations = await _portfolioService.GetAllEducationsAsync();
        return Success(educations, "Educations retrieved successfully.");
    }
}
