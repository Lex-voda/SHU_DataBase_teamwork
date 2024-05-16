@echo off
call conda.bat activate base
start cmd /c "python flask/src/app.py & pause"

timeout /t 2

start cmd /c "cd web && npm run dev & pause"

REM 等待一段时间以确保服务器已启动
timeout /t 3

REM 使用 Edge 浏览器打开指定的 URL
start msedge http://localhost:3000