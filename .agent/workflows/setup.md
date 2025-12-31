---
description: Initial project setup and dependency installation
---

This workflow performs the initial setup for the GameVerse project.

1. Install root dependencies (if any).
2. Install backend dependencies:
   // turbo

```powershell
cd backend; npm install
```

3. Install frontend dependencies:
   // turbo

```powershell
cd frontend; npm install
```

4. Create default `.env` files from examples (if they exist).
   - If `.env.example` files are present, copy them to `.env`.
