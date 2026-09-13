using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Portfolio.API.Models;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[Route("api/[controller]")]
[EnableRateLimiting("StrictLimiter")]
public class ContactController : BaseApiController
{
    private readonly IPortfolioService _portfolioService;

    public ContactController(IPortfolioService portfolioService)
    {
        _portfolioService = portfolioService;
    }

    /// <summary>
    /// Submits a new contact message, protected by strict rate limiting.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<ContactResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<ContactResponseDto>), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status429TooManyRequests)]
    public async Task<ActionResult<ApiResponse<ContactResponseDto>>> Submit([FromBody] ContactDto contactDto)
    {
        var result = await _portfolioService.SubmitContactMessageAsync(contactDto);
        if (!result.Success)
        {
            return Failure<ContactResponseDto>(result.Message, StatusCodes.Status400BadRequest);
        }
        return Success(result, result.Message);
    }
}
