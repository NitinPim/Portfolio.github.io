using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Models;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[Route("api/[controller]")]
public class PortfolioController : BaseApiController
{
    private readonly IPortfolioService _portfolioService;
    private readonly ILogger<PortfolioController> _logger;

    public PortfolioController(IPortfolioService portfolioService, ILogger<PortfolioController> logger)
    {
        _portfolioService = portfolioService;
        _logger = logger;
    }

    /// <summary>
    /// Retrieves the entire aggregate portfolio payload with client/edge HTTP caching (5 min).
    /// </summary>
    [HttpGet("all")]
    [ResponseCache(Duration = 300, Location = ResponseCacheLocation.Any, NoStore = false)]
    [ProducesResponseType(typeof(ApiResponse<PortfolioAggregateDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<ApiResponse<PortfolioAggregateDto>>> GetAll()
    {
        _logger.LogInformation("GET api/portfolio/all called.");
        var aggregate = await _portfolioService.GetPortfolioAggregateAsync();
        return Success(aggregate, "Portfolio aggregate data retrieved successfully.");
    }
}
