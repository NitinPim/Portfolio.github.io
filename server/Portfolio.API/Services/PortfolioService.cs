using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data.UnitOfWork;
using Portfolio.API.Models;

namespace Portfolio.API.Services;

public class PortfolioService : IPortfolioService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IEmailService _emailService;
    private readonly ILogger<PortfolioService> _logger;

    public PortfolioService(
        IUnitOfWork unitOfWork,
        IEmailService emailService,
        ILogger<PortfolioService> logger)
    {
        _unitOfWork = unitOfWork;
        _emailService = emailService;
        _logger = logger;
    }

    public DeveloperDto GetDeveloperProfile()
    {
        return new DeveloperDto();
    }

    public async Task<PortfolioAggregateDto> GetPortfolioAggregateAsync()
    {
        _logger.LogInformation("Retrieving full portfolio aggregate data via Unit of Work.");

        var projects = await _unitOfWork.Repository<Project>()
            .Query()
            .OrderBy(p => p.DisplayOrder)
            .ToListAsync();

        var experiences = await _unitOfWork.Repository<Experience>()
            .Query()
            .OrderBy(e => e.Order)
            .ToListAsync();

        var educations = await _unitOfWork.Repository<Education>()
            .Query()
            .OrderBy(e => e.Order)
            .ToListAsync();

        var testimonials = (await _unitOfWork.Repository<Testimonial>().GetAllAsync()).ToList();

        return new PortfolioAggregateDto
        {
            Developer = GetDeveloperProfile(),
            Projects = projects,
            Experiences = experiences,
            Educations = educations,
            Testimonials = testimonials
        };
    }

    public async Task<IEnumerable<Project>> GetAllProjectsAsync()
    {
        return await _unitOfWork.Repository<Project>()
            .Query()
            .OrderBy(p => p.DisplayOrder)
            .ToListAsync();
    }

    public async Task<Project?> GetProjectByIdAsync(int id)
    {
        return await _unitOfWork.Repository<Project>().GetByIdAsync(id);
    }

    public async Task<IEnumerable<Experience>> GetAllExperiencesAsync()
    {
        return await _unitOfWork.Repository<Experience>()
            .Query()
            .OrderBy(e => e.Order)
            .ToListAsync();
    }

    public async Task<IEnumerable<Education>> GetAllEducationsAsync()
    {
        return await _unitOfWork.Repository<Education>()
            .Query()
            .OrderBy(e => e.Order)
            .ToListAsync();
    }

    public async Task<IEnumerable<Testimonial>> GetAllTestimonialsAsync()
    {
        return await _unitOfWork.Repository<Testimonial>().GetAllAsync();
    }

    public async Task<ContactResponseDto> SubmitContactMessageAsync(ContactDto contactDto)
    {
        if (string.IsNullOrWhiteSpace(contactDto.Name) ||
            string.IsNullOrWhiteSpace(contactDto.Email) ||
            string.IsNullOrWhiteSpace(contactDto.Message))
        {
            return new ContactResponseDto
            {
                Success = false,
                Message = "Please complete all required fields (Name, Email, and Message)."
            };
        }

        var contactEntity = new ContactMessage
        {
            Name = contactDto.Name.Trim(),
            Email = contactDto.Email.Trim(),
            Subject = string.IsNullOrWhiteSpace(contactDto.Subject) ? "Portfolio Contact Inquiry" : contactDto.Subject.Trim(),
            Message = contactDto.Message.Trim(),
            CreatedAtUtc = DateTime.UtcNow,
            IsRead = false
        };

        await _unitOfWork.Repository<ContactMessage>().AddAsync(contactEntity);
        await _unitOfWork.CompleteAsync();

        _logger.LogInformation("Contact message stored successfully with Id {Id}.", contactEntity.Id);

        // Send Email notification asynchronously
        _ = Task.Run(async () =>
        {
            try
            {
                await _emailService.SendContactNotificationAsync(
                    contactEntity.Name,
                    contactEntity.Email,
                    contactEntity.Subject,
                    contactEntity.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Background email dispatch failed for Contact ID {Id}", contactEntity.Id);
            }
        });

        return new ContactResponseDto
        {
            Success = true,
            Message = "Thank you! Your message has been received and securely stored. An email notification has also been sent to Nitin."
        };
    }
}
