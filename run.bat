@echo off
call conda.bat activate base
start powershell -Command "python flask/src/app.py; pause"

start powershell -Command "cd web; npm run dev; pause"