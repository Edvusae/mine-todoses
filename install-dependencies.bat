@echo off
echo 🚀 Installing missing dependencies for Task Management App...
echo.

npm install class-variance-authority clsx lucide-react mongoose recharts tailwind-merge date-fns tailwindcss-animate

if %errorlevel% equ 0 (
    echo.
    echo ✅ All dependencies installed successfully!
    echo.
    echo 📋 Next steps:
    echo 1. Copy all the provided files to their correct locations
    echo 2. Update your .env.local with your MongoDB URI
    echo 3. Run 'npm run dev' to start the development server
    echo.
) else (
    echo.
    echo ❌ Installation failed. Please check the errors above.
    exit /b 1
)

pause