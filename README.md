# 🌟 Modern 3D Developer Portfolio (Angular 19 + .NET Core 10 Web API + MS SQL Server)

A modern, high-performance, 100% copyright-safe full-stack developer portfolio. Engineered with **Angular 19 Standalone Components**, **Three.js WebGL procedural graphics**, **ASP.NET Core 10 Web API**, and **Microsoft SQL Server**.

---

## 🚀 Quick Start (Ek Click Mein Kaise Run Karein)

### Option 1: One-Click Run (Sabse Aasan Tarika)
Simply double click `run.bat` in the root folder, ya terminal mein run karein:
```cmd
.\run.bat
```
Yeh script automatically:
1. Microsoft SQL Server LocalDB ko start karega.
2. .NET Core Web API ko `http://localhost:5000` par launch karega (Database create aur seed data auto-insert hoga).
3. Angular Client ko `http://localhost:4200` par launch karega aur browser mein open karega.

---

### Option 2: Manual Start (Alag-Alag Terminal Mein)

#### Step 1: SQL Server LocalDB Start Karein
```powershell
sqllocaldb start MSSQLLocalDB
```

#### Step 2: Backend (.NET Web API) Run Karein
Open a terminal and run:
```powershell
dotnet run --project server/Portfolio.API --urls "http://localhost:5000"
```
* Swagger / OpenAPI docs: `http://localhost:5000/openapi/v1.json`
* Aggregated Data API: `http://localhost:5000/api/portfolio/all`

#### Step 3: Frontend (Angular) Run Karein
Open a second terminal and run:
```powershell
cd client
npm.cmd start
```
* Frontend Browser URL: `http://localhost:4200`

---

## 🛡️ 100% Original & Copyright-Safe Design Guarantee

- **Zero Plagiarized Code**: Written from scratch in Angular 19 (TypeScript) and .NET 10 (C#).
- **Procedural 3D WebGL Graphics**: Uses custom Three.js geometry, gyroscope rings, luminous core, and particle field (koi copyrighted third-party models use nahi kiye gaye).
- **Custom Nova Obsidian Theme**: Deep cosmic glassmorphism, responsive grid layout, and tailored color palette.
- **Dynamic Database Integration**: Contact messages submit directly through ASP.NET Core API and persist into Microsoft SQL Server.

---

## 📁 Architecture

```
Portfolio/
├── run.bat                     # Windows One-Click Launcher
├── server/                     # ASP.NET Core 10 Web API
│   └── Portfolio.API/
│       ├── Controllers/        # REST Endpoints (/api/portfolio, /api/contact)
│       ├── Data/               # PortfolioDbContext & DbInitializer (Auto-Seeding)
│       ├── Models/             # Project, Experience, Testimonial, ContactMessage
│       └── appsettings.json    # SQL Server LocalDB Connection String
└── client/                     # Angular 19 Application
    └── src/app/
        ├── components/         # Navbar, Footer, 3D WebGL Canvas
        ├── sections/           # Hero, Bento About, Projects, Experience, Reviews, Contact
        ├── services/           # PortfolioService (HttpClient + Resilience Fallback)
        └── models/             # TypeScript Data Contracts
```

---

## ⚖️ License
MIT License - © 2026 Nitin. All Rights Reserved.
