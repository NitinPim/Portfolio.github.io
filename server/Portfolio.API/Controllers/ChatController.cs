using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class ChatController : ControllerBase
{
    private readonly IChatService _chatService;

    public ChatController(IChatService chatService)
    {
        _chatService = chatService;
    }

    /// <summary>
    /// Processes queries to the interactive portfolio AI assistant.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ChatResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ChatResponseDto>> ProcessMessage([FromBody] ChatRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request?.Message))
        {
            return BadRequest(new { Reply = "Please enter a message." });
        }

        var response = await _chatService.ProcessChatAsync(request);
        return Ok(response);
    }
}
