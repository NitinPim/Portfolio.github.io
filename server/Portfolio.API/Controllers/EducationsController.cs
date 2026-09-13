using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Models;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class EducationsController : ControllerBase
{
    private readonly IPortfolioService _portfolioService;

    public EducationsController(IPortfolioService portfolioService)
    {
        _portfolioService = portfolioService;
    }

    /// <summary>
    /// Retrieves educational background records.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Education>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<Education>>> GetAll()
    {
        var educations = await _portfolioService.GetAllEducationsAsync();
        return Ok(educations);
    }
}
