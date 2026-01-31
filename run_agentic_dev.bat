@echo off
title QuantumShield Agentic Dev Launcher
echo ============================================
echo ⚙️ QuantumShield Agentic Dev Launcher
echo ============================================

setlocal
set PROJECT_DIR=%~dp0
cd /d "%PROJECT_DIR%"

echo Checking for AgentOrchestrator.ts ...
if exist "%PROJECT_DIR%src\ai\AgentOrchestrator.ts" (
    echo ✅ AgentOrchestrator.ts found.
) else (
    echo ❌ AgentOrchestrator.ts not found.
    pause
    exit /b
)

echo.
echo 🚀 Installing dependencies...
call npm install

echo.
echo 🔥 Starting development server...
call npm run dev

endlocal
pause
