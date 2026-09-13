using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Models;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[Route("api/[controller]")]
public class ProjectsController : BaseApiController
{
    private readonly IPortfolioService _portfolioService;

    public ProjectsController(IPortfolioService portfolioService)
    {
        _portfolioService = portfolioService;
    }

    /// <summary>
    /// Retrieves all showcase projects with client/edge HTTP caching (5 min).
    /// </summary>
    [HttpGet]
    [ResponseCache(Duration = 300, Location = ResponseCacheLocation.Any, NoStore = false)]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<Project>>), StatusCodes.Status200OK)]
    public async Task<ActionResult<ApiResponse<IEnumerable<Project>>>> GetAll()
    {
        var projects = await _portfolioService.GetAllProjectsAsync();
        return Success(projects, "Projects retrieved successfully.");
    }

    /// <summary>
    /// Retrieves a single project by its unique identifier with client/edge HTTP caching (5 min).
    /// </summary>
    [HttpGet("{id:int}")]
    [ResponseCache(Duration = 300, Location = ResponseCacheLocation.Any, NoStore = false)]
    [ProducesResponseType(typeof(ApiResponse<Project>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<Project>), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ApiResponse<Project>>> GetById(int id)
    {
        var project = await _portfolioService.GetProjectByIdAsync(id);
        if (project is null)
        {
            return Failure<Project>($"Project with ID {id} was not found.", StatusCodes.Status404NotFound);
        }
        return Success(project, "Project retrieved successfully.");
    }
}
