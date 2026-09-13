using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Models;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[Route("api/[controller]")]
public class ChatController : BaseApiController
{
    private readonly IChatService _chatService;

    public ChatController(IChatService chatService)
    {
        _chatService = chatService;
    }

    /// <summary>
    /// Processes inquiries to the interactive AI assistant wrapped in the common ApiResponse model.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<ChatResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<ChatResponseDto>), StatusCodes.Status400BadRequest)]
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
