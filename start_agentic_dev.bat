@echo off
title QuantumShield Agentic Dev Launcher
echo ============================================
echo 🚀 QuantumShield Agentic Dev Launcher
echo ============================================

set "PROJECT_DIR=D:\KIngston Engineering College\Quantum_coin\quantum-coin00011-76-main"
set "AI_DIR=%PROJECT_DIR%\src\ai"

echo Checking for AgentOrchestrator.ts ...
if not exist "%AI_DIR%\AgentOrchestrator.ts" (
    echo Creating AgentOrchestrator.ts ...
    > "%AI_DIR%\AgentOrchestrator.ts" echo // src/ai/AgentOrchestrator.ts
    >> "%AI_DIR%\AgentOrchestrator.ts" echo import { AdvancedAIPredictor } from "./AdvancedAIPredictor";
    >> "%AI_DIR%\AgentOrchestrator.ts" echo import cryptoApiService from "@/services/cryptoApiService";
    >> "%AI_DIR%\AgentOrchestrator.ts" echo.
    >> "%AI_DIR%\AgentOrchestrator.ts" echo export async function AgentOrchestrator() {
    >> "%AI_DIR%\AgentOrchestrator.ts" echo     console.log("🚀 AgentOrchestrator initialized...");
    >> "%AI_DIR%\AgentOrchestrator.ts" echo     try {
    >> "%AI_DIR%\AgentOrchestrator.ts" echo         const marketData = await cryptoApiService.fetchCryptoData();
    >> "%AI_DIR%\AgentOrchestrator.ts" echo         const ai = new AdvancedAIPredictor();
    >> "%AI_DIR%\AgentOrchestrator.ts" echo         const results = await ai.generatePrediction(marketData);
    >> "%AI_DIR%\AgentOrchestrator.ts" echo         console.log("✅ AI Prediction Results:", results);
    >> "%AI_DIR%\AgentOrchestrator.ts" echo         return results;
    >> "%AI_DIR%\AgentOrchestrator.ts" echo     ^} catch (error) {
    >> "%AI_DIR%\AgentOrchestrator.ts" echo         console.error("❌ AgentOrchestrator failed:", error);
    >> "%AI_DIR%\AgentOrchestrator.ts" echo         return { error: "Failed to orchestrate agents" };
    >> "%AI_DIR%\AgentOrchestrator.ts" echo     ^}
    >> "%AI_DIR%\AgentOrchestrator.ts" echo ^}
) else (
    echo AgentOrchestrator.ts already exists.
)

echo.
echo Checking directory structure...
if exist "%PROJECT_DIR%\src\components\crypto\QuantumAnalysisDashboard.tsx" (
    echo ✅ Dashboard found.
) else (
    echo ⚠️ Dashboard not found — please ensure file exists under src\components\crypto\
)

echo.
echo Installing dependencies...
cd /d "%PROJECT_DIR%"
call npm install

echo.
echo Starting Vite Dev Server...
call npm run dev

pause
