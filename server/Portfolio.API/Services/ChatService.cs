using System.Text.Json;

namespace Portfolio.API.Services;

public class ChatMessageDto
{
    public string Sender { get; set; } = "user"; // "user" or "bot"
    public string Text { get; set; } = string.Empty;
}

public class ChatRequestDto
{
    public string Message { get; set; } = string.Empty;
    public List<ChatMessageDto>? History { get; set; }
}

public class ChatResponseDto
{
    public string Reply { get; set; } = string.Empty;
    public List<string>? SuggestedQuestions { get; set; }
}

public interface IChatService
{
    Task<ChatResponseDto> ProcessChatAsync(ChatRequestDto request);
}

public class ChatService : IChatService
{
    private readonly ILogger<ChatService> _logger;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public ChatService(ILogger<ChatService> logger, IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _logger = logger;
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    public async Task<ChatResponseDto> ProcessChatAsync(ChatRequestDto request)
    {
        var rawMsg = request.Message?.Trim() ?? "";
        var suggestions = new List<string>
        {
            "What are Nitin's top skills?",
            "Tell me about his work experience",
            "What is his educational background?",
            "How can I contact Nitin?"
        };

        if (string.IsNullOrWhiteSpace(rawMsg))
        {
            return new ChatResponseDto
            {
                Reply = "Hello! I am Nitin's AI Portfolio Assistant. How can I help you today? You can ask me about his tech stack, work experience, education, projects, or how to get in touch.",
                SuggestedQuestions = suggestions
            };
        }

        // 1. INSTANT HIGH-SPEED MATCH (<5ms) for known portfolio topics
        var instantReply = GetInstantPortfolioReply(rawMsg);
        if (instantReply != null)
        {
            return new ChatResponseDto
            {
                Reply = instantReply,
                SuggestedQuestions = suggestions
            };
        }

        // 2. Google Gemini Generative AI for complex, custom, and general inquiries
        var apiKey = _configuration["GeminiSettings:ApiKey"];
        var model = _configuration["GeminiSettings:Model"] ?? "gemini-3.5-flash-lite";

        if (!string.IsNullOrWhiteSpace(apiKey))
        {
            var geminiReply = await CallGeminiApiAsync(apiKey, model, rawMsg, request.History);
            if (!string.IsNullOrWhiteSpace(geminiReply))
            {
                return new ChatResponseDto
                {
                    Reply = geminiReply.Trim(),
                    SuggestedQuestions = suggestions
                };
            }
        }

        // 3. Robust fallback
        var fallbackReply = GetDefaultFallbackReply(rawMsg);
        return new ChatResponseDto
        {
            Reply = fallbackReply,
            SuggestedQuestions = suggestions
        };
    }

    private async Task<string?> CallGeminiApiAsync(string apiKey, string model, string userMessage, List<ChatMessageDto>? history)
    {
        try
        {
            var client = _httpClientFactory.CreateClient();
            client.Timeout = TimeSpan.FromSeconds(10);

            var url = $"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={apiKey}";

            var systemPrompt = @"You are the official AI Assistant for Nitin Pimpalkar's personal developer portfolio website.
Your role: Warmly, politely, and intelligently answer visitors' questions about Nitin, his work, tech stack, and experience. Also provide helpful, accurate technical answers if asked general programming or software engineering questions.
Respond in the language used by the visitor (English or Hindi/Hinglish). Keep your responses concise, clean, and beautifully formatted using markdown (bullet points, bold text).

Nitin Pimpalkar's Verified Profile Facts:
- Full Name: Nitin Pimpalkar
- Age: Approx 22-23 years old (Graduated B.Tech in 2024).
- Current Position: Junior Software Developer at ThinkerSteps Technologies Pvt. Ltd., Nagpur, Maharashtra, India (July 2026 - Present).
- Previous Experience:
  1. Trainee (Apprenticeship) at TheThiinker, Nagpur (July 2025 - June 2026, 1 year). Developed full-stack web modules with .NET Framework, ASP.NET Core, SQL Server, and frontend technologies.
  2. Dotnet Developer (Internship) at TheThiinker, Nagpur (January 2025 - June 2025, 6 months). Backend REST APIs and relational database operations.
- Education:
  1. Bachelor of Technology (BTech) in Electronics & Telecommunication, RTMNU (Rashtrasant Tukadoji Maharaj Nagpur University) / Priyadarshini College of Engineering Nagpur (2021 - 2024), Grade: A.
  2. Diploma of Education in Electronics & Telecommunication, NIT Polytechnic Nagpur (2019 - 2021), Grade: A+.
- Technical Stack & Skills:
  - Backend: C#, ASP.NET Core, .NET Framework, Entity Framework Core, RESTful APIs, Clean Architecture, OOP, SOLID.
  - Database: Microsoft SQL Server, T-SQL, query optimization, indexing, relational schema design.
  - Frontend: Angular 19, TypeScript, JavaScript, HTML5, CSS3, Bootstrap.
  - Tools & VCS: Git, GitHub, Visual Studio, VS Code, Postman, SQL Server Management Studio (SSMS).
- Nitin's Authentic GitHub Projects:
  1. .NET Core Enterprise Web API (C#, ASP.NET Core, Entity Framework Core, SQL Server - https://github.com/NitinPim/Project.NetCoreWebApi)
  2. JobBoard Career & Recruitment Portal (JavaScript, HTML5, CSS3 - https://nitinpim.github.io/JobBoard.github.io/)
  3. Paytm Digital Wallet UI Clone (HTML5, CSS3, Bootstrap 5 - https://nitinpim.github.io/PaytmClone.github.io/)
  4. Online Quiz Maker & Evaluator (JavaScript, HTML5, CSS3 - https://nitinpim.github.io/OnlineQuizMaker.github.io/)
  5. Food Express & Pizza Delivery (JavaScript, HTML5, CSS3 - https://nitinpim.github.io/PizzaDeliveryWebsite.github.io/)
- Contact & Links:
  - Phone / WhatsApp: +91-8357093103
  - Email: nitinpimpalkar17@gmail.com
  - Address / Location: Butibori, Nagpur, Maharashtra, India - 441108
  - GitHub: https://github.com/NitinPim
  - LinkedIn: https://www.linkedin.com/in/nitin-pimpalkar-45a401220/
  - Instagram: https://www.instagram.com/nitin._.30/
  - Twitter / X: https://twitter.com/Nitinpimpalkar6
  - Contact Form: Integrated on this portfolio website with real-time SMTP dispatch.

CRITICAL INSTRUCTIONS FOR ACCURACY:
1. If the user specifically asks about Nitin's CURRENT job, company, or role (e.g., 'current job', 'currnet job', 'present job', 'abhi kaha kaam kar raha hai', 'kaha job kar raha hai'), ONLY answer with his current position as Junior Software Developer at ThinkerSteps Technologies Pvt. Ltd. Do NOT dump his past internships or full career history unless explicitly requested!
2. If the user asks about his previous jobs or internships, focus on his work at TheThiinker.
3. If the user asks for all work experience or career history, provide the chronological list.";

            var contentsList = new List<object>();

            if (history != null && history.Count > 0)
            {
                var recent = history.TakeLast(4);
                foreach (var h in recent)
                {
                    var role = h.Sender == "bot" ? "model" : "user";
                    contentsList.Add(new
                    {
                        role = role,
                        parts = new object[] { new { text = h.Text } }
                    });
                }
            }

            contentsList.Add(new
            {
                role = "user",
                parts = new object[] { new { text = userMessage } }
            });

            var payload = new
            {
                system_instruction = new
                {
                    parts = new object[] { new { text = systemPrompt } }
                },
                contents = contentsList,
                generationConfig = new
                {
                    temperature = 0.7,
                    maxOutputTokens = 800
                }
            };

            var jsonContent = new StringContent(
                JsonSerializer.Serialize(payload),
                System.Text.Encoding.UTF8,
                "application/json");

            var response = await client.PostAsync(url, jsonContent);
            if (!response.IsSuccessStatusCode)
            {
                var err = await response.Content.ReadAsStringAsync();
                _logger.LogWarning("Gemini API responded with status {StatusCode}: {Error}", response.StatusCode, err);
                return null;
            }

            var responseBody = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(responseBody);
            var root = doc.RootElement;
            if (root.TryGetProperty("candidates", out var candidates) && candidates.GetArrayLength() > 0)
            {
                var first = candidates[0];
                if (first.TryGetProperty("content", out var content) &&
                    content.TryGetProperty("parts", out var parts) &&
                    parts.GetArrayLength() > 0)
                {
                    return parts[0].GetProperty("text").GetString();
                }
            }

            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Exception calling Gemini API");
            return null;
        }
    }

    private static string? GetInstantPortfolioReply(string rawMsg)
    {
        var userMsg = rawMsg.ToLowerInvariant();

        // Greetings
        if (System.Text.RegularExpressions.Regex.IsMatch(userMsg, @"\b(hi|hello|hey|namaste|greetings|wassup|yo|good\s*(morning|afternoon|evening))\b", System.Text.RegularExpressions.RegexOptions.IgnoreCase))
        {
            return "Hello there! 👋 I am Nitin Pimpalkar's portfolio assistant. I can answer questions about his software engineering background, C# & ASP.NET Core skills, work experience at ThinkerSteps Technologies & TheThiinker, projects, or education. What would you like to know?";
        }
        // Age / DOB / Personal details
        if (userMsg.Contains("age") || userMsg.Contains("how old") || userMsg.Contains("dob") || userMsg.Contains("birth") || userMsg.Contains("born"))
        {
            return "Nitin Pimpalkar is a young and energetic software engineer who completed his **B.Tech in 2024** (approx. 22–23 years old). He is currently working as a **Junior Software Developer at ThinkerSteps Technologies Pvt. Ltd.** in Nagpur, India.";
        }
        // Education / College / Degree / University / School / BTech / Diploma / RTMNU / Priyadarshini / Study / Academic
        if (userMsg.Contains("education") || userMsg.Contains("college") || userMsg.Contains("university") || userMsg.Contains("degree") || userMsg.Contains("btech") || userMsg.Contains("diploma") || userMsg.Contains("polytechnic") || userMsg.Contains("study") || userMsg.Contains("academic") || userMsg.Contains("rtmnu") || userMsg.Contains("priyadarshini"))
        {
            return "Nitin Pimpalkar's educational qualifications:\n\n" +
                   "• **Bachelor of Technology (BTech)** in *Electronics and Telecommunication*:\n" +
                   "  **Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)** / Priyadarshini College of Engineering Nagpur (Sep 2021 – Sep 2024)\n" +
                   "  **Grade: A**\n\n" +
                   "• **Diploma of Education** in *Electronics and Telecommunication*:\n" +
                   "  **NIT Polytechnic Nagpur** (Jun 2019 – Aug 2021)\n" +
                   "  **Grade: A+**";
        }
        // Who is Nitin / Introduction / Bio / About
        if (userMsg.Contains("who is") || userMsg.Contains("about nitin") || userMsg.Contains("introduce") || userMsg.Contains("tell me about yourself") || userMsg.Contains("tell me about nitin") || userMsg.Contains("who are you"))
        {
            return "Nitin Pimpalkar is a Software Developer based in **Nagpur, Maharashtra, India**. He completed his **B.Tech in Electronics & Telecommunication (2024, Grade A)** and works as a **Junior Software Developer at ThinkerSteps Technologies Pvt. Ltd.**\n\n" +
                   "He specializes in backend engineering with **C#, ASP.NET Core, Entity Framework Core, Microsoft SQL Server, RESTful APIs**, and builds modern frontend applications using **Angular**.";
        }
        // Skills / Tech stack / Technologies
        if (userMsg.Contains("skill") || userMsg.Contains("tech") || userMsg.Contains("stack") || userMsg.Contains("language") || userMsg.Contains("framework") || userMsg.Contains("tools") || userMsg.Contains("knowledge"))
        {
            return "Nitin's technical skillset includes:\n\n" +
                   "• **Backend & Languages**: C#, ASP.NET Core, .NET Framework, Entity Framework Core, RESTful APIs\n" +
                   "• **Database**: Microsoft SQL Server, SQL queries, relational schema design & optimization\n" +
                   "• **Frontend**: Angular 19, TypeScript, JavaScript, HTML5, CSS3, Bootstrap\n" +
                   "• **Software Design & Practices**: Object-Oriented Programming (OOP), Clean Architecture, REST API Design\n" +
                   "• **Tools & Version Control**: Git, GitHub, Visual Studio, VS Code, Postman, SQL Server Management Studio (SSMS)";
        }
        // Current / Present Job / Role / Company (e.g. "current job", "currnet job", "present company", "currently working", "abhi kaha kaam")
        bool isCurrentQuery = userMsg.Contains("current") || userMsg.Contains("currnet") || userMsg.Contains("present") ||
                              userMsg.Contains("now") || userMsg.Contains("abhi") || userMsg.Contains("latest") ||
                              userMsg.Contains("today") || userMsg.Contains("working at");

        if (isCurrentQuery && (userMsg.Contains("job") || userMsg.Contains("work") || userMsg.Contains("company") || 
                               userMsg.Contains("role") || userMsg.Contains("position") || userMsg.Contains("thinkersteps") || 
                               userMsg.Contains("kaam") || userMsg.Contains("kaha") || userMsg.Contains("status") || userMsg.Contains("doing")))
        {
            return "Nitin Pimpalkar is currently working as a **Junior Software Developer** at **ThinkerSteps Technologies Pvt. Ltd.** in Nagpur, India (Full-time, July 2026 – Present).\n\n" +
                   "**Key Responsibilities:**\n" +
                   "• Developing robust RESTful Web APIs with ASP.NET Core & C#.\n" +
                   "• Optimizing Microsoft SQL Server database queries and Entity Framework Core mappings.\n" +
                   "• Implementing clean software design patterns, OOP, and SOLID paradigms.";
        }

        // Previous / Past Job / Internship / TheThiinker (e.g. "previous job", "past experience", "internship", "thethiinker")
        bool isPastQuery = userMsg.Contains("previous") || userMsg.Contains("past") || userMsg.Contains("earlier") ||
                           userMsg.Contains("before") || userMsg.Contains("intern") || userMsg.Contains("trainee") ||
                           userMsg.Contains("thethiinker") || userMsg.Contains("thiinker") || userMsg.Contains("pehle");

        if (isPastQuery && (userMsg.Contains("job") || userMsg.Contains("work") || userMsg.Contains("company") || 
                            userMsg.Contains("role") || userMsg.Contains("position") || userMsg.Contains("intern") || 
                            userMsg.Contains("experience") || userMsg.Contains("thethiinker")))
        {
            return "Prior to his current role, Nitin worked at **TheThiinker** in Nagpur, India:\n\n" +
                   "1. **Trainee (Apprenticeship)** (Jul 2025 – Jun 2026, 1 yr):\n" +
                   "   • Developed full-stack modules using .NET Framework, ASP.NET Core, and SQL Server.\n" +
                   "   • Built responsive web interfaces with JavaScript, HTML5, CSS3, and Bootstrap.\n\n" +
                   "2. **Dotnet Developer (Internship)** (Jan 2025 – Jun 2025, 6 mos):\n" +
                   "   • Developed backend REST APIs and database operations in an agile team using Git/GitHub.";
        }

        // All / Overall Work Experience / Career Timeline
        if (userMsg.Contains("experience") || userMsg.Contains("career") || userMsg.Contains("all jobs") || 
            userMsg.Contains("work history") || userMsg.Contains("job history") || userMsg.Contains("all companies") || 
            userMsg.Contains("companies") || userMsg.Contains("roles") || userMsg.Contains("positions") || userMsg.Contains("job"))
        {
            return "Nitin Pimpalkar's professional work experience:\n\n" +
                   "1. **Junior Software Developer** — *ThinkerSteps Technologies Pvt. Ltd.* (Full-time, Jul 2026 – Present, Nagpur, India):\n" +
                   "   • Developing robust RESTful Web APIs with ASP.NET Core & C#.\n" +
                   "   • Optimizing SQL Server database queries and Entity Framework Core mappings.\n" +
                   "   • Implementing clean software design patterns and OOP paradigms.\n\n" +
                   "2. **Trainee (Apprenticeship)** — *TheThiinker* (Jul 2025 – Jun 2026, 1 yr, Nagpur, India):\n" +
                   "   • Developed full-stack modules using .NET Framework, ASP.NET Core, and SQL Server.\n" +
                   "   • Created responsive web pages with JavaScript, HTML5, CSS3, and Bootstrap.\n\n" +
                   "3. **Dotnet Developer (Internship)** — *TheThiinker* (Jan 2025 – Jun 2025, 6 mos, Nagpur, India):\n" +
                   "   • Built backend REST APIs, implemented database operations, and collaborated in an agile team using Git/GitHub.";
        }
        // Projects / Portfolio / Code / GitHub / Repos
        if (userMsg.Contains("project") || userMsg.Contains("built") || userMsg.Contains("github") || userMsg.Contains("portfolio") || userMsg.Contains("work sample"))
        {
            return "Here are Nitin Pimpalkar's authentic projects from his GitHub ([https://github.com/NitinPim](https://github.com/NitinPim)):\n\n" +
                   "1. **.NET Core Enterprise Web API**: High-performance RESTful backend with C#, ASP.NET Core, EF Core, and SQL Server. [View Repository](https://github.com/NitinPim/Project.NetCoreWebApi)\n" +
                   "2. **JobBoard Career Portal**: Responsive job portal for searching and applying for employment opportunities. [Live Demo](https://nitinpim.github.io/JobBoard.github.io/)\n" +
                   "3. **Paytm Digital Wallet UI Clone**: Modern responsive fintech and wallet interface designed with Bootstrap 5. [Live Demo](https://nitinpim.github.io/PaytmClone.github.io/)\n" +
                   "4. **Online Quiz Maker & Evaluator**: Dynamic interactive quiz generator with timer and automatic score tracking. [Live Demo](https://nitinpim.github.io/OnlineQuizMaker.github.io/)\n" +
                   "5. **Food Express & Pizza Delivery**: Online ordering portal featuring cart management and responsive checkout. [Live Demo](https://nitinpim.github.io/PizzaDeliveryWebsite.github.io/)";
        }
        // Phone / Mobile / Number / Call / WhatsApp
        if (userMsg.Contains("phone") || userMsg.Contains("mobile") || userMsg.Contains("number") || userMsg.Contains("call") || userMsg.Contains("whatsapp"))
        {
            return "Nitin Pimpalkar's direct phone / WhatsApp number is **[+91 8357093103](tel:+918357093103)**.\n\nYou can also reach him via email at **[nitinpimpalkar17@gmail.com](mailto:nitinpimpalkar17@gmail.com)** or through the website contact form.";
        }
        // Address / Location / Where do you live / City / Butibori
        if (userMsg.Contains("address") || userMsg.Contains("location") || userMsg.Contains("where") || userMsg.Contains("city") || userMsg.Contains("butibori") || userMsg.Contains("stay") || userMsg.Contains("live") || userMsg.Contains("rehta"))
        {
            return "Nitin Pimpalkar is located at:\n\n**Butibori, Nagpur, Maharashtra, India - 441108**\n\nHe is also fully available for **Remote software engineering opportunities Worldwide**!";
        }
        // Contact / Email / Hire / Reach / Social Profiles
        if (userMsg.Contains("contact") || userMsg.Contains("email") || userMsg.Contains("mail") || userMsg.Contains("hire") || userMsg.Contains("reach") || userMsg.Contains("linkedin") || userMsg.Contains("social") || userMsg.Contains("instagram") || userMsg.Contains("twitter"))
        {
            return "Here is how you can get in touch with Nitin Pimpalkar:\n\n" +
                   "• **Phone / WhatsApp**: [+91 8357093103](tel:+918357093103)\n" +
                   "• **Email**: [nitinpimpalkar17@gmail.com](mailto:nitinpimpalkar17@gmail.com)\n" +
                   "• **Location**: Butibori, Nagpur, Maharashtra, India - 441108\n" +
                   "• **GitHub**: [https://github.com/NitinPim](https://github.com/NitinPim)\n" +
                   "• **LinkedIn**: [Nitin Pimpalkar on LinkedIn](https://www.linkedin.com/in/nitin-pimpalkar-45a401220/)\n" +
                   "• **Instagram**: [@nitin._.30](https://www.instagram.com/nitin._.30/)\n" +
                   "• **Twitter / X**: [@Nitinpimpalkar6](https://twitter.com/Nitinpimpalkar6)\n" +
                   "• **Message Directly**: Use the Contact Form on this website — your message is dispatched immediately via SMTP email!";
        }
        // Resume / CV
        if (userMsg.Contains("resume") || userMsg.Contains("cv") || userMsg.Contains("biodata"))
        {
            return "You can review Nitin's verified qualifications, projects, and work experience right here on this portfolio. To request his comprehensive resume/CV, please send a message through the Contact Form or email him directly at **nitinpimpalkar17@gmail.com**.";
        }
        // C# / .NET / Backend specifics
        if (userMsg.Contains("c#") || userMsg.Contains(".net") || userMsg.Contains("dotnet") || userMsg.Contains("backend") || userMsg.Contains("sql") || userMsg.Contains("entity framework") || userMsg.Contains("api"))
        {
            return "Nitin has deep hands-on expertise in backend engineering:\n\n" +
                   "• Building high-throughput RESTful Web APIs with **ASP.NET Core & C#**\n" +
                   "• Advanced object-relational mapping using **Entity Framework Core**\n" +
                   "• Database schema design, querying, and optimization in **Microsoft SQL Server**\n" +
                   "• Strict adherence to Clean Architecture, OOP, and SOLID design principles.";
        }
        // Angular / Frontend specifics
        if (userMsg.Contains("angular") || userMsg.Contains("frontend") || userMsg.Contains("ui") || userMsg.Contains("javascript") || userMsg.Contains("css") || userMsg.Contains("html"))
        {
            return "On the frontend, Nitin builds responsive, modern web interfaces using **Angular 19**, TypeScript, JavaScript, CSS3, and Bootstrap, with seamless integration to backend REST APIs.";
        }
        // Why hire / Strengths
        if (userMsg.Contains("why hire") || userMsg.Contains("strength") || userMsg.Contains("advantage") || userMsg.Contains("qualit"))
        {
            return "Why hire Nitin Pimpalkar:\n\n" +
                   "1. **Strong Technical Foundation**: B.Tech'24 graduate with Grade A in engineering, skilled in C#, ASP.NET Core, and SQL Server.\n" +
                   "2. **Real Production Experience**: Proven industry experience at ThinkerSteps Technologies and TheThiinker.\n" +
                   "3. **Clean Code & OOP Mastery**: Committed to writing clean, maintainable, and scalable enterprise code.\n" +
                   "4. **Reliable & Fast Learner**: Adaptable across full-stack requirements, agile workflows, and eager to deliver impactful results.";
        }

        return null;
    }

    private static string GetDefaultFallbackReply(string rawMsg)
    {
        return $"Regarding your inquiry: \"{rawMsg}\":\n\n" +
               "Nitin Pimpalkar is a Software Developer based in Nagpur, India (B.Tech '24 graduate). He is currently working as a **Junior Software Developer at ThinkerSteps Technologies Pvt. Ltd.** specializing in C#, ASP.NET Core, and SQL Server.\n\n" +
               "Feel free to ask about his **skills**, **projects**, **work experience**, **education**, or **contact info**!";
    }
}
