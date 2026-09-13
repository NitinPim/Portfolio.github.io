using System.Text.Json.Serialization;

namespace Portfolio.API.Models;

/// <summary>
/// Universal standard API response envelope across all endpoints.
/// </summary>
/// <typeparam name="T">The payload data type.</typeparam>
public class ApiResponse<T>
{
    /// <summary>
    /// HTTP status code of the response (e.g., 200, 201, 400, 404, 500).
    /// </summary>
    [JsonPropertyName("statusCode")]
    public int StatusCode { get; set; } = 200;

    /// <summary>
    /// Indicates whether the request succeeded.
    /// </summary>
    [JsonPropertyName("isSuccess")]
    public bool IsSuccess { get; set; } = true;

    /// <summary>
    /// User-friendly message explaining the outcome.
    /// </summary>
    [JsonPropertyName("message")]
    public string? Message { get; set; }

    /// <summary>
    /// The primary payload data returned by the API.
    /// </summary>
    [JsonPropertyName("response")]
    public T? Response { get; set; }

    /// <summary>
    /// Convenient alias for clients reading "data".
    /// </summary>
    [JsonPropertyName("data")]
    public T? Data => Response;

    /// <summary>
    /// Error message if the request failed; otherwise null.
    /// </summary>
    [JsonPropertyName("error")]
    public string? Error { get; set; }

    /// <summary>
    /// Detailed validation or system errors list if applicable.
    /// </summary>
    [JsonPropertyName("errors")]
    public List<string>? Errors { get; set; }

    /// <summary>
    /// Server UTC timestamp of the response generation.
    /// </summary>
    [JsonPropertyName("timestamp")]
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    public static ApiResponse<T> SuccessResult(T data, string? message = null, int statusCode = 200)
    {
        return new ApiResponse<T>
        {
            StatusCode = statusCode,
            IsSuccess = true,
            Message = message ?? "Request completed successfully.",
            Response = data,
            Error = null,
            Errors = null,
            Timestamp = DateTime.UtcNow
        };
    }

    public static ApiResponse<T> FailureResult(string error, int statusCode = 400, List<string>? errors = null)
    {
        return new ApiResponse<T>
        {
            StatusCode = statusCode,
            IsSuccess = false,
            Message = error,
            Response = default,
            Error = error,
            Errors = errors ?? new List<string> { error },
            Timestamp = DateTime.UtcNow
        };
    }
}

/// <summary>
/// Non-generic standard API response for endpoints that do not return a specific object payload.
/// </summary>
public class ApiResponse : ApiResponse<object>
{
    public static ApiResponse Success(string? message = null, int statusCode = 200)
    {
        return new ApiResponse
        {
            StatusCode = statusCode,
            IsSuccess = true,
            Message = message ?? "Request completed successfully.",
            Response = null,
            Error = null,
            Errors = null,
            Timestamp = DateTime.UtcNow
        };
    }

    public static ApiResponse Failure(string error, int statusCode = 400, List<string>? errors = null)
    {
        return new ApiResponse
        {
            StatusCode = statusCode,
            IsSuccess = false,
            Message = error,
            Response = null,
            Error = error,
            Errors = errors ?? new List<string> { error },
            Timestamp = DateTime.UtcNow
        };
    }
}
