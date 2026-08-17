@echo off
setlocal
cd /d "%~dp0"

echo ========================================
echo          CARVELLO AI - START
echo ========================================

where git >nul 2>&1
if not errorlevel 1 (
  if exist ".git" (
    echo [UPDATE] Verific ultima versiune din GitHub...
    git pull --ff-only origin main
    if errorlevel 1 echo [WARN] Update GitHub nereusit. Pornesc versiunea locala.
  )
) else (
  echo [WARN] Git nu este in PATH. Pornesc versiunea locala.
)

where node >nul 2>&1
if errorlevel 1 (
  echo [EROARE] Node.js nu este instalat sau nu este in PATH.
  pause
  exit /b 1
)

start "Carvello AI Server" /min cmd /c "node scripts\serve.js"
powershell -NoProfile -Command "$u='http://127.0.0.1:4173'; for($i=0;$i -lt 40;$i++){try{$r=Invoke-WebRequest -UseBasicParsing -Uri $u -TimeoutSec 1;if($r.StatusCode -eq 200){exit 0}}catch{};Start-Sleep -Milliseconds 250};exit 1"
if errorlevel 1 (
  echo [EROARE] Serverul Carvello AI nu a pornit.
  pause
  exit /b 1
)

start "" "http://127.0.0.1:4173"
exit /b 0
