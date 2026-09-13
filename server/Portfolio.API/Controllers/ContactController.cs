using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Models;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class ContactController : ControllerBase
{
    private readonly IPortfolioService _portfolioService;

    public ContactController(IPortfolioService portfolioService)
    {
        _portfolioService = portfolioService;
    }

    /// <summary>
    /// Submits a new contact form message, persists it to SQL Server, and triggers email dispatch.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ContactResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ContactResponseDto), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ContactResponseDto>> Submit([FromBody] ContactDto contactDto)
    {
        var result = await _portfolioService.SubmitContactMessageAsync(contactDto);
        if (!result.Success)
        {
            return BadRequest(result);
        }
        return Ok(result);
    }
}
