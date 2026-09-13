using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
using Portfolio.API.Data;
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

// --- Web API Controllers ---
builder.Services.AddControllers();

// --- Swagger / OpenAPI Configuration ---
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Nitin Pimpalkar - Developer Portfolio API",
        Version = "v1",
        Description = "Enterprise RESTful Web API for Nitin Pimpalkar's developer portfolio. Built with ASP.NET Core (.NET 10), Clean OOP Architecture, Generic Repository Pattern, and Unit of Work.",
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

// --- Swagger Middleware (Active in both Development & Production for API exploration) ---
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
