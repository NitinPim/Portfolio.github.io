using Portfolio.API.Models;
using Portfolio.API.Services;

namespace Portfolio.API.Endpoints;

public static class PortfolioEndpoints
{
    public static IEndpointRouteBuilder MapPortfolioEndpoints(this IEndpointRouteBuilder app)
    {
        var api = app.MapGroup("/api");

        // Portfolio Aggregate
        api.MapGet("/portfolio/all", async (IPortfolioService service) =>
        {
            var data = await service.GetPortfolioAggregateAsync();
            return Results.Ok(data);
        })
        .WithName("GetPortfolioAggregate")
        .WithSummary("Retrieve all portfolio data in a single optimized payload.");

        // Projects
        api.MapGet("/projects", async (IPortfolioService service) =>
        {
            var projects = await service.GetAllProjectsAsync();
            return Results.Ok(projects);
        })
        .WithName("GetAllProjects");

        api.MapGet("/projects/{id:int}", async (int id, IPortfolioService service) =>
        {
            var project = await service.GetProjectByIdAsync(id);
            return project is not null ? Results.Ok(project) : Results.NotFound(new { Message = $"Project with ID {id} not found." });
        })
        .WithName("GetProjectById");

        // Experiences
        api.MapGet("/experiences", async (IPortfolioService service) =>
        {
            var experiences = await service.GetAllExperiencesAsync();
            return Results.Ok(experiences);
        })
        .WithName("GetAllExperiences");

        // Educations
        api.MapGet("/educations", async (IPortfolioService service) =>
        {
            var educations = await service.GetAllEducationsAsync();
            return Results.Ok(educations);
        })
        .WithName("GetAllEducations");

        // Testimonials
        api.MapGet("/testimonials", async (IPortfolioService service) =>
        {
            var testimonials = await service.GetAllTestimonialsAsync();
            return Results.Ok(testimonials);
        })
        .WithName("GetAllTestimonials");

        // Contact
        api.MapPost("/contact", async (ContactDto contactDto, IPortfolioService service) =>
        {
            var result = await service.SubmitContactMessageAsync(contactDto);
            return result.Success ? Results.Ok(result) : Results.BadRequest(result);
        })
        .WithName("SubmitContact");

        // Chatbot
        api.MapPost("/chat", async (ChatRequestDto req, IChatService chatService) =>
        {
            if (string.IsNullOrWhiteSpace(req.Message))
            {
                return Results.BadRequest(new { Reply = "Please enter a message." });
            }

            var response = await chatService.ProcessChatAsync(req);
            return Results.Ok(response);
        })
        .WithName("ChatWithAI");

        return app;
    }
}
