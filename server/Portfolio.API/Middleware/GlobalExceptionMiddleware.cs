using System.Net;
using System.Text.Json;
using Portfolio.API.Models;

namespace Portfolio.API.Middleware;

public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;
    private readonly IHostEnvironment _environment;

    public GlobalExceptionMiddleware(
        RequestDelegate _next,
        ILogger<GlobalExceptionMiddleware> logger,
        IHostEnvironment environment)
    {
        this._next = _next;
        _logger = logger;
        _environment = environment;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred during request execution: {Path}", context.Request.Path);
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var errorMessage = _environment.IsDevelopment()
            ? $"Internal Server Error: {exception.Message}"
            : "An unexpected error occurred while processing your request. Please try again later.";

        var errorsList = _environment.IsDevelopment()
            ? new List<string> { exception.Message, exception.StackTrace ?? string.Empty }
            : new List<string> { "An unexpected internal server error occurred." };

        var apiResponse = ApiResponse<object>.FailureResult(
            error: errorMessage,
            statusCode: context.Response.StatusCode,
            errors: errorsList);

        var jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = false
        };

        var json = JsonSerializer.Serialize(apiResponse, jsonOptions);
        await context.Response.WriteAsync(json);
    }
}

public static class GlobalExceptionMiddlewareExtensions
{
    public static IApplicationBuilder UseGlobalExceptionHandler(this IApplicationBuilder app)
    {
        return app.UseMiddleware<GlobalExceptionMiddleware>();
    }
}
