using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Models;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[Route("api/[controller]")]
public class TestimonialsController : BaseApiController
{
    private readonly IPortfolioService _portfolioService;

    public TestimonialsController(IPortfolioService portfolioService)
    {
        _portfolioService = portfolioService;
    }

    /// <summary>
    /// Retrieves client and colleague recommendations wrapped in the common ApiResponse model.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<Testimonial>>), StatusCodes.Status200OK)]
    public async Task<ActionResult<ApiResponse<IEnumerable<Testimonial>>>> GetAll()
    {
        var testimonials = await _portfolioService.GetAllTestimonialsAsync();
        return Success(testimonials, "Testimonials retrieved successfully.");
    }
}
