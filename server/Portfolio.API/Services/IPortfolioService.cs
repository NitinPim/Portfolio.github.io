using Portfolio.API.Models;

namespace Portfolio.API.Services;

public interface IPortfolioService
{
    Task<PortfolioAggregateDto> GetPortfolioAggregateAsync();
    Task<IEnumerable<Project>> GetAllProjectsAsync();
    Task<Project?> GetProjectByIdAsync(int id);
    Task<IEnumerable<Experience>> GetAllExperiencesAsync();
    Task<IEnumerable<Education>> GetAllEducationsAsync();
    Task<IEnumerable<Testimonial>> GetAllTestimonialsAsync();
    Task<ContactResponseDto> SubmitContactMessageAsync(ContactDto contactDto);
    DeveloperDto GetDeveloperProfile();
}
