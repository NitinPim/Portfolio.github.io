using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Models;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class ProjectsController : ControllerBase
{
    private readonly IPortfolioService _portfolioService;

    public ProjectsController(IPortfolioService portfolioService)
    {
        _portfolioService = portfolioService;
    }

    /// <summary>
    /// Retrieves all showcase projects ordered by display priority.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Project>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<Project>>> GetAll()
    {
        var projects = await _portfolioService.GetAllProjectsAsync();
        return Ok(projects);
    }

    /// <summary>
    /// Retrieves a single project by its unique identifier.
    /// </summary>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(Project), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Project>> GetById(int id)
    {
        var project = await _portfolioService.GetProjectByIdAsync(id);
        if (project is null)
        {
            return NotFound(new { Message = $"Project with ID {id} not found." });
        }
        return Ok(project);
    }
}
