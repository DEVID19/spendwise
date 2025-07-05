# 💸 SpendWise - Expense Tracker App

SpendWise is a full-stack, mobile-responsive expense tracking application that allows users to manage personal expenses securely and visually. It supports user authentication, real-time data storage, chart analytics, and a modern UI/UX optimized for performance.

🔗 **Live Demo**: [https://spendwise-delta.vercel.app](https://spendwise-delta.vercel.app)

---

## 🚀 Features

- 🔐 **Authentication System**
  - Sign up & login using email/password
  - Google OAuth login with popup and mobile redirect handling
  - Firebase `onAuthStateChanged` listener for real-time session tracking

- 👤 **User Profile**
  - Google users get auto-filled name & photo
  - Email/password users can upload their own profile picture (hosted on Cloudinary)
  - Ability to update name and image after login

- 💼 **Expense Management**
  - Add, edit, and delete expenses
  - Filter and sort expenses by user ID
  - Stored securely per user in Firestore

- 📊 **Dashboard Analytics**
  - Pie chart visualizations using Recharts
  - Summarizes user spending by category

- ☁️ **Cloud & Real-Time**
  - Firebase Firestore used as real-time database
  - All operations reflect instantly across sessions/devices

- ⚡ **UI & UX Enhancements**
  - Toast notifications with `react-hot-toast`
  - Modern, mobile-first UI with Tailwind CSS
  - Fully responsive for mobile, tablet, and desktop

- 🔒 **Protected Routes & Data**
  - Firestore security rules prevent cross-user access
  - Context-based route protection for dashboard pages

- 🌍 **Deployment & SEO**
  - Hosted on Vercel
  - Fast-loading and production-optimized
  - Custom SEO titles, descriptions, and favicons

---

## 🛠 Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS
- **Routing:** React Router DOM
- **Authentication:** Firebase Auth (Email/Password, Google OAuth)
- **Database:** Firebase Firestore (per-user documents)
- **File Storage:** Cloudinary (for profile images)
- **Charts:** Recharts (for pie chart data)
- **Notifications:** react-hot-toast
- **Deployment:** Vercel

---

## 📁 Project Structure

src/
├── assets/ # Static icons or default images
├── components/ # Reusable UI components
├── context/ # Auth and ExpenseContext providers
├── lib/ # Firebase configuration
├── pages/ # Login, Signup, Dashboard
├── utils/ # Firestore helper functions
├── App.jsx # Main app layout
├── main.jsx # Vite entry point
└── index.css # Tailwind CSS base styles

----

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/DEVID19/spendwise.git
cd spendwise
npm install
---
### 2. Add Environment Variables

Create a `.env` file in the root directory and paste the following:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name

## 🌟 Give it a Star!

If you liked **SpendWise**, don’t forget to ⭐ the repo — it motivates me to build more awesome projects!

