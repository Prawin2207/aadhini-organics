@echo off
title Aadhini Organics server
cd /d "%~dp0server"

rem Find Node.js: use PATH first, then the default install location
set "NODE=node"
where node >nul 2>nul
if errorlevel 1 (
  if exist "C:\Program Files\nodejs\node.exe" (
    set "NODE=C:\Program Files\nodejs\node.exe"
    set "PATH=C:\Program Files\nodejs;%PATH%"
  ) else (
    echo Node.js was not found. Install it from https://nodejs.org and try again.
    pause
    exit /b 1
  )
)

if not exist node_modules (
  echo Installing server packages...
  call npm install
)

echo Starting Aadhini Organics...
echo The browser will open at http://localhost:5000 once the server is ready.
echo Keep this window open while using the site. Close it to stop the server.
echo.

rem Open the browser after the server has had a few seconds to start
start "" /min cmd /c "timeout /t 4 /nobreak >nul & start http://localhost:5000"

"%NODE%" index.js
echo.
echo ------------------------------------------------------------
echo The server stopped. If you see "EADDRINUSE" above, the site is
echo already running in another window - just open http://localhost:5000
echo ------------------------------------------------------------
pause
