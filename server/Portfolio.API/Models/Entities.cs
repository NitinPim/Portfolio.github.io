namespace Portfolio.API.Models;

public class Project
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Tagline { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = "Full Stack"; // "Full Stack", ".NET Core", "Angular & UI", "Cloud & Microservices"
    public string TechStack { get; set; } = string.Empty; // Comma separated, e.g. "Angular, .NET 10, SQL Server, Docker"
    public string? LiveUrl { get; set; }
    public string? GithubUrl { get; set; }
    public string? ImageUrl { get; set; }
    public string ArchitectureNotes { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
    public bool IsFeatured { get; set; } = true;
}

public class Experience
{
    public int Id { get; set; }
    public string Role { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Highlights { get; set; } = string.Empty; // Pipe or JSON separated achievements
    public string TechStack { get; set; } = string.Empty;
    public int Order { get; set; }
}

public class Education
{
    public int Id { get; set; }
    public string Institution { get; set; } = string.Empty;
    public string Degree { get; set; } = string.Empty;
    public string FieldOfStudy { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty;
    public string Grade { get; set; } = string.Empty;
    public string Skills { get; set; } = string.Empty;
    public int Order { get; set; }
}

public class Testimonial
{
    public int Id { get; set; }
    public string Author { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public int Rating { get; set; } = 5;
    public string AvatarInitials { get; set; } = "DEV";
}

public class ContactMessage
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public bool IsRead { get; set; } = false;
}

public class ContactDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}
