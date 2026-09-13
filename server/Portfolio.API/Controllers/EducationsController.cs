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
    /// Retrieves educational background records wrapped in the common ApiResponse model.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<Education>>), StatusCodes.Status200OK)]
    public async Task<ActionResult<ApiResponse<IEnumerable<Education>>>> GetAll()
    {
        var educations = await _portfolioService.GetAllEducationsAsync();
        return Success(educations, "Educations retrieved successfully.");
    }
}
