using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Models;

namespace Portfolio.API.Controllers;

[ApiController]
[Produces("application/json")]
public abstract class BaseApiController : ControllerBase
{
    protected ActionResult<ApiResponse<T>> Success<T>(T data, string? message = null, int statusCode = StatusCodes.Status200OK)
    {
        return StatusCode(statusCode, ApiResponse<T>.SuccessResult(data, message, statusCode));
    }

    protected ActionResult<ApiResponse<T>> Failure<T>(string error, int statusCode = StatusCodes.Status400BadRequest, List<string>? errors = null)
    {
        return StatusCode(statusCode, ApiResponse<T>.FailureResult(error, statusCode, errors));
    }

    protected ActionResult<ApiResponse> Success(string? message = null, int statusCode = StatusCodes.Status200OK)
    {
        return StatusCode(statusCode, ApiResponse.Success(message, statusCode));
    }

    protected ActionResult<ApiResponse> Failure(string error, int statusCode = StatusCodes.Status400BadRequest, List<string>? errors = null)
    {
        return StatusCode(statusCode, ApiResponse.Failure(error, statusCode, errors));
    }
}
