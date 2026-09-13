using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Models;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class ExperiencesController : ControllerBase
{
    private readonly IPortfolioService _portfolioService;

    public ExperiencesController(IPortfolioService portfolioService)
    {
        _portfolioService = portfolioService;
    }

    /// <summary>
    /// Retrieves full career experience timeline ordered chronologically.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Experience>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<Experience>>> GetAll()
    {
        var experiences = await _portfolioService.GetAllExperiencesAsync();
        return Ok(experiences);
    }
}
