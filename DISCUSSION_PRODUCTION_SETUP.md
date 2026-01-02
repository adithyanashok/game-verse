# Discussion Service - Production Configuration Summary

## Changes Made

### 1. Frontend Changes

**File: `frontend/src/pages/Discussions/Discussion.tsx`**

- Replaced hardcoded IP `http://192.168.1.103:8000` with environment variable
- Now uses: `import.meta.env.VITE_WS_URL || "http://localhost:8000"`

**New Files:**

- `frontend/.env.example` - Development environment template
- `frontend/.env.production.example` - Production environment template

### 2. Backend Changes

**File: `backend/apps/discussion/src/main.ts`**

- Added environment variable support for WebSocket port
- Changed from hardcoded `8000` to `process.env.DISCUSSION_WS_PORT || 8000`
- Now binds to `0.0.0.0` for Docker compatibility
- Added console logging for debugging

**File: `backend/apps/discussion/src/events/events.gateway.ts`**

- Updated CORS configuration to be environment-aware
- Development: Allows all origins (`*`)
- Production: Uses `ALLOWED_ORIGINS` environment variable
- Added credentials support for secure cookies

**New Files:**

- `backend/apps/discussion/.env.example` - Environment template
- `backend/apps/discussion/DEPLOYMENT.md` - Comprehensive deployment guide

### 3. Docker Configuration

**File: `docker-compose.prod.yml`**

- Added `DISCUSSION_WS_PORT=8000` environment variable
- Added `ALLOWED_ORIGINS` environment variable with fallback
- Set `NODE_ENV=production`

## Setup Instructions

### Development

1. **Frontend** - Create `frontend/.env`:

   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_WS_URL=http://localhost:8000
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   ```

2. **Backend** - Create `backend/apps/discussion/.env`:

   ```env
   DISCUSSION_WS_PORT=8000
   ALLOWED_ORIGINS=http://localhost:5173
   ```

3. Run your services as usual

### Production Deployment

#### Option 1: Using Docker Compose (Recommended)

1. **Create environment file** at project root (`.env`):

   ```env
   ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```

2. **Update frontend environment** (`frontend/.env.production`):

   ```env
   VITE_API_BASE_URL=https://yourdomain.com/api
   VITE_WS_URL=https://yourdomain.com
   VITE_GOOGLE_CLIENT_ID=your-production-google-client-id
   ```

3. **Build and deploy**:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

#### Option 2: Manual Deployment

1. **Backend**:

   - Set environment variables:
     ```bash
     export NODE_ENV=production
     export DISCUSSION_WS_PORT=8000
     export ALLOWED_ORIGINS=https://yourdomain.com
     ```
   - Ensure port 8000 is accessible
   - Configure firewall/security groups

2. **Frontend**:
   - Build with production environment:
     ```bash
     cd frontend
     VITE_WS_URL=https://yourdomain.com npm run build
     ```

#### Option 3: Behind Reverse Proxy (Nginx)

1. **Nginx Configuration**:

   ```nginx
   # WebSocket proxy
   location /socket.io/ {
       proxy_pass http://localhost:8000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_cache_bypass $http_upgrade;
   }
   ```

2. **Frontend**: Set `VITE_WS_URL=https://yourdomain.com`

3. **Backend**: Set `ALLOWED_ORIGINS=https://yourdomain.com`

## Security Considerations

### ✅ Implemented

- Environment-based configuration (no hardcoded IPs)
- CORS restrictions in production
- JWT authentication for WebSocket connections
- Credentials support for secure cookies

### 🔒 Recommended Additional Steps

1. **Use HTTPS/WSS**: In production, ensure you're using secure protocols
2. **Rate Limiting**: Implement rate limiting for WebSocket connections
3. **Monitoring**: Set up logging and monitoring for WebSocket connections
4. **Firewall Rules**: Only expose necessary ports
5. **SSL/TLS**: Use valid SSL certificates for production

## Environment Variables Reference

### Frontend

| Variable                | Description            | Example                          |
| ----------------------- | ---------------------- | -------------------------------- |
| `VITE_API_BASE_URL`     | API Gateway URL        | `https://api.yourdomain.com/api` |
| `VITE_WS_URL`           | WebSocket server URL   | `https://yourdomain.com`         |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID | `your-client-id`                 |

### Backend (Discussion Service)

| Variable             | Description           | Default   | Example                  |
| -------------------- | --------------------- | --------- | ------------------------ |
| `DISCUSSION_WS_PORT` | WebSocket server port | `8000`    | `8000`                   |
| `ALLOWED_ORIGINS`    | CORS allowed origins  | `*` (dev) | `https://yourdomain.com` |
| `NODE_ENV`           | Environment mode      | -         | `production`             |

## Testing

### Local Testing

1. Start backend: `npm run start:all`
2. Start frontend: `npm run dev`
3. Navigate to discussions and verify WebSocket connection

### Production Testing

1. Check WebSocket connection in browser console
2. Verify CORS headers are correct
3. Test real-time messaging functionality
4. Monitor server logs for connection issues

## Troubleshooting

### Connection Issues

- **Error**: "WebSocket connection failed"
  - **Solution**: Check `VITE_WS_URL` is correct and accessible
  - Verify firewall allows port 8000

### CORS Errors

- **Error**: "CORS policy blocked"
  - **Solution**: Add your frontend domain to `ALLOWED_ORIGINS`
  - Ensure protocol (http/https) matches

### Authentication Errors

- **Error**: "Unauthorized WebSocket connection"
  - **Solution**: Verify JWT token is being sent correctly
  - Check token expiration

## Migration Notes

If you're migrating from the old hardcoded setup:

1. **No code changes needed** - Just set environment variables
2. **Backward compatible** - Falls back to localhost:8000 if env var not set
3. **Gradual rollout** - Can deploy backend first, then frontend

## Support

For issues or questions, refer to:

- `backend/apps/discussion/DEPLOYMENT.md` - Detailed deployment guide
- Frontend `.env.example` files - Configuration templates
- Backend `.env.example` files - Configuration templates
