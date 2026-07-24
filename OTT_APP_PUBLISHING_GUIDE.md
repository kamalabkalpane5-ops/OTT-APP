# 📺 How to Publish OTT App - Complete Tutorial

## Overview

Your OTT App has 3 parts that need to be published separately:

1. **Frontend** (React) → Deploy on Vercel
2. **Backend** (Node.js + Express) → Deploy on Render.com
3. **Database** (MongoDB) → Use MongoDB Atlas

---

## 📊 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Your Users Access                                     │
│  https://ott-frontend.vercel.app                       │
│           ↓                                             │
│  ┌────────────────────────────────────────────────┐   │
│  │        React Frontend (Vercel)                 │   │
│  │  - Home, Browse, Player pages                  │   │
│  │  - Login/Register                              │   │
│  │  - Watchlist management                        │   │
│  └────────────────────────────────────────────────┘   │
│           ↓                                             │
│  Makes API Calls to                                    │
│  https://ott-backend.onrender.com/api/...             │
│           ↓                                             │
│  ┌────────────────────────────────────────────────┐   │
│  │     Node.js Backend (Render.com)               │   │
│  │  - Authentication                              │   │
│  │  - Content management                          │   │
│  │  - User profiles                               │   │
│  │  - Service integration                         │   │
│  └────────────────────────────────────────────────┘   │
│           ↓                                             │
│  Connects to Database                                  │
│  mongodb+srv://user:pass@cluster.mongodb.net/...      │
│           ↓                                             │
│  ┌────────────────────────────────────────────────┐   │
│  │     MongoDB Atlas (Cloud Database)             │   │
│  │  - Users collection                            │   │
│  │  - Content collection                          │   │
│  │  - Watchlist data                              │   │
│  └────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Pre-Deployment Checklist

Before publishing, make sure:

- [ ] All code committed to GitHub
- [ ] No `.env` file in repository (only `.env.example`)
- [ ] App works locally with `npm run dev`
- [ ] No console errors
- [ ] All API endpoints tested

---

## 🗄️ STEP 1: Set Up MongoDB Database

### 1.1 Create MongoDB Atlas Account

1. Go to: **https://www.mongodb.com/cloud/atlas**
2. Click **"Try Free"** or **"Sign Up"**
3. Choose **"Sign up with GitHub"** (easier)
4. Click **"Authorize mongodbinc"**

### 1.2 Create Organization

1. Enter organization name: `OTT App`
2. Click **"Create Organization"**

### 1.3 Create Project

1. Click **"Create a New Project"**
2. Project name: `ott-app`
3. Click **"Create Project"**

### 1.4 Create Cluster (Database)

1. Click **"Create"** button
2. Select **"FREE"** tier (M0 Sandbox)
3. Choose your region:
   - If in India: Asia/Mumbai
   - If in USA: US/Virginia
   - Default is fine
4. Click **"Create Cluster"**
5. **Wait 3-5 minutes** for cluster to be created

### 1.5 Create Database User

1. On left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. **Username:** `ott_user`
4. **Password:** Create a strong password (save this!)
5. **Built-in Role:** Select `readWriteAnyDatabase`
6. Click **"Add User"**

### 1.6 Whitelist IP Address

1. On left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - Or enter specific IP if you know it
4. Click **"Confirm"**

### 1.7 Get Connection String

1. Go to **"Databases"** tab
2. Click **"Connect"** button on your cluster
3. Click **"Drivers"**
4. Under "Node.js" section, copy the connection string
5. It looks like:
   ```
   mongodb+srv://ott_user:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Add database name at end: `...net/ott-app?retryWrites...`
8. **Save this connection string!** ✅

**Example:**
```
mongodb+srv://ott_user:MyPassword123@cluster.mongodb.net/ott-app?retryWrites=true&w=majority
```

---

## 🚀 STEP 2: Deploy Backend on Render.com

### 2.1 Create Render Account

1. Go to: **https://render.com**
2. Click **"Sign up"**
3. Choose **"GitHub"**
4. Click **"Authorize"** on GitHub
5. Complete signup

### 2.2 Create New Web Service

1. Click **"New +"** button (top right)
2. Click **"Web Service"**
3. Under "Connect a repository":
   - Find and select **`OTT-APP`**
   - Click **"Connect"**

### 2.3 Configure Service

Fill in the form:

**Name:** `ott-app-backend`

**Environment:** Node

**Region:** Choose closest to you

**Branch:** `main`

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

**Instance Type:** Free (or paid if you want)

### 2.4 Add Environment Variables

1. Scroll down to **"Environment"** section
2. Click **"Add Environment Variable"**
3. Add these variables one by one:

```
KEY: PORT
VALUE: 5000

KEY: NODE_ENV
VALUE: production

KEY: MONGODB_URI
VALUE: mongodb+srv://ott_user:MyPassword123@cluster.mongodb.net/ott-app?retryWrites=true&w=majority

KEY: JWT_SECRET
VALUE: your_super_secret_key_make_it_long_and_random_12345678901234567890

KEY: CORS_ORIGIN
VALUE: https://ott-app-frontend.vercel.app
(We'll get this URL soon)

KEY: JIOTV_API_KEY
VALUE: your_api_key_here

KEY: AIRTEL_API_KEY
VALUE: your_api_key_here

KEY: TATAPLAY_API_KEY
VALUE: your_api_key_here

KEY: JIOTV_BASE_URL
VALUE: https://api.jiotv.com

KEY: AIRTEL_BASE_URL
VALUE: https://api.airtelxtream.com

KEY: TATAPLAY_BASE_URL
VALUE: https://api.tataplay.com
```

### 2.5 Deploy Backend

1. Click **"Create Web Service"**
2. **Wait 5-10 minutes** for deployment
3. You'll see: **"Live"** ✅
4. Your backend URL appears at top:
   ```
   https://ott-app-backend.onrender.com
   ```
5. **Save this URL!** ✅

### 2.6 Test Backend

Open in browser:
```
https://ott-app-backend.onrender.com/api/health
```

You should see:
```json
{
  "status": "OTT App is running",
  "timestamp": "2024-01-15T10:30:45.123Z"
}
```

✅ **Backend is working!**

---

## 🎨 STEP 3: Deploy Frontend on Vercel

### 3.1 Create Vercel Account

1. Go to: **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"GitHub"**
4. Click **"Authorize"**
5. Complete signup

### 3.2 Import OTT-APP Repository

1. Click **"New Project"**
2. Find and click **"OTT-APP"** repository
3. Click **"Import"**

### 3.3 Configure Deployment

In the configuration page:

**Root Directory:**
- Click the folder dropdown
- Select **`client`**
- Click **"Continue"**

**Build Settings:** (Should auto-detect)
- Build Command: `npm run build`
- Output Directory: `build`

**Environment Variables:**
Add this variable:
```
KEY: REACT_APP_API_URL
VALUE: https://ott-app-backend.onrender.com
```

(Use the backend URL from Step 2.5)

### 3.4 Deploy Frontend

1. Click **"Deploy"**
2. **Wait 2-3 minutes**
3. You'll see: **"Congratulations! Your project is deployed"** ✅
4. Your frontend URL:
   ```
   https://ott-app-frontend.vercel.app
   ```
5. **Save this URL!** ✅

---

## 🔗 STEP 4: Connect Frontend to Backend

### 4.1 Update API Calls in Frontend

Now that you have both URLs, update the frontend code to use the backend URL.

**Find all API calls in `client/src/`:**

Look for files that have:
```javascript
'http://localhost:5000'
```

Replace with your backend URL:
```javascript
'https://ott-app-backend.onrender.com'
```

**Files to update:**
- `client/src/App.js`
- `client/src/pages/Home.js`
- `client/src/pages/Browse.js`
- `client/src/pages/Player.js`
- `client/src/pages/MyList.js`
- `client/src/pages/Login.js`
- `client/src/pages/Register.js`

**Example change:**

From:
```javascript
fetch('http://localhost:5000/api/auth/me', {
  headers: { 'Authorization': `Bearer ${token}` }
})
```

To:
```javascript
fetch('https://ott-app-backend.onrender.com/api/auth/me', {
  headers: { 'Authorization': `Bearer ${token}` }
})
```

### 4.2 Commit and Push Changes

```bash
git add .
git commit -m "Update API URLs for production"
git push
```

### 4.3 Vercel Auto-Redeploy

- Vercel will automatically redeploy
- Wait 2-3 minutes
- Check deployment status on Vercel dashboard

---

## 🧪 STEP 5: Test Your Live OTT App

### 5.1 Test Frontend

1. Open: `https://ott-app-frontend.vercel.app`
2. You should see the login page ✅

### 5.2 Test Registration

1. Click **"Register"**
2. Fill in details:
   - Name: Test User
   - Email: test@example.com
   - Password: Test@1234
   - Phone: 1234567890
3. Click **"Register"**
4. You should be redirected to home page ✅

### 5.3 Test Login

1. Logout
2. Login with test credentials ✅
3. You should see your name in header ✅

### 5.4 Test Content

1. Check **"Home"** - should show trending content ✅
2. Check **"Browse"** - should be able to filter ✅
3. Check **"My List"** - should be empty ✅

### 5.5 Monitor Backend

Go to Render dashboard:
- Check logs for any errors
- Monitor CPU/Memory usage
- Check if database connection is working

---

## 📊 Your Published URLs

After all steps:

```
🌐 Frontend:
https://ott-app-frontend.vercel.app

🔌 Backend API:
https://ott-app-backend.onrender.com

🗄️ Database:
MongoDB Atlas (cloud hosted)
```

---

## 🐛 Troubleshooting

### "Cannot connect to database"

**Problem:** Backend can't connect to MongoDB

**Solution:**
1. Check MongoDB connection string is correct
2. Verify username and password
3. Check IP is whitelisted in MongoDB Atlas
4. Try connecting manually:
   ```bash
   mongosh "mongodb+srv://ott_user:password@cluster.mongodb.net/ott-app"
   ```

### "CORS error: Access blocked"

**Problem:** Frontend can't call backend

**Solution:**
1. Check `CORS_ORIGIN` in backend environment variables
2. Must match frontend URL exactly
3. Redeploy backend after updating

### "Frontend shows blank page"

**Problem:** Build failed or routing issue

**Solution:**
1. Check Vercel build logs
2. Check browser console for errors
3. Check network tab for failed requests
4. Clear browser cache

### "Backend 503 Service Unavailable"

**Problem:** Backend not running

**Solution:**
1. Check Render deployment status
2. Check for build errors in logs
3. Verify start command is correct
4. Try restarting service

### "Environment variables not working"

**Problem:** Variables showing as undefined

**Solution:**
1. Verify variables are set correctly in dashboard
2. Redeploy after adding variables
3. For React: Variables must start with `REACT_APP_`
4. Restart application

---

## 📈 Performance Tips

### Optimize Frontend
- Enable Vercel Analytics
- Use Next.js Image Optimization
- Lazy load components

### Optimize Backend
- Add caching headers
- Use database indexes
- Monitor request logs

### Monitor Database
- Check query performance
- Monitor storage usage
- Set up alerts

---

## 🔐 Security Considerations

### Before Going Live

✅ Never commit `.env` file
✅ Use strong JWT secret
✅ Enable HTTPS (automatic with Vercel/Render)
✅ Validate all user inputs
✅ Rate limit API endpoints
✅ Use environment variables for sensitive data
✅ Regular security updates
✅ Monitor for suspicious activity

---

## 📱 Share Your App!

Now that your app is live, share it:

### On GitHub
```markdown
## 🚀 Live Deployment

**Frontend:** https://ott-app-frontend.vercel.app
**Backend API:** https://ott-app-backend.onrender.com

### Features
- Multi-service content aggregation
- User authentication & profiles
- Watchlist management
- Real-time playback tracking
- Service integration (JioTV, AirtelXtream, Tata Play)
```

### On LinkedIn/Twitter
```
🎉 Just launched my OTT streaming app!

Features:
✅ Multi-service content aggregation
✅ Real-time user tracking
✅ Secure authentication
✅ Beautiful UI

Check it out: https://ott-app-frontend.vercel.app

#ReactJS #NodeJS #MongoDB #Vercel
```

### On Portfolio/Resume
Add with links and description of features

---

## ✅ Final Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user credentials saved
- [ ] Backend deployed on Render
- [ ] Backend URL working
- [ ] Frontend deployed on Vercel
- [ ] Frontend URL working
- [ ] Frontend configured with backend URL
- [ ] Tested registration/login
- [ ] Tested content loading
- [ ] Tested watchlist functionality
- [ ] Shared on social media
- [ ] Added to portfolio

---

## 🎓 Next Steps

1. Monitor your live app for errors
2. Get user feedback
3. Fix bugs as they appear
4. Add new features
5. Optimize performance
6. Scale infrastructure as needed

---

**Congratulations! Your OTT App is now live on the internet! 🎉**

Share the URLs with friends and family!
