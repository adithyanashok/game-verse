# Discussion Service Configuration Guide

## Overview

The Discussion service uses WebSocket connections for real-time communication. This guide explains how to configure it for different environments.

## Environment Variables

### Backend (Discussion Service)

Create a `.env` file in `backend/apps/discussion/` with:

```env
DISCUSSION_WS_PORT=8000
```

### Frontend

Create a `.env` file in `frontend/` with:

```env
# Development
VITE_WS_URL=http://localhost:8000

# Production
VITE_WS_URL=https://your-domain.com
```

## Development Setup

1. **Backend**: The discussion service will run on port 8000 by default
2. **Frontend**: Set `VITE_WS_URL=http://localhost:8000` in your `.env` file

## Production Deployment

### Option 1: Direct Deployment

1. **Backend**:
   - Set `DISCUSSION_WS_PORT=8000` in your environment
   - Ensure port 8000 is accessible from the internet
   - Configure your firewall/security groups accordingly

2. **Frontend**:
   - Set `VITE_WS_URL` to your production domain (e.g., `https://api.yourdomain.com`)
   - Build the frontend with production environment variables

### Option 2: Behind Reverse Proxy (Recommended)

If using nginx or similar:

1. **Configure nginx** to proxy WebSocket connections:

```nginx
location /socket.io/ {
    proxy_pass http://discussion:8000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

2. **Frontend**: Set `VITE_WS_URL=https://yourdomain.com`

### Option 3: Docker Compose (Current Setup)

The `docker-compose.prod.yml` is already configured:

1. Discussion service exposes port 8000
2. Set `VITE_WS_URL` in frontend environment to point to your domain
3. Ensure your domain/load balancer routes WebSocket traffic to port 8000

## CORS Configuration

If your frontend and backend are on different domains, ensure CORS is properly configured in the discussion service.

## Security Considerations

1. **Use HTTPS/WSS in production**: Change `http://` to `https://` in production
2. **Authentication**: The service uses JWT tokens passed in the query string
3. **Rate Limiting**: Consider implementing rate limiting for WebSocket connections
4. **Firewall**: Only expose necessary ports

## Troubleshooting

### Connection Refused

- Check if the discussion service is running
- Verify the port is accessible
- Check firewall rules

### CORS Errors

- Ensure the frontend domain is whitelisted in the backend
- Check that credentials are being sent correctly

### WebSocket Upgrade Failed

- Verify your reverse proxy supports WebSocket upgrades
- Check that the `Upgrade` and `Connection` headers are being forwarded
