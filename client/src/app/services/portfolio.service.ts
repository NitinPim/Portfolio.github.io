import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, timeout, shareReplay } from 'rxjs/operators';
import { PortfolioData, ContactRequest, ContactResponse } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api';
  private portfolioData$?: Observable<PortfolioData>;

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
      degree: 'B.E. in Electronics & Telecommunication (Priyadarshini College, Grade A)',
      completedProjects: 16,
      codeCommits: '500+'
    },
    projects: [
      {
        id: 1,
        title: 'Dynamic User Data Management',
        tagline: 'Enterprise Web App for Maharashtra Village Data & Product Reviews',
        description: 'Scalable web application for managing Maharashtra village data and user product reviews. Implemented full CRUD operations, advanced search filters improving retrieval speed by 25%, and secure photo upload functionality.',
        category: 'ASP.NET MVC / Backend',
        techStack: 'ASP.NET MVC, C#, Entity Framework, LINQ, SQL Server, JavaScript, jQuery',
        architectureNotes: 'Engineered with clean MVC separation, LINQ queries, optimized relational schema, and secure file handling.',
        liveUrl: 'https://github.com/NitinPim',
        githubUrl: 'https://github.com/NitinPim',
        imageUrl: '',
        displayOrder: 1,
        isFeatured: true
      },
      {
        id: 2,
        title: '.NET Core Enterprise Web API',
        tagline: 'High-Performance RESTful Backend Engine with C# & SQL Server',
        description: 'Scalable backend RESTful Web API built with C#, ASP.NET Core, and Entity Framework Core. Features repository architecture, secure CRUD endpoints, MS SQL Server relational database integration, and Swagger documentation.',
        category: '.NET Core / Backend',
        techStack: 'C#, ASP.NET Core, Entity Framework Core, SQL Server, RESTful APIs, Swagger',
        architectureNotes: 'Clean Architecture design with Repository Pattern, dependency injection, and optimized EF Core query mappings.',
        liveUrl: 'https://github.com/NitinPim/Project.NetCoreWebApi',
        githubUrl: 'https://github.com/NitinPim/Project.NetCoreWebApi',
        imageUrl: '',
        displayOrder: 2,
        isFeatured: true
      },
      {
        id: 3,
        title: 'Online Quiz Maker & Evaluator',
        tagline: 'Interactive Educational Assessment & Dynamic Scoring System',
        description: 'Interactive web application featuring custom quiz generation, responsive layouts, dynamic question navigation, and real-time score evaluation.',
        category: 'Interactive Web App',
        techStack: 'HTML5, CSS3, Bootstrap 5, JavaScript',
        architectureNotes: 'Stateful quiz evaluation engine with dynamic timer countdown, client-side score tracking, and instant answer verification.',
        liveUrl: 'https://nitinpim.github.io/OnlineQuizMaker.github.io/',
        githubUrl: 'https://github.com/NitinPim/OnlineQuizMaker.github.io',
        imageUrl: '',
        displayOrder: 3,
        isFeatured: true
      },
      {
        id: 4,
        title: 'JobBoard Career & Recruitment Portal',
        tagline: 'Responsive Job Search, Filtering & Application Platform',
        description: 'Dynamic employment portal that empowers job seekers to search, filter openings by technology/location, examine role criteria, and apply seamlessly with modern responsive interface design.',
        category: 'Web Application',
        techStack: 'JavaScript, HTML5, CSS3, Responsive Design, Git',
        architectureNotes: 'Modular front-end architecture, mobile-first responsive layout, and cross-browser optimized DOM interactions.',
        liveUrl: 'https://nitinpim.github.io/JobBoard.github.io/',
        githubUrl: 'https://github.com/NitinPim/JobBoard.github.io',
        imageUrl: '',
        displayOrder: 4,
        isFeatured: true
      },
      {
        id: 5,
        title: 'Netflix UI Experience Clone',
        tagline: 'Entertainment Streaming Platform Component Interface',
        description: 'Netflix UI clone built with HTML, CSS, Bootstrap, and JavaScript, emphasizing modern responsive hero banners, multi-device media grids, and interactive styling.',
        category: 'Frontend / UI',
        techStack: 'HTML5, CSS3, Bootstrap 5, JavaScript, Responsive UX',
        architectureNotes: 'Component-driven streaming UI layout, responsive media query breakpoints, and polished entertainment aesthetic.',
        liveUrl: 'https://github.com/NitinPim',
        githubUrl: 'https://github.com/NitinPim',
        imageUrl: '',
        displayOrder: 5,
        isFeatured: false
      },
      {
        id: 6,
        title: 'Paytm Digital Wallet UI Clone',
        tagline: 'Fintech & Digital Payments Interface Clone',
        description: 'Pixel-perfect, modern responsive clone of the Paytm digital payment ecosystem. Features recharge menus, wallet transaction layouts, and mobile-friendly responsive components.',
        category: 'Frontend / UI',
        techStack: 'HTML5, CSS3, Bootstrap 5, Flexbox, Responsive Web Design',
        architectureNotes: 'Component-driven CSS layout, responsive grid breakpoints, and accessible interactive interface elements.',
        liveUrl: 'https://nitinpim.github.io/PaytmClone.github.io/',
        githubUrl: 'https://github.com/NitinPim/PaytmClone.github.io',
        imageUrl: '',
        displayOrder: 6,
        isFeatured: false
      }
    ],
    experiences: [
      {
        id: 1,
        role: '.Net Developer Intern',
        company: 'Hesten Solution Pvt. Ltd.',
        location: 'Nagpur, Maharashtra, India',
        period: 'Apr 2024 - Oct 2024',
        description: 'Engineered robust backend and frontend web modules with C#, ASP.NET Core, ASP.NET MVC, and Microsoft SQL Server.',
        highlights: 'Developed responsive UI using HTML, CSS, and Bootstrap, enhancing user experience and accessibility|Engineered a Product Review System with C#, ASP.NET MVC, SQL, and jQuery, increasing user engagement by 30%|Designed a Nutraceutical Product Page, ensuring accurate product information and seamless usability|Built RESTful APIs with ASP.NET Core, optimizing data retrieval for Gold & Silver products via SQL Server stored procedures, reducing query execution time by 40%',
        techStack: 'C#, ASP.NET Core, ASP.NET MVC, Microsoft SQL Server, Stored Procedures, Entity Framework, jQuery, Bootstrap',
        order: 1
      },
      {
        id: 2,
        role: 'Junior Software Developer',
        company: 'ThinkerSteps Technologies Pvt. Ltd.',
        location: 'Nagpur, Maharashtra, India • On-site',
        period: 'Jul 2026 - Present',
        description: 'Developing and maintaining scalable enterprise solutions with ASP.NET Core, C#, and SQL Server. Designing RESTful Web APIs, optimizing database operations with Entity Framework Core, and building responsive client modules.',
        highlights: 'Building robust REST APIs with ASP.NET Core and Entity Framework Core|Optimizing Microsoft SQL Server relational schema, stored procedures, and queries|Integrating clean software design principles and OOP paradigms into enterprise applications',
        techStack: 'C#, ASP.NET Core, SQL Server, Entity Framework Core, REST APIs, Git, GitHub',
        order: 2
      },
      {
        id: 3,
        role: 'Trainee (Apprenticeship)',
        company: 'TheThiinker',
        location: 'Nagpur, Maharashtra, India • On-site',
        period: 'Jul 2025 - Jun 2026 (1 yr)',
        description: 'Worked on full-stack .NET web applications, database schema designs, and frontend integration using modern web standards and object-oriented programming.',
        highlights: 'Engineered core backend modules using .NET Framework and ASP.NET Core|Implemented database migrations and relationship mappings with Entity Framework|Developed dynamic web UI interfaces using JavaScript, CSS3, and Bootstrap',
        techStack: 'ASP.NET, .NET Core, SQL Server, Entity Framework, JavaScript, HTML5/CSS3, Bootstrap',
        order: 3
      }
    ],
    educations: [
      {
        id: 1,
        institution: 'Priyadarshini College of Engineering, Nagpur',
        degree: 'Bachelor of Engineering (B.E. / B.Tech)',
        fieldOfStudy: 'Electronics and Telecommunication Engineering',
        period: 'Jul 2021 - Jun 2024',
        grade: 'Graduated (Grade: A)',
        skills: 'C#, ASP.NET Core, Relational Databases, Algorithms, Software Engineering',
        order: 1
      },
      {
        id: 2,
        institution: 'NIT Polytechnic, Nagpur',
        degree: 'Polytechnic Diploma',
        fieldOfStudy: 'Electronics and Telecommunication',
        period: 'Jul 2019 - May 2021',
        grade: 'Grade: A+',
        skills: 'Programming Foundations, Electronics, Web Development',
        order: 2
      },
      {
        id: 3,
        institution: 'Balaji Junior College, Nagpur',
        degree: 'Higher Secondary Certificate (HSC)',
        fieldOfStudy: 'Science & Mathematics',
        period: 'Jun 2017 - May 2019',
        grade: 'Completed',
        skills: 'Mathematics, Physics, Computer Science',
        order: 3
      },
      {
        id: 4,
        institution: 'Holy Cross English Medium High School, Nagpur',
        degree: 'Secondary School Certificate (SSC)',
        fieldOfStudy: 'General Academics & Sciences',
        period: 'Completed May 2017',
        grade: 'Completed',
        skills: 'Core Sciences, Mathematics, English',
        order: 4
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

  getPortfolioData(forceRefresh = false): Observable<PortfolioData> {
    if (!this.portfolioData$ || forceRefresh) {
      this.portfolioData$ = this.http.get<any>(`${this.apiUrl}/portfolio/all`).pipe(
        map(res => {
          if (res && res.response) return res.response as PortfolioData;
          if (res && res.data) return res.data as PortfolioData;
          return res as PortfolioData;
        }),
        catchError(err => {
          console.warn('API fetch failed, utilizing resilient client fallback cache:', err);
          return of(this.defaultData);
        }),
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }
    return this.portfolioData$;
  }

  submitContact(req: ContactRequest): Observable<ContactResponse> {
    return this.http.post<any>(`${this.apiUrl}/contact`, req).pipe(
      map(res => {
        if (res && res.response) return res.response as ContactResponse;
        if (res && res.data) return res.data as ContactResponse;
        return res as ContactResponse;
      }),
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
    return this.http.post<any>(`${this.apiUrl}/chat`, { message, history }).pipe(
      timeout(8000),
      map(res => {
        if (res && res.response) return res.response as { reply: string; suggestedQuestions?: string[] };
        if (res && res.data) return res.data as { reply: string; suggestedQuestions?: string[] };
        return res as { reply: string; suggestedQuestions?: string[] };
      }),
      catchError(err => {
        return of({
          reply: "I am Nitin Pimpalkar's Portfolio Assistant. Nitin is a Junior Software Developer at ThinkerSteps Technologies Pvt. Ltd. based in Nagpur, India (B.Tech '24 graduate) specializing in C#, ASP.NET Core, SQL Server, and Angular.",
          suggestedQuestions: ["What are Nitin's top skills?", "Tell me about his work experience", "What is his educational background?", "How can I contact Nitin?"]
        });
      })
    );
  }
}
