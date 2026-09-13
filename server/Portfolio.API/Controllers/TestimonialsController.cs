using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Models;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class TestimonialsController : ControllerBase
{
    private readonly IPortfolioService _portfolioService;

    public TestimonialsController(IPortfolioService portfolioService)
    {
        _portfolioService = portfolioService;
    }

    /// <summary>
    /// Retrieves client and colleague recommendations.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Testimonial>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<Testimonial>>> GetAll()
    {
        var testimonials = await _portfolioService.GetAllTestimonialsAsync();
        return Ok(testimonials);
    }
}
