# Quick Start Guide - Discussion Service Production Setup

## 🚀 Quick Setup (5 minutes)

### For Development

1. **Create `frontend/.env`**:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_WS_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

2. **Create `backend/apps/discussion/.env`**:

```bash
DISCUSSION_WS_PORT=8000
ALLOWED_ORIGINS=http://localhost:5173
```

3. **Start services**:

```bash
# Backend
cd backend
npm run start:all

# Frontend (new terminal)
cd frontend
npm run dev
```

### For Production (Docker)

1. **Create `.env` in project root**:

```bash
ALLOWED_ORIGINS=https://yourdomain.com
```

2. **Create `frontend/.env.production`**:

```bash
VITE_API_BASE_URL=https://yourdomain.com/api
VITE_WS_URL=https://yourdomain.com
VITE_GOOGLE_CLIENT_ID=your-production-client-id
```

3. **Deploy**:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📝 What Changed?

### Before

```typescript
// ❌ Hardcoded IP
const newSocket = io("http://192.168.1.103:8000", {...});
```

### After

```typescript
// ✅ Environment-based
const wsUrl = import.meta.env.VITE_WS_URL || "http://localhost:8000";
const newSocket = io(wsUrl, {...});
```

## 🔒 Security Improvements

- ✅ No hardcoded IPs or ports
- ✅ Environment-based CORS configuration
- ✅ Production/Development mode separation
- ✅ Secure credential handling

## 📚 Full Documentation

See `DISCUSSION_PRODUCTION_SETUP.md` for complete details.

## ⚠️ Important Notes

1. **Always use HTTPS in production** - Change `http://` to `https://`
2. **Set ALLOWED_ORIGINS** - Don't use wildcard (`*`) in production
3. **Firewall Configuration** - Ensure port 8000 is accessible
4. **Environment Variables** - Never commit `.env` files to git

## 🐛 Quick Troubleshooting

| Issue                   | Solution                                          |
| ----------------------- | ------------------------------------------------- |
| WebSocket won't connect | Check `VITE_WS_URL` matches your backend URL      |
| CORS errors             | Add your domain to `ALLOWED_ORIGINS`              |
| 404 on socket.io        | Verify discussion service is running on port 8000 |

## ✅ Verification

After setup, check:

1. Browser console shows "Connected" with socket ID
2. No CORS errors in console
3. Messages send/receive in real-time
4. User join/leave events work

## 🆘 Need Help?

Check these files:

- `backend/apps/discussion/DEPLOYMENT.md` - Detailed deployment guide
- `DISCUSSION_PRODUCTION_SETUP.md` - Complete configuration reference
