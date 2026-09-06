@echo off
echo ==========================================================
echo Starting Full Stack Portfolio (.NET 10 Web API + Angular 19)
echo ==========================================================
echo.

:: 1. Start SQL Server LocalDB
echo [1/3] Ensuring Microsoft SQL Server LocalDB is running...
sqllocaldb start MSSQLLocalDB

:: 2. Start .NET Core Web API
echo [2/3] Launching .NET Core Web API on http://localhost:5000...
start "Portfolio API (.NET 10)" cmd /k "dotnet run --project server/Portfolio.API --urls http://localhost:5000"

:: 3. Start Angular Client
echo [3/3] Launching Angular Client on http://localhost:4200...
start "Portfolio Frontend (Angular 19)" cmd /k "cd client && npm.cmd start -- --port 4200 --open"

echo.
echo ==========================================================
echo Application is launching!
echo Backend API : http://localhost:5000
echo Frontend UI : http://localhost:4200
echo ==========================================================
pause
