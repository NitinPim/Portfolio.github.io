using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Portfolio.API.Models;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[Route("api/[controller]")]
[EnableRateLimiting("StrictLimiter")]
public class ChatController : BaseApiController
{
    private readonly IChatService _chatService;

    public ChatController(IChatService chatService)
    {
        _chatService = chatService;
    }

    /// <summary>
    /// Processes queries to the AI assistant, protected by strict rate limiting.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<ChatResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<ChatResponseDto>), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status429TooManyRequests)]
    public async Task<ActionResult<ApiResponse<ChatResponseDto>>> ProcessMessage([FromBody] ChatRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request?.Message))
        {
            return Failure<ChatResponseDto>("Please enter a message.", StatusCodes.Status400BadRequest);
        }

        var response = await _chatService.ProcessChatAsync(request);
        return Success(response, "Chat message processed successfully.");
    }
}
