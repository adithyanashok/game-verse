---
description: Deploy the development stack locally
---

This workflow guides you through deploying the entire GameVerse stack locally using Docker Compose.

1. Ensure Docker Desktop is running.
2. Navigate to the project root.
3. Verify that `.env` files exist in each microservice directory:
   - `backend/apps/auth/.env`
   - `backend/apps/game/.env`
   - `backend/apps/review/.env`
   - `backend/apps/user/.env`
   - `backend/apps/discussion/.env`
     // turbo
4. Run the following command to start the stack in detached mode:

```powershell
docker compose up -d --build
```

5. Check the status of the containers:

```powershell
docker compose ps
```

6. Access the services:
   - Frontend: `http://localhost:5173`
   - API Gateway: `http://localhost:3000`
