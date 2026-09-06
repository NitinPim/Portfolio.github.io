@echo off
title Push Portfolio to GitHub
echo ========================================================
echo Pushing new Portfolio code to NitinPim/Portfolio.github.io...
echo ========================================================
set "PATH=C:\Program Files\Microsoft Visual Studio\18\Insiders\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\cmd;%PATH%"

git push -u origin main --force

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo [SUCCESS] Code pushed successfully to GitHub!
    echo ========================================================
) else (
    echo ========================================================
    echo [NOTE] If authentication is needed, please complete the sign-in prompt.
    echo ========================================================
)
echo.
pause
