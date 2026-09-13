using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.Endpoints;
using Portfolio.API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// --- Core Infrastructure & Database Context ---
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<PortfolioDbContext>(options =>
    options.UseSqlServer(connectionString));

// HTTP Client Factory
builder.Services.AddHttpClient();

// --- Clean OOP Architecture: Convention-Based Auto-Registration ---
builder.Services.AddAutoRegisteredServices();

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

builder.Services.AddOpenApi();

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

// --- HTTP Request Pipeline ---
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowAll");

// --- Clean Endpoint Routing (Decoupled from Program.cs) ---
app.MapPortfolioEndpoints();

app.Run();
