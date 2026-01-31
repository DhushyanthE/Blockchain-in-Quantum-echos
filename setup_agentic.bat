@echo off
setlocal enabledelayedexpansion

:: === Configuration ===
set PROJECT_DIR=D:\KIngston Engineering College\Quantum_coin\quantum-coin00011-76-main
set SRC_DIR=%PROJECT_DIR%\src
set AGENT_FILE=%SRC_DIR%\agents\AgentOrchestrator.ts
set DASHBOARD_FILE=%SRC_DIR%\components\crypto\QuantumAnalysisDashboard.tsx

echo -------------------------------------------------
echo 🚀 QuantumShield Agentic Setup Script Starting...
echo -------------------------------------------------

if not exist "%PROJECT_DIR%" (
    echo ❌ Project directory not found: %PROJECT_DIR%
    pause
    exit /b
)

cd /d "%PROJECT_DIR%"
echo ✅ Switched to project directory: %PROJECT_DIR%

:: === 1. Write AgentOrchestrator.ts ===
echo 🔧 Creating AgentOrchestrator.ts ...
> "%AGENT_FILE%" (
    echo import { fetchCryptoData } from "@/services/cryptoApiService";
    echo import { runAutomationTasks } from "@/automation/AutoResponseEngine";
    echo import { analyzeTrends } from "@/ai/AdvancedAIPredictor";
    echo.
    echo export const AgentOrchestrator = async () => {
    echo     console.log("🤖 Agentic Orchestrator running...");
    echo     try {
    echo         const cryptoData = await fetchCryptoData();
    echo         const aiInsights = await analyzeTrends(cryptoData);
    echo         const automationResults = await runAutomationTasks(aiInsights);
    echo         return { cryptoData, aiInsights, automationResults };
    echo     } catch (error) {
    echo         console.error("Agentic Orchestrator failed:", error);
    echo         return null;
    echo     }
    echo };
)
echo ✅ AgentOrchestrator.ts created successfully.

:: === 2. Insert code into QuantumAnalysisDashboard.tsx ===
if exist "%DASHBOARD_FILE%" (
    echo 🔍 Checking %DASHBOARD_FILE% ...
    findstr /C:"AgentOrchestrator" "%DASHBOARD_FILE%" >nul
    if errorlevel 1 (
        echo 🧩 Injecting Agentic hook into dashboard...
        echo.>>"%DASHBOARD_FILE%"
        echo import { AgentOrchestrator } from "@/agents/AgentOrchestrator";>>"%DASHBOARD_FILE%"
        echo useEffect(() => {>>"%DASHBOARD_FILE%"
        echo   const init = async () => {>>"%DASHBOARD_FILE%"
        echo     const results = await AgentOrchestrator();>>"%DASHBOARD_FILE%"
        echo     console.log("Agentic Results:", results);>>"%DASHBOARD_FILE%"
        echo   };>>"%DASHBOARD_FILE%"
        echo   init();>>"%DASHBOARD_FILE%"
        echo }, []);>>"%DASHBOARD_FILE%"
        echo ✅ Agentic code injected into dashboard.
    ) else (
        echo ⚠️ Agentic code already exists, skipping.
    )
) else (
    echo ❌ Dashboard file not found: %DASHBOARD_FILE%
)

:: === 3. Install dependencies ===
echo 📦 Installing dependencies...
call npm install

:: === 4. Run dev server ===
echo 🌐 Starting Vite dev server...
call npm run dev

echo -------------------------------------------------
echo ✅ QuantumShield Agentic Setup Completed!
echo -------------------------------------------------
pause
