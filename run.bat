@echo off
call conda.bat activate base
start cmd /k "python flask/src/app.py"

start cmd /k "cd web && npm run dev"