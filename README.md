Nice project 👍 — it just needs a **cleaner, more “production-ready” README** that recruiters/interviewers enjoy skimming.

Below is a **polished, well-structured README** you can directly replace your current one with.
It explains *what*, *why*, *how*, and *architecture* clearly — without overselling AI.

---

# AI Email Reply Generator 📧✨

A full-stack application that generates contextual email replies using a generative AI model.
It includes a **Spring Boot backend**, a **React + Vite frontend**, and a **demo browser extension** that integrates with Gmail.

This project demonstrates how to integrate a modern frontend with a reactive Java backend and an external AI API.

---

## ✨ Features

* Generate AI-powered email replies based on:

  * Email content
  * Desired tone (professional, casual, friendly, etc.)
* Reactive, non-blocking backend using **Spring WebFlux**
* Clean React UI built with **Vite + Material UI**
* Demo **browser extension** that injects an “AI Reply” button into Gmail
* Modular and extensible architecture

---

## 🏗️ Architecture Overview

```
Frontend (React + Vite)
        |
        |  HTTP POST
        v
Backend (Spring Boot + WebClient)
        |
        |  REST API Call
        v
Generative AI API (Gemini)
```

### Flow

1. User enters email content and tone in the UI (or Gmail).
2. Frontend sends a request to the backend.
3. Backend builds a prompt and calls the generative AI API.
4. AI response is parsed and returned to the frontend.
5. Generated reply is displayed to the user.

---

## 📁 Repository Structure

```
AiEmailReplyGenerator/
├── email-writer/                # Spring Boot backend
│   ├── src/main/java/com/email/writer
│   │   ├── EmailWriterApplication.java
│   │   ├── EmailGeneratorController.java
│   │   ├── EmailGeneratorService.java
│   │   ├── WebClientConfig.java
│   │   └── EmailRequest.java
│   └── src/main/resources
│       └── application.properties
│
├── email-writer-frontend/       # React + Vite frontend
│   ├── src/App.jsx
│   ├── src/main.jsx
│   └── vite.config.js
│
└── hello-world-ext/             # Browser extension demo
    ├── content.js
    ├── popup.js
    └── hello.html
```

---

## 🔧 Tech Stack

### Backend

* Java 17+
* Spring Boot
* Spring WebFlux
* WebClient
* Maven

### Frontend

* React
* Vite
* Material UI
* Axios

### AI

* Google Gemini Generative API

### Other

* Chrome/Firefox Extension (Demo)

---

## ⚙️ Configuration

The backend requires the following properties:

```properties
# Server
server.port=8080

# Gemini API configuration
gemini.api.url=https://generativelanguage.googleapis.com
gemini.api.key=YOUR_API_KEY_HERE
```

📌 **Important**

* Keep your API key secret.
* The model endpoint used:

  ```
  /v1beta/models/gemini-2.5-flash:generateContent
  ```
* You can change the model or endpoint inside `EmailGeneratorService`.

---

## ▶️ Running the Project Locally

### 1️⃣ Backend (Spring Boot)

```bash
cd email-writer
mvn spring-boot:run
```

Or build a JAR:

```bash
mvn clean package
java -jar target/*.jar
```

📍 Backend runs at:

```
http://localhost:8080
```

#### Test with curl

```bash
curl -X POST http://localhost:8080/api/email/generate \
  -H "Content-Type: application/json" \
  -d '{"emailContent":"Can we schedule a meeting?","tone":"professional"}'
```

---

### 2️⃣ Frontend (React + Vite)

```bash
cd email-writer-frontend
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

⚠️ Make sure the backend is running on port `8080`.

---

### 3️⃣ Browser Extension (Optional Demo)

* Open Chrome → Extensions → Developer Mode
* Click **Load unpacked**
* Select `hello-world-ext/`
* Open Gmail → Compose → AI Reply button appears

📌 Backend **must be running** for the extension to work.

---

## 🔍 Key Backend Components

* **EmailGeneratorController**

  * Exposes `/api/email/generate`
  * Handles frontend and extension requests

* **EmailGeneratorService**

  * Builds prompts
  * Calls the AI API using WebClient
  * Extracts and returns generated text

* **WebClientConfig**

  * Centralized HTTP client configuration

---

## 🧪 Troubleshooting

* **CORS issues?**

  * CORS is enabled via `@CrossOrigin("*")` for local testing.
* **API errors?**

  * Verify API key and model availability.
* **Frontend not connecting?**

  * Ensure backend is running on port 8080.
* **Extension not injecting button?**

  * Gmail DOM changes often — refresh or re-load extension.

---

## 🚀 Future Improvements

* Authentication & rate limiting
* Prompt customization UI
* Streaming responses
* Backend validation
* Production-ready Gmail extension
* Deployment with Docker

---

## 🤝 Contributing

Contributions are welcome!

* Open issues for bugs or enhancements
* Submit PRs with clear descriptions

---

