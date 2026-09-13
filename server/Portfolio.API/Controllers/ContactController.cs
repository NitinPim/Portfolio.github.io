using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Models;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[Route("api/[controller]")]
public class ContactController : BaseApiController
{
    private readonly IPortfolioService _portfolioService;

    public ContactController(IPortfolioService portfolioService)
    {
        _portfolioService = portfolioService;
    }

    /// <summary>
    /// Submits a new contact message and returns the standardized ApiResponse.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<ContactResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<ContactResponseDto>), StatusCodes.Status400BadRequest)]
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
