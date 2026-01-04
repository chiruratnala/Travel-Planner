# ✈️ Travel Planner AI - Smart Travel Planner

**Travel Planner AI** is an intelligent web application that generates personalized travel itineraries in seconds using Google's Gemini AI. It allows users to login securely, plan trips based on interests, and save their favorite journeys to the cloud.

<img width="1365" height="745" alt="Screenshot (400)" src="https://github.com/user-attachments/assets/8b232c44-6986-4c11-92a2-b01c35646f1c" />

https://travel-plannerai.netlify.app/

## 🌟 Features

* **AI-Powered Itineraries:** Generates day-by-day travel plans including timing, locations, and descriptions using Google Gemini models.
* **Smart Customization:** Tailors trips based on destination, duration and specific interests (e.g., Food, History, Adventure).
* **Authentication:**
    * 🔵 **Google Sign-In:** One-click secure login.
* **Cloud Sync:** Automatically saves and retrieves trip history using Firebase Realtime Database.
* **Hotel Recommendations:** Options to include or exclude stay suggestions.
* **Interactive UI:** Fully responsive design built with Tailwind CSS, featuring loading animations and clean typography.
* **Map Integration:** Direct links to Google Maps for every location and hotel.

## 🛠️ Tech Stack

* **Frontend:** HTML5, JavaScript (ES6 Modules)
* **Styling:** Tailwind CSS (via CDN), Material Icons, Lucide Icons
* **AI Engine:** Google Gemini API (gemini-1.5-flash)
* **Backend & Auth:** Google Firebase (Authentication & Realtime Database)
* **Hosting:** Netlify 

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
* A code editor (VS Code recommended).
* A Google Cloud Project with **Gemini API** enabled.
* A **Firebase** project.

### Installation

1.  **Clone the repository** (or download files):
    ```bash
    git clone [https://github.com/chiruratnala/Travel-Planner.git]
    ```

2.  **Open the project folder** in VS Code.

3.  **Configure API Keys:**
    Open `index.html` and locate the configuration sections. You need to replace the placeholder keys with your own:

    * **Firebase Config:**
        ```javascript
        const firebaseConfig = {
            apiKey: "YOUR_FIREBASE_API_KEY",
            authDomain: "your-project.firebaseapp.com",
            projectId: "your-project-id",
            // ... other config
        };
        ```
    * **Gemini API Key:**
        ```javascript
        const apiKey = "YOUR_GEMINI_API_KEY";
        ```

4.  **Run the App:**
    * Use the **Live Server** extension in VS Code to run `index.html`.
    * *Note: Phone Authentication requires the app to run on `localhost` or a hosted HTTPS domain.*

## ⚙️ Configuration Guide

### 1. Firebase Setup
* Go to [Firebase Console](https://console.firebase.google.com/).
* **Authentication:** Enable **Google** and **Phone** providers.
    * *Tip:* For Phone Auth without billing, add a **Test Number** in Firebase settings (e.g., `+919999999999` with code `123456`).
* **Database:** Create a **Realtime Database** and set rules to:
    ```json
    {
      "rules": {
        "users": {
          "$uid": {
            ".read": "$uid === auth.uid",
            ".write": "$uid === auth.uid"
          }
        }
      }
    }
    ```

### 2. Google Cloud (Gemini)
* Get your API key from [Google AI Studio](https://aistudio.google.com/).
* **Security:** Restrict your API key in Google Cloud Console to your specific domains (`localhost`, `your-netlify-app.app`) to prevent unauthorized use.

## 📸 Screenshots
## Example itinerary


<img width="1978" height="1232" alt="travel-plannerai netlify app_ (2)" src="https://github.com/user-attachments/assets/bf661c2e-277e-4df8-a96d-0cef263d3032" />
<img width="1978" height="6982" alt="travel-plannerai netlify app_" src="https://github.com/user-attachments/assets/d68443f1-ac53-4be9-b6d4-16ddfafaa8d6" />


## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

## 📄 License

This project is open-source and available for educational purposes.

---
*Built with ❤️ by Chiru Ratnala*
