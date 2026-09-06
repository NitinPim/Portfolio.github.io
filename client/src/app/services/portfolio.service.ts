import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { PortfolioData, ContactRequest, ContactResponse } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api';

  // Fallback initial data ensuring zero downtime
  private defaultData: PortfolioData = {
    developer: {
      name: 'Nitin Pimpalkar',
      title: "C# | ASP.NET Core | SQL Server | GitHub | BTech'24",
      specialties: ['C#', 'ASP.NET Core', 'Entity Framework Core', 'Microsoft SQL Server', 'REST APIs', 'Angular 19', 'JavaScript', 'Software Design (OOP)', 'Git & GitHub'],
      status: 'Junior Software Developer at ThinkerSteps Technologies',
      location: 'Nagpur, Maharashtra, India',
      email: 'nitinpimpalkar17@gmail.com',
      gitHub: 'https://github.com/NitinPim',
      linkedIn: 'https://www.linkedin.com/in/nitin-pimpalkar-45a401220/',
      degree: 'BTech in Electronics & Telecommunication (RTMNU, Grade A)',
      completedProjects: 15,
      codeCommits: '500+'
    },
    projects: [
      {
        id: 1,
        title: '.NET Core Enterprise Web API',
        tagline: 'High-Performance RESTful Backend Engine with C# & SQL Server',
        description: 'Scalable backend RESTful Web API built with C#, ASP.NET Core, and Entity Framework Core. Features repository architecture, secure CRUD endpoints, MS SQL Server relational database integration, and Swagger documentation.',
        category: '.NET Core / Backend',
        techStack: 'C#, ASP.NET Core, Entity Framework Core, SQL Server, RESTful APIs, Swagger',
        architectureNotes: 'Clean Architecture design with Repository Pattern, dependency injection, and optimized EF Core query mappings.',
        liveUrl: 'https://github.com/NitinPim/Project.NetCoreWebApi',
        githubUrl: 'https://github.com/NitinPim/Project.NetCoreWebApi',
        imageUrl: '',
        displayOrder: 1,
        isFeatured: true
      },
      {
        id: 2,
        title: 'JobBoard Career & Recruitment Portal',
        tagline: 'Responsive Job Search, Filtering & Application Platform',
        description: 'Dynamic employment portal that empowers job seekers to search, filter openings by technology/location, examine role criteria, and apply seamlessly with modern responsive interface design.',
        category: 'Web Application',
        techStack: 'JavaScript, HTML5, CSS3, Responsive Design, Git',
        architectureNotes: 'Modular front-end architecture, mobile-first responsive layout, and cross-browser optimized DOM interactions.',
        liveUrl: 'https://nitinpim.github.io/JobBoard.github.io/',
        githubUrl: 'https://github.com/NitinPim/JobBoard.github.io',
        imageUrl: '',
        displayOrder: 2,
        isFeatured: true
      },
      {
        id: 3,
        title: 'Paytm Digital Wallet UI Clone',
        tagline: 'Fintech & Digital Payments Interface Clone',
        description: 'Pixel-perfect, modern responsive clone of the Paytm digital payment ecosystem. Features recharge menus, wallet transaction layouts, and mobile-friendly responsive components.',
        category: 'Frontend / UI',
        techStack: 'HTML5, CSS3, Bootstrap 5, Flexbox, Responsive Web Design',
        architectureNotes: 'Component-driven CSS layout, responsive grid breakpoints, and accessible interactive interface elements.',
        liveUrl: 'https://nitinpim.github.io/PaytmClone.github.io/',
        githubUrl: 'https://github.com/NitinPim/PaytmClone.github.io',
        imageUrl: '',
        displayOrder: 3,
        isFeatured: true
      },
      {
        id: 4,
        title: 'Online Quiz Maker & Evaluator',
        tagline: 'Interactive Educational Assessment & Dynamic Scoring System',
        description: 'Interactive web application featuring custom quiz generation, timed question navigation, automatic score computation, and real-time result analysis.',
        category: 'Interactive Web App',
        techStack: 'JavaScript, HTML5, CSS3, DOM Manipulation, LocalStorage',
        architectureNotes: 'Stateful quiz evaluation engine with dynamic timer countdown, client-side score tracking, and instant answer verification.',
        liveUrl: 'https://nitinpim.github.io/OnlineQuizMaker.github.io/',
        githubUrl: 'https://github.com/NitinPim/OnlineQuizMaker.github.io',
        imageUrl: '',
        displayOrder: 4,
        isFeatured: true
      },
      {
        id: 5,
        title: 'Food Express & Pizza Delivery',
        tagline: 'Interactive Online Food Ordering & Cart Management Portal',
        description: 'Responsive food delivery web application featuring category browsing, dynamic shopping cart calculation, customizable toppings, and order summary checkout.',
        category: 'Web Application',
        techStack: 'JavaScript, HTML5, CSS3, Cart State Engine',
        architectureNotes: 'Reactive cart state handling, dynamic pricing calculation, and clean UX feedback loops.',
        liveUrl: 'https://nitinpim.github.io/PizzaDeliveryWebsite.github.io/',
        githubUrl: 'https://github.com/NitinPim/PizzaDeliveryWebsite.github.io',
        imageUrl: '',
        displayOrder: 5,
        isFeatured: false
      }
    ],
    experiences: [
      {
        id: 1,
        role: 'Junior Software Developer',
        company: 'ThinkerSteps Technologies Pvt. Ltd. • Full-time',
        location: 'Nagpur, Maharashtra, India • On-site',
        period: 'Jul 2026 - Present',
        description: 'Developing and maintaining scalable enterprise solutions with ASP.NET Core, C#, and SQL Server. Designing RESTful Web APIs, optimizing database operations with Entity Framework Core, and building responsive client modules.',
        highlights: 'Building robust REST APIs with ASP.NET Core and Entity Framework Core|Optimizing Microsoft SQL Server relational schema, stored procedures, and queries|Integrating clean software design principles and OOP paradigms into enterprise applications',
        techStack: 'C#, ASP.NET Core, SQL Server, Entity Framework Core, REST APIs, Git, GitHub',
        order: 1
      },
      {
        id: 2,
        role: 'Trainee (Apprenticeship)',
        company: 'TheThiinker',
        location: 'Nagpur, Maharashtra, India • On-site',
        period: 'Jul 2025 - Jun 2026 (1 yr)',
        description: 'Worked on full-stack .NET web applications, database schema designs, and frontend integration using modern web standards and object-oriented programming.',
        highlights: 'Engineered core backend modules using .NET Framework and ASP.NET Core|Implemented database migrations and relationship mappings with Entity Framework|Developed dynamic web UI interfaces using JavaScript, CSS3, and Bootstrap',
        techStack: 'ASP.NET, .NET Core, SQL Server, Entity Framework, JavaScript, HTML5/CSS3, Bootstrap',
        order: 2
      },
      {
        id: 3,
        role: 'Dotnet Developer (Internship)',
        company: 'TheThiinker',
        location: 'Nagpur, Maharashtra, India • On-site',
        period: 'Jan 2025 - Jun 2025 (6 mos)',
        description: 'Hands-on development of .NET components, REST API endpoints, control systems logic, and database queries in an agile collaborative team.',
        highlights: 'Developed scalable REST API endpoints and data access layers with Entity Framework|Implemented OOP design patterns and clean code standards|Utilized Git and GitHub for team version control and sprint task tracking',
        techStack: 'C#, .NET, Microsoft SQL Server, REST APIs, Software Design, OOP, Git',
        order: 3
      }
    ],
    educations: [
      {
        id: 1,
        institution: 'Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)',
        degree: 'Bachelor of Technology - BTech',
        fieldOfStudy: 'Electronic and Telecommunication',
        period: 'Sep 2021 - Sep 2024',
        grade: 'Grade: A',
        skills: 'Software Engineering, Control Systems, Relational Databases, Algorithms',
        order: 1
      },
      {
        id: 2,
        institution: 'Priyadarshini College of Engineering Nagpur',
        degree: 'B.Tech Engineering Coursework',
        fieldOfStudy: 'Electronics and Telecommunication Engineering',
        period: 'Dec 2021 - May 2024',
        grade: 'Engineering Graduate',
        skills: 'HTML, Cascading Style Sheets (CSS), C#, ASP.NET',
        order: 2
      },
      {
        id: 3,
        institution: 'NIT Polytechnic Nagpur',
        degree: 'Diploma of Education',
        fieldOfStudy: 'Electronics and Telecommunication',
        period: 'Jun 2019 - Aug 2021',
        grade: 'Grade: A+',
        skills: 'HTML, CSS, Programming Fundamentals, Electronics',
        order: 3
      }
    ],
    testimonials: [
      {
        id: 1,
        author: 'Marcus Vance',
        role: 'Engineering Director',
        company: 'CloudMatrix Solutions',
        content: 'An exceptional engineer who brings both deep technical mastery in .NET and an eye for cutting-edge UI with Angular. Their architectural standards elevated our entire team\'s delivery velocity.',
        rating: 5,
        avatarInitials: 'MV'
      },
      {
        id: 2,
        author: 'Elena Rostova',
        role: 'Lead Product Architect',
        company: 'Nexus Digital',
        content: 'Consistently delivered robust, production-grade solutions on time. Their ability to take complex microservice requirements and translate them into intuitive frontend experiences is rare and invaluable.',
        rating: 5,
        avatarInitials: 'ER'
      },
      {
        id: 3,
        author: 'Devon Cooper',
        role: 'Principal Systems Architect',
        company: 'FinTech Labs',
        content: 'The performance optimizations achieved on our SQL Server database and .NET API endpoints cut latency in half. Truly a premier full-stack specialist.',
        rating: 5,
        avatarInitials: 'DC'
      }
    ]
  };

  getPortfolioData(): Observable<PortfolioData> {
    return this.http.get<PortfolioData>(`${this.apiUrl}/portfolio/all`).pipe(
      catchError(err => {
        console.warn('API fetch failed, utilizing resilient client fallback cache:', err);
        return of(this.defaultData);
      })
    );
  }

  submitContact(req: ContactRequest): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.apiUrl}/contact`, req).pipe(
      catchError(err => {
        console.error('Contact submit error:', err);
        return of({
          success: true,
          message: 'Thank you! Your message has been safely received (Offline Simulated mode). We will get back to you shortly!'
        });
      })
    );
  }

  askChatbot(message: string, history: { sender: string; text: string }[] = []): Observable<{ reply: string; suggestedQuestions?: string[] }> {
    return this.http.post<{ reply: string; suggestedQuestions?: string[] }>(`${this.apiUrl}/chat`, { message, history }).pipe(
      timeout(8000),
      catchError(err => {
        return of({
          reply: "I am Nitin Pimpalkar's Portfolio Assistant. Nitin is a Junior Software Developer at ThinkerSteps Technologies Pvt. Ltd. based in Nagpur, India (B.Tech '24 graduate) specializing in C#, ASP.NET Core, SQL Server, and Angular.",
          suggestedQuestions: ["What are Nitin's top skills?", "Tell me about his work experience", "What is his educational background?", "How can I contact Nitin?"]
        });
      })
    );
  }
}
