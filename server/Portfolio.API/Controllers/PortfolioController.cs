using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Models;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class PortfolioController : ControllerBase
{
    private readonly IPortfolioService _portfolioService;
    private readonly ILogger<PortfolioController> _logger;

    public PortfolioController(IPortfolioService portfolioService, ILogger<PortfolioController> logger)
    {
        _portfolioService = portfolioService;
        _logger = logger;
    }

    /// <summary>
    /// Retrieves the entire aggregate portfolio payload (developer info, projects, experiences, educations, testimonials).
    /// </summary>
    [HttpGet("all")]
    [ProducesResponseType(typeof(PortfolioAggregateDto), StatusCodes.Status200OK)]
    public async Task<ActionResult<PortfolioAggregateDto>> GetAll()
    {
        _logger.LogInformation("GET api/portfolio/all called.");
        var aggregate = await _portfolioService.GetPortfolioAggregateAsync();
        return Ok(aggregate);
    }
}
