# Cloudflare Deployment Quick Start

Use this guide to run the app with:
- Frontend on **Cloudflare Pages**
- Backend via **Cloudflare Tunnel**

---

## 1) Frontend (Cloudflare Pages)

Create a Pages project from this repository.

- **Project root:** `my-website`
- **Build command:** `npm run build`
- **Build output directory:** `dist`

Set this environment variable in Pages:

```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

---

## 2) Backend (Node/Express)

On the machine where backend will run:

```powershell
npm --prefix server install
npm --prefix server run start
```

Create `server/.env` (example values):

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bin_aziz?retryWrites=true&w=majority
JWT_SECRET=replace-with-strong-secret
JWT_EXPIRES_IN=7d
CORS_ORIGINS=https://your-project.pages.dev,https://www.yourdomain.com
```

---

## 3) Cloudflare Tunnel for API

Install cloudflared (Windows):

```powershell
winget install Cloudflare.cloudflared
```

Authenticate and create tunnel:

```powershell
cloudflared tunnel login
cloudflared tunnel create binaziz-api
cloudflared tunnel route dns binaziz-api api.yourdomain.com
```

Edit file `server/cloudflared.config.example.yml`:
- set `credentials-file` path to your generated tunnel JSON file
- keep hostname as `api.yourdomain.com`
- keep service as `http://localhost:5000`

Run tunnel:

```powershell
cloudflared tunnel run --config server/cloudflared.config.example.yml binaziz-api
```

---

## 4) Verify

- Open frontend: `https://your-project.pages.dev`
- Health endpoint: `https://api.yourdomain.com/api/health`
- Signup/login should work from frontend without CORS errors

---

## 5) Keep production safe

- Use `develop` for testing changes
- Merge to `main` only when ready for live release
