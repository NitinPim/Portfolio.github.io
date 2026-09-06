using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.Models;
using Portfolio.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add Database Context
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<PortfolioDbContext>(options =>
    options.UseSqlServer(connectionString));

// Add HTTP Client for External AI APIs
builder.Services.AddHttpClient();

// Add Email Service
builder.Services.AddScoped<IEmailService, EmailService>();

// Add AI Chatbot Service
builder.Services.AddScoped<IChatService, ChatService>();

// Configure CORS for Angular Frontend
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

// Ensure DB is initialized and seeded
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

// Configure HTTP Pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowAll");

// --- API Endpoints ---

// Aggregate endpoint for ultra-fast single request frontend initialization
app.MapGet("/api/portfolio/all", async (PortfolioDbContext db) =>
{
    var projects = await db.Projects.OrderBy(p => p.DisplayOrder).ToListAsync();
    var experiences = await db.Experiences.OrderBy(e => e.Order).ToListAsync();
    var educations = await db.Educations.OrderBy(e => e.Order).ToListAsync();
    var testimonials = await db.Testimonials.ToListAsync();

    return Results.Ok(new
    {
        Developer = new
        {
            Name = "Nitin Pimpalkar",
            Title = "C# | ASP.NET Core | SQL Server | GitHub | BTech'24",
            Headline = "Software Developer specializing in C#, ASP.NET Core, SQL Server, and Modern Web Applications",
            Specialties = new[] { "C#", "ASP.NET Core", "Entity Framework Core", "Microsoft SQL Server", "REST APIs", "Angular 19", "JavaScript", "Software Design (OOP)", "Git & GitHub" },
            Status = "Junior Software Developer at ThinkerSteps Technologies",
            Location = "Nagpur, Maharashtra, India",
            Email = "nitinpimpalkar17@gmail.com",
            LinkedIn = "https://www.linkedin.com/in/nitin-pimpalkar-45a401220/",
            GitHub = "https://github.com/NitinPim",
            Degree = "BTech in Electronics & Telecommunication (RTMNU, Grade A)",
            CompletedProjects = 15,
            CodeCommits = "500+"
        },
        Projects = projects,
        Experiences = experiences,
        Educations = educations,
        Testimonials = testimonials
    });
})
.WithName("GetAllPortfolioData");

// Educations endpoint
app.MapGet("/api/educations", async (PortfolioDbContext db) =>
{
    var list = await db.Educations.OrderBy(e => e.Order).ToListAsync();
    return Results.Ok(list);
})
.WithName("GetEducations");

// Projects endpoint
app.MapGet("/api/projects", async (PortfolioDbContext db) =>
{
    var list = await db.Projects.OrderBy(p => p.DisplayOrder).ToListAsync();
    return Results.Ok(list);
})
.WithName("GetProjects");

// Experiences endpoint
app.MapGet("/api/experiences", async (PortfolioDbContext db) =>
{
    var list = await db.Experiences.OrderBy(e => e.Order).ToListAsync();
    return Results.Ok(list);
})
.WithName("GetExperiences");

// Testimonials endpoint
app.MapGet("/api/testimonials", async (PortfolioDbContext db) =>
{
    var list = await db.Testimonials.ToListAsync();
    return Results.Ok(list);
})
.WithName("GetTestimonials");

// Contact Message submission endpoint
app.MapPost("/api/contact", async (ContactDto dto, PortfolioDbContext db, IEmailService emailService) =>
{
    if (string.IsNullOrWhiteSpace(dto.Name) || string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Message))
    {
        return Results.BadRequest(new { success = false, message = "Name, Email, and Message are required fields." });
    }

    var message = new ContactMessage
    {
        Name = dto.Name.Trim(),
        Email = dto.Email.Trim(),
        Subject = string.IsNullOrWhiteSpace(dto.Subject) ? "Portfolio Contact Submission" : dto.Subject.Trim(),
        Message = dto.Message.Trim(),
        CreatedAtUtc = DateTime.UtcNow
    };

    db.ContactMessages.Add(message);
    await db.SaveChangesAsync();

    // Send email notification asynchronously
    _ = Task.Run(async () =>
    {
        await emailService.SendContactNotificationAsync(message.Name, message.Email, message.Subject, message.Message);
    });

    return Results.Ok(new
    {
        success = true,
        message = "Thank you! Your message has been received and securely stored. An email notification has also been sent to Nitin.",
        id = message.Id
    });
})
.WithName("SubmitContactMessage");

// AI Chatbot query endpoint
app.MapPost("/api/chat", async (ChatRequestDto req, IChatService chatService) =>
{
    var result = await chatService.ProcessChatAsync(req);
    return Results.Ok(result);
})
.WithName("ProcessChatMessage");

app.Run();
