using System.IO.Compression;
using System.Reflection;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
using Portfolio.API.Data;
using Portfolio.API.Extensions;
using Portfolio.API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// --- Core Infrastructure & Database Context with Connection Resilience ---
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<PortfolioDbContext>(options =>
{
    options.UseSqlServer(connectionString, sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 3,
            maxRetryDelay: TimeSpan.FromSeconds(5),
            errorNumbersToAdd: null);
    });
});

// HTTP Client Factory
builder.Services.AddHttpClient();

// --- Clean OOP Architecture: Convention-Based Auto-Registration ---
builder.Services.AddAutoRegisteredServices();

// --- Web API Controllers & HTTP Response Caching ---
builder.Services.AddControllers();
builder.Services.AddResponseCaching();

// --- High-Performance Response Compression (Brotli & Gzip) ---
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
});

builder.Services.Configure<BrotliCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Optimal;
});

builder.Services.Configure<GzipCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Optimal;
});

// --- Rate Limiting Protection (.NET 10) ---
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    // Strict Limiter for Sensitive Endpoints (Contact & Chat)
    options.AddPolicy("StrictLimiter", httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "anonymous",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 15,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0
            }));

    // Global Limiter
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
        RateLimitPartition.GetSlidingWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "anonymous",
            factory: _ => new SlidingWindowRateLimiterOptions
            {
                PermitLimit = 120,
                Window = TimeSpan.FromMinutes(1),
                SegmentsPerWindow = 6,
                QueueLimit = 0
            }));
});

// --- Swagger / OpenAPI Configuration ---
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Nitin Pimpalkar - Developer Portfolio API",
        Version = "v1",
        Description = "Ultra-Optimized Enterprise RESTful Web API for Nitin Pimpalkar's portfolio. Built with ASP.NET Core (.NET 10), Clean Architecture, Generic Repository, Brotli/Gzip Compression, Rate Limiting, and Client Edge Caching.",
        Contact = new OpenApiContact
        {
            Name = "Nitin Pimpalkar",
            Email = "nitinpimpalkar17@gmail.com",
            Url = new Uri("https://github.com/NitinPim")
        }
    });

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
    {
        options.IncludeXmlComments(xmlPath);
    }
});

// --- Cross-Origin Resource Sharing (CORS) ---
builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularDevPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "http://127.0.0.1:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// --- Database Migration & Automatic Seed Verification ---
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILogger<Program>>();
    try
    {
        var context = services.GetRequiredService<PortfolioDbContext>();
        DbInitializer.Initialize(context);
        logger.LogInformation("Database initialized and verified successfully.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred while initializing the database.");
    }
}

// --- Global Exception Interception Middleware ---
app.UseGlobalExceptionHandler();

// --- Security & Performance Headers Middleware ---
app.Use(async (context, next) =>
{
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Append("X-Frame-Options", "DENY");
    context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");
    await next();
});

// --- High-Performance Response Compression ---
app.UseResponseCompression();

// --- HTTP Response Caching (Browser/Edge) ---
app.UseResponseCaching();

// --- Rate Limiter Middleware ---
app.UseRateLimiter();

// --- Swagger Middleware ---
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Nitin Pimpalkar Portfolio API v1");
    c.RoutePrefix = "swagger";
    c.DocumentTitle = "Nitin Pimpalkar Portfolio API - Swagger UI";
});

app.UseCors("AllowAll");

// --- Controller Routing ---
app.MapControllers();

app.Run();
