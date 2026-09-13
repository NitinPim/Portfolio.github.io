namespace Portfolio.API.Models;

public abstract class BaseEntity
{
    public int Id { get; set; }
}

public class Project : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Tagline { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = "Full Stack";
    public string TechStack { get; set; } = string.Empty;
    public string? LiveUrl { get; set; }
    public string? GithubUrl { get; set; }
    public string? ImageUrl { get; set; }
    public string ArchitectureNotes { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
    public bool IsFeatured { get; set; } = true;
}

public class Experience : BaseEntity
{
    public string Role { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Highlights { get; set; } = string.Empty;
    public string TechStack { get; set; } = string.Empty;
    public int Order { get; set; }
}

public class Education : BaseEntity
{
    public string Institution { get; set; } = string.Empty;
    public string Degree { get; set; } = string.Empty;
    public string FieldOfStudy { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty;
    public string Grade { get; set; } = string.Empty;
    public string Skills { get; set; } = string.Empty;
    public int Order { get; set; }
}

public class Testimonial : BaseEntity
{
    public string Author { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public int Rating { get; set; } = 5;
    public string AvatarInitials { get; set; } = "DEV";
}

public class ContactMessage : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public bool IsRead { get; set; } = false;
}

public class DeveloperDto
{
    public string Name { get; set; } = "Nitin Pimpalkar";
    public string Title { get; set; } = "Junior Software Developer (.NET & Full Stack)";
    public string Bio { get; set; } = "Junior Software Developer specializing in scalable .NET 10 Web APIs, ASP.NET Core, SQL Server, and reactive Angular 19 architectures. Passionate about clean code, OOP design patterns, and robust software engineering.";
    public List<string> Skills { get; set; } = new()
    {
        "C#", ".NET 10", "ASP.NET Core", "Entity Framework Core",
        "Microsoft SQL Server", "REST APIs", "Angular 19", "JavaScript",
        "Software Design (OOP)", "Git & GitHub"
    };
    public string Status { get; set; } = "Junior Software Developer at ThinkerSteps Technologies Pvt. Ltd.";
    public string Location { get; set; } = "Nagpur, Maharashtra";
    public string Email { get; set; } = "nitinpimpalkar17@gmail.com";
    public string LinkedIn { get; set; } = "https://www.linkedin.com/in/nitin-pimpalkar-45a401220/";
    public string GitHub { get; set; } = "https://github.com/NitinPim";
    public string Degree { get; set; } = "BTech in Electronics & Telecommunication (RTMNU, Grade A)";
    public int CompletedProjects { get; set; } = 18;
    public string CodeCommits { get; set; } = "500+";
}

public class PortfolioAggregateDto
{
    public DeveloperDto Developer { get; set; } = new();
    public List<Project> Projects { get; set; } = new();
    public List<Experience> Experiences { get; set; } = new();
    public List<Education> Educations { get; set; } = new();
    public List<Testimonial> Testimonials { get; set; } = new();
}

public class ContactDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}

public class ContactResponseDto
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
}
