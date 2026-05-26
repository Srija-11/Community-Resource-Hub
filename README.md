Community Emergency Resource Hub
A real-time disaster response and emergency assistance platform built to support communities during natural disasters and emergencies. The platform enables users to share SOS alerts, find emergency resources, receive verified updates, and access multilingual emergency information.
🚀 Features
🆘 Real-Time SOS System
Share emergency SOS requests with live location tracking
Google Maps integration for viewing alerts
Real-time synchronization using Firebase Firestore
📦 Resource Matching System
Users can post resource needs or offers
Supports food, water, medicine, shelter, and emergency supplies
Live resource updates and tracking
⚠️ Emergency Information Center
Weather alerts using OpenWeatherMap API
Emergency news integration using Google Custom Search API
Verified authority/admin updates through Firestore
Multi-language support using Google Translate API (Hindi & Bengali)
👥 Community Support
Authentication system for secure access
Volunteer and community coordination support
Real-time updates during disasters
🛠️ Tech Stack
Frontend
React.js
HTML5
CSS3
JavaScript
React Router
Backend
Java
Spring Boot
REST APIs
Firebase Authentication
Firebase Firestore
APIs & Integrations
Google Maps API
OpenWeatherMap API
Google Translate API
Google Programmable Search Engine (CSE)
Tools
Git & GitHub
VS Code
Postman
📂 Project Structure
Bash
src/
 ├── components/
 │    ├── SOSForm.jsx
 │    ├── SOSMap.jsx
 │    ├── WeatherAlert.jsx
 │    ├── DisasterNews.jsx
 │    ├── LocalUpdates.jsx
 │    ├── AdminPostForm.jsx
 │    ├── ResourceForm.jsx
 │    └── ResourceList.jsx
 │
 ├── config/
 │    └── firebase.js
 │
 ├── App.js
 └── index.js
🔥 Firebase Collections
sos_alerts
Stores live SOS requests.
resources
Stores resource requests and offers.
authority_updates
Stores verified emergency updates from admins.
⚙️ Installation & Setup
1️⃣ Clone Repository
Bash
git clone https://github.com/your-username/community-resource-hub.git
cd community-resource-hub
2️⃣ Install Dependencies
Bash
npm install
3️⃣ Configure Environment Variables
Create a .env file:
Environment
REACT_APP_WEATHER_API_KEY=your_openweather_api_key
REACT_APP_TRANSLATE_API_KEY=your_google_translate_api_key
REACT_APP_GOOGLE_API_KEY=your_google_cse_api_key
REACT_APP_CSE_ID=your_search_engine_id
4️⃣ Run Project
Bash
npm start
🔐 Firebase Security Rules
JavaScript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /resources/{document} {
      allow read, write: if request.auth != null;
    }

    match /sos_alerts/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /authority_updates/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
🌍 Future Enhancements
Progressive Web App (PWA) support
Offline SOS synchronization
Push notifications
Volunteer coordination dashboard
AI-based disaster prediction
Damage assessment uploads
