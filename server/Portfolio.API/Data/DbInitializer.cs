using Microsoft.EntityFrameworkCore;
using Portfolio.API.Models;

namespace Portfolio.API.Data;

public static class DbInitializer
{
    public static void Initialize(PortfolioDbContext context)
    {
        // Automatically ensure DB exists in SQL Server
        context.Database.EnsureCreated();

        // Ensure Educations table exists if adding to existing DB
        context.Database.ExecuteSqlRaw(@"
        IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Educations')
        BEGIN
            CREATE TABLE [Educations] (
                [Id] int NOT NULL IDENTITY,
                [Institution] nvarchar(max) NOT NULL,
                [Degree] nvarchar(max) NOT NULL,
                [FieldOfStudy] nvarchar(max) NOT NULL,
                [Period] nvarchar(max) NOT NULL,
                [Grade] nvarchar(max) NOT NULL,
                [Skills] nvarchar(max) NOT NULL,
                [Order] int NOT NULL,
                CONSTRAINT [PK_Educations] PRIMARY KEY ([Id])
            );
        END
        ");

        if (!context.Experiences.Any())
        {
            var experiences = new List<Experience>
            {
                new Experience
                {
                    Role = "Junior Software Developer",
                    Company = "ThinkerSteps Technologies Pvt. Ltd. • Full-time",
                    Location = "Nagpur, Maharashtra, India • On-site",
                    Period = "Jul 2026 - Present",
                    Description = "Developing and maintaining scalable enterprise solutions using ASP.NET Core, C#, and SQL Server. Designing RESTful Web APIs, optimizing database operations with Entity Framework Core, and building responsive client modules.",
                    Highlights = "Building robust REST APIs with ASP.NET Core and Entity Framework Core|Optimizing Microsoft SQL Server relational schema, stored procedures, and queries|Integrating clean software design principles and OOP paradigms into enterprise applications",
                    TechStack = "C#, ASP.NET Core, SQL Server, Entity Framework Core, REST APIs, Git, GitHub",
                    Order = 1
                },
                new Experience
                {
                    Role = "Trainee (Apprenticeship)",
                    Company = "TheThiinker",
                    Location = "Nagpur, Maharashtra, India • On-site",
                    Period = "Jul 2025 - Jun 2026 (1 yr)",
                    Description = "Worked on full-stack .NET web applications, database schema designs, and frontend integration using modern web standards and object-oriented programming.",
                    Highlights = "Engineered core backend modules using .NET Framework and ASP.NET Core|Implemented database migrations and relationship mappings with Entity Framework|Developed dynamic web UI interfaces using JavaScript, CSS3, and Bootstrap",
                    TechStack = "ASP.NET, .NET Core, SQL Server, Entity Framework, JavaScript, HTML5/CSS3, Bootstrap",
                    Order = 2
                },
                new Experience
                {
                    Role = "Dotnet Developer (Internship)",
                    Company = "TheThiinker",
                    Location = "Nagpur, Maharashtra, India • On-site",
                    Period = "Jan 2025 - Jun 2025 (6 mos)",
                    Description = "Hands-on development of .NET components, REST API endpoints, control systems logic, and database queries in an agile collaborative team.",
                    Highlights = "Developed scalable REST API endpoints and data access layers with Entity Framework|Implemented OOP design patterns and clean code standards|Utilized Git and GitHub for team version control and sprint task tracking",
                    TechStack = "C#, .NET, Microsoft SQL Server, REST APIs, Software Design, OOP, Git",
                    Order = 3
                }
            };
            context.Experiences.AddRange(experiences);
        }

        if (!context.Educations.Any())
        {
            var educations = new List<Education>
            {
                new Education
                {
                    Institution = "Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)",
                    Degree = "Bachelor of Technology - BTech",
                    FieldOfStudy = "Electronic and Telecommunication",
                    Period = "Sep 2021 - Sep 2024",
                    Grade = "Grade: A",
                    Skills = "Software Engineering, Control Systems, Relational Databases, Algorithms",
                    Order = 1
                },
                new Education
                {
                    Institution = "Priyadarshini College of Engineering Nagpur",
                    Degree = "B.Tech Engineering Coursework",
                    FieldOfStudy = "Electronics and Telecommunication Engineering",
                    Period = "Dec 2021 - May 2024",
                    Grade = "Engineering Graduate",
                    Skills = "HTML, Cascading Style Sheets (CSS), C#, ASP.NET",
                    Order = 2
                },
                new Education
                {
                    Institution = "NIT Polytechnic Nagpur",
                    Degree = "Diploma of Education",
                    FieldOfStudy = "Electronics and Telecommunication",
                    Period = "Jun 2019 - Aug 2021",
                    Grade = "Grade: A+",
                    Skills = "HTML, CSS, Programming Fundamentals, Electronics",
                    Order = 3
                }
            };
            context.Educations.AddRange(educations);
        }

        // Re-seed Projects if placeholder projects exist or if table is empty
        if (!context.Projects.Any() || context.Projects.Any(p => p.Title.Contains("ApexCommerce") || p.Title.Contains("QuantumPulse")))
        {
            var oldProjects = context.Projects.ToList();
            if (oldProjects.Any())
            {
                context.Projects.RemoveRange(oldProjects);
                context.SaveChanges();
            }

            var projects = new List<Project>
            {
                new Project
                {
                    Title = ".NET Core Enterprise Web API",
                    Tagline = "High-Performance RESTful Backend Engine with C# & SQL Server",
                    Description = "Scalable backend RESTful Web API built with C#, ASP.NET Core, and Entity Framework Core. Features repository architecture, secure CRUD endpoints, MS SQL Server relational database integration, and Swagger documentation.",
                    Category = ".NET Core / Backend",
                    TechStack = "C#, ASP.NET Core, Entity Framework Core, SQL Server, RESTful APIs, Swagger",
                    ArchitectureNotes = "Clean Architecture design with Repository Pattern, dependency injection, and optimized EF Core query mappings.",
                    LiveUrl = "https://github.com/NitinPim/Project.NetCoreWebApi",
                    GithubUrl = "https://github.com/NitinPim/Project.NetCoreWebApi",
                    ImageUrl = "assets/projects/project1.png",
                    DisplayOrder = 1,
                    IsFeatured = true
                },
                new Project
                {
                    Title = "JobBoard Career & Recruitment Portal",
                    Tagline = "Responsive Job Search, Filtering & Application Platform",
                    Description = "Dynamic employment portal that empowers job seekers to search, filter openings by technology/location, examine role criteria, and apply seamlessly with modern responsive interface design.",
                    Category = "Web Application",
                    TechStack = "JavaScript, HTML5, CSS3, Responsive Design, Git",
                    ArchitectureNotes = "Modular front-end architecture, mobile-first responsive layout, and cross-browser optimized DOM interactions.",
                    LiveUrl = "https://nitinpim.github.io/JobBoard.github.io/",
                    GithubUrl = "https://github.com/NitinPim/JobBoard.github.io",
                    ImageUrl = "assets/projects/project2.png",
                    DisplayOrder = 2,
                    IsFeatured = true
                },
                new Project
                {
                    Title = "Online Quiz Maker & Evaluator",
                    Tagline = "Interactive Educational Assessment & Dynamic Scoring System",
                    Description = "Interactive web application featuring custom quiz generation, timed question navigation, automatic score computation, and real-time result analysis.",
                    Category = "Interactive Web App",
                    TechStack = "JavaScript, HTML5, CSS3, DOM Manipulation, LocalStorage",
                    ArchitectureNotes = "Stateful quiz evaluation engine with dynamic timer countdown, client-side score tracking, and instant answer verification.",
                    LiveUrl = "https://nitinpim.github.io/OnlineQuizMaker.github.io/",
                    GithubUrl = "https://github.com/NitinPim/OnlineQuizMaker.github.io",
                    ImageUrl = "assets/projects/project4.png",
                    DisplayOrder = 4,
                    IsFeatured = true
                },
                new Project
                {
                    Title = "Food Express & Pizza Delivery",
                    Tagline = "Interactive Online Food Ordering & Cart Management Portal",
                    Description = "Responsive food delivery web application featuring category browsing, dynamic shopping cart calculation, customizable toppings, and order summary checkout.",
                    Category = "Web Application",
                    TechStack = "JavaScript, HTML5, CSS3, Cart State Engine",
                    ArchitectureNotes = "Reactive cart state handling, dynamic pricing calculation, and clean UX feedback loops.",
                    LiveUrl = "https://nitinpim.github.io/PizzaDeliveryWebsite.github.io/",
                    GithubUrl = "https://github.com/NitinPim/PizzaDeliveryWebsite.github.io",
                    ImageUrl = "assets/projects/project1.png",
                    DisplayOrder = 5,
                    IsFeatured = false
                }
            };
            context.Projects.AddRange(projects);
        }

        if (!context.Testimonials.Any())
        {
            var testimonials = new List<Testimonial>
            {
                new Testimonial
                {
                    Author = "Engineering Lead",
                    Role = "Technical Lead",
                    Company = "ThinkerSteps Technologies",
                    Content = "Nitin is a highly motivated .NET engineer with deep grasp of ASP.NET Core, Entity Framework, and SQL Server. His clean code standards and rapid problem-solving skills consistently stand out.",
                    Rating = 5,
                    AvatarInitials = "TT"
                },
                new Testimonial
                {
                    Author = "Senior Architect",
                    Role = "Lead Developer",
                    Company = "TheThiinker",
                    Content = "During his tenure, Nitin showed tremendous growth in building scalable REST APIs and full-stack web solutions. A dependable developer who delivers high-quality software.",
                    Rating = 5,
                    AvatarInitials = "TH"
                },
                new Testimonial
                {
                    Author = "Project Manager",
                    Role = "Delivery Lead",
                    Company = "Technology Services",
                    Content = "Nitin's dedication to mastering .NET technologies, SQL performance optimization, and modern frontend development makes him an invaluable asset to any engineering team.",
                    Rating = 5,
                    AvatarInitials = "PM"
                }
            };
            context.Testimonials.AddRange(testimonials);
        }

        context.SaveChanges();
    }
}
