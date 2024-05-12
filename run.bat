@echo off
call conda.bat activate base
start cmd /k "cd web && npm run dev"
start cmd /k "python flask/src/app.py"