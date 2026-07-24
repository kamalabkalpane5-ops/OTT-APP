# 📺 Complete OTT App Publishing Guide

## Quick Summary

Your OTT App needs **3 parts published**:

| Part | Service | Time | Cost |
|------|---------|------|------|
| Frontend (React) | Vercel | 3 min | FREE |
| Backend (Node.js) | Render.com | 10 min | FREE |
| Database (MongoDB) | MongoDB Atlas | 5 min | FREE |

---

## 🗄️ STEP 1: Create MongoDB Database (5 minutes)

### 1.1 Sign Up for MongoDB Atlas
- Go to: **https://www.mongodb.com/cloud/atlas**
- Click **"Sign Up"** → Choose **"GitHub"** (easiest)
- Authorize MongoDB

### 1.2 Create Organization & Project
- Organization name: `OTT App`
- Project name: `ott-app`
- Click **"Create"**

### 1.3 Create Free Database Cluster
- Click **"Create"**
- Select **"FREE"** tier (M0)
- Choose region closest to you
- Click **"Create Cluster"**
- **Wait 3-5 minutes**

### 1.4 Create Database User
1. Left sidebar → **"Database Access"**
2. Click **"Add New Database User"**
3. Username: `ott_user`
4. Password: Create strong password (save it!)
5. Role: `readWriteAnyDatabase`
6. Click **"Add User"**

### 1.5 Allow Network Access
1. Left sidebar → **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
4. Click **"Confirm"**

### 1.6 Get Connection String
1. Go to **"Databases"** tab
2. Click **"Connect"** on your cluster
3. Click **"Drivers"**
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Add `/ott-app` before `?retryWrites`

**Your MongoDB URL will look like:**
```
mongodb+srv://ott_user:MyPassword123@cluster.mongodb.net/ott-app?retryWrites=true&w=majority
```

✅ **Save this URL!**

---

## 🚀 STEP 2: Deploy Backend on Render.com (10 minutes)

### 2.1 Create Render Account
- Go to: **https://render.com**
- Click **"Sign up"** → Choose **"GitHub"**
- Authorize Render

### 2.2 Create Web Service
1. Click **"New +"** button
2. Click **"Web Service"**
3. Find & select **"OTT-APP"** repository
4. Click **"Connect"**

### 2.3 Configure Service
Fill in these fields:

| Field | Value |
|-------|-------|
| Name | `ott-app-backend` |
| Environment | Node |
| Branch | `main` |
| Build Command | `npm install` |
| Start Command | `npm start` |

### 2.4 Add Environment Variables

Click **"Environment"** and add these:

```
PORT
5000

NODE_ENV
production

MONGODB_URI
mongodb+srv://ott_user:MyPassword123@cluster.mongodb.net/ott-app?retryWrites=true&w=majority

JWT_SECRET
your_super_secret_key_12345678901234567890_make_it_random

CORS_ORIGIN
https://ott-app-frontend.vercel.app

JIOTV_API_KEY
your_jiotv_key

AIRTEL_API_KEY
your_airtel_key

TATAPLAY_API_KEY
your_tataplay_key

JIOTV_BASE_URL
https://api.jiotv.com

AIRTEL_BASE_URL
https://api.airtelxtream.com

TATAPLAY_BASE_URL
https://api.tataplay.com
```

### 2.5 Deploy
1. Click **"Create Web Service"**
2. **Wait 5-10 minutes** for deployment
3. When done, you'll see **"Live"** ✅

### 2.6 Get Backend URL
- At top of page, copy your backend URL
- Looks like: `https://ott-app-backend.onrender.com`

✅ **Save this URL!**

### 2.7 Test Backend
Open in browser:
```
https://ott-app-backend.onrender.com/api/health
```

Should show:
```json
{
  "status": "OTT App is running",
  "timestamp": "2024-01-15T10:30:45.123Z"
}
```

✅ **Backend is working!**

---

## 🎨 STEP 3: Update Frontend Code

### 3.1 Update API Calls
Replace all `http://localhost:5000` with your backend URL.

**Files to update:**
- `client/src/App.js`
- `client/src/pages/Home.js`
- `client/src/pages/Browse.js`
- `client/src/pages/Player.js`
- `client/src/pages/MyList.js`
- `client/src/pages/Login.js`
- `client/src/pages/Register.js`

**Example:**

From:
```javascript
fetch('http://localhost:5000/api/auth/me', {
```

To:
```javascript
fetch('https://ott-app-backend.onrender.com/api/auth/me', {
```

### 3.2 Commit & Push
```bash
git add .
git commit -m "Update API URLs for production"
git push
```

---

## 📦 STEP 4: Deploy Frontend on Vercel (3 minutes)

### 4.1 Create Vercel Account
- Go to: **https://vercel.com**
- Click **"Sign Up"** → Choose **"GitHub"**
- Authorize Vercel

### 4.2 Import Project
1. Click **"New Project"**
2. Find & select **"OTT-APP"** repository
3. Click **"Import"**

### 4.3 Configure Deployment

**Root Directory:**
- Click dropdown
- Select **`client`** folder
- Click **"Continue"**

**Build settings** (auto-detected):
- Build Command: `npm run build` ✓
- Output Directory: `build` ✓

### 4.4 Add Environment Variables

Add this variable:
```
REACT_APP_API_URL
https://ott-app-backend.onrender.com
```

(Use your backend URL from Step 2.6)

### 4.5 Deploy
1. Click **"Deploy"**
2. **Wait 2-3 minutes**
3. See **"Congratulations! Your project is deployed"** ✅

### 4.6 Get Frontend URL
- At top, copy your frontend URL
- Looks like: `https://ott-app-frontend.vercel.app`

✅ **Save this URL!**

---

## 🧪 STEP 5: Test Your Live App

### 5.1 Open Your App
Open: `https://ott-app-frontend.vercel.app`

### 5.2 Test Registration
1. Click **"Register"**
2. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: Test@1234
   - Phone: 1234567890
3. Click **"Register"**
4. ✅ Should redirect to home

### 5.3 Test Login
1. Logout
2. Click **"Login"**
3. Email: test@example.com
4. Password: Test@1234
5. Click **"Login"**
6. ✅ Should show home page

### 5.4 Test Features
- ✅ **Home** - Check trending content
- ✅ **Browse** - Try filtering by genre
- ✅ **My List** - Should be empty
- ✅ **Player** - Click any content to play

### 5.5 Check Backend
- Monitor Render dashboard for errors
- Check MongoDB Atlas for data
- Watch for any console errors in browser

---

## 📊 Your Published App URLs

After all steps:

```
🌐 Frontend:
https://ott-app-frontend.vercel.app

🔌 Backend API:
https://ott-app-backend.onrender.com

🗄️ Database:
MongoDB Atlas (mongodb+srv://...)
```

---

## ✅ Verification Checklist

- [ ] MongoDB cluster created and tested
- [ ] Database user credentials working
- [ ] Backend deployed on Render.com
- [ ] Backend `/api/health` endpoint working
- [ ] Frontend code updated with backend URL
- [ ] Frontend deployed on Vercel
- [ ] Frontend URL is accessible
- [ ] Can register a new account
- [ ] Can login successfully
- [ ] Can see content on home page
- [ ] Can browse and filter content
- [ ] No console errors

---

## 🐛 Quick Troubleshooting

**"Cannot connect to database"**
- Check MongoDB connection string
- Verify username/password
- Ensure IP is whitelisted

**"Frontend blank page"**
- Check Vercel build logs
- Open browser DevTools (F12)
- Check Network tab for failed requests

**"API calls failing"**
- Check backend URL in frontend code
- Verify CORS_ORIGIN matches frontend URL
- Check Render backend logs

**"Backend 503 error"**
- Check Render deployment status
- Verify environment variables are set
- Try restarting the service

---

## 🎉 Success! Your App is Live

**Share your live app:**

```
📺 Check out my OTT streaming app!
Frontend: https://ott-app-frontend.vercel.app
Backend API: https://ott-app-backend.onrender.com

Features:
✅ Multi-service content
✅ User authentication
✅ Watchlist management
✅ Real-time tracking

#ReactJS #NodeJS #MongoDB
```

---

## 📚 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **MongoDB Docs:** https://docs.atlas.mongodb.com

**Everything is now LIVE! 🚀**
