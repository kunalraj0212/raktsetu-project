# RaktSetu - Lifesaving Blood Donation Network

RaktSetu is a modern, full-stack MERN (MongoDB, Express, React, Node.js) application designed to bridge the gap between blood donors and those in critical need. 

## 🏗️ Architecture Overview

The project is strictly separated into a modular frontend client and a robust backend API, adhering to clean architecture and MVC (Model-View-Controller) principles.

### Repository Structure
- **/raksetuportalnew (Frontend):** A React/Vite application utilizing functional components, modern custom hooks (like `useForm`), and a decoupled Service layer for backend communication.
- **/raktsetu-backend (Backend):** An ES-Module based Node.js/Express server providing RESTful APIs. It follows a strict MVC separation, ensuring controllers orchestrate flow while services handle core business logic.

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- React Router
- Tailwind CSS / Vanilla CSS
- Lucide React (Icons)

**Backend:**
- Node.js (v22 LTS recommended)
- Express.js
- MongoDB Atlas & Mongoose
- ES Modules
- Helmet & CORS (Security)

## 🚀 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/kunalraj0212/raktsetu-project.git
cd raktsetu-project
```

### 2. Backend Setup
```bash
cd raktsetu-backend
npm install
```
- Copy `.env.example` to `.env` and fill in your MongoDB Atlas credentials.
- Ensure your IP is whitelisted in MongoDB Atlas.
- Start the development server: `npm run dev` (Runs on port 5000)

### 3. Frontend Setup
```bash
cd raksetuportalnew
npm install
npm run dev
```

## 🔒 Security & Environment
- **Never commit `.env` files.** The `.gitignore` is pre-configured to strictly exclude all environment files.
- The backend features `helmet` for HTTP header security and standard CORS protection.

## 🗺️ Roadmap
- [x] Frontend decoupled from local mock data
- [x] Express backend scaffolded and connected to MongoDB Atlas
- [x] Modularized UI components
- [ ] Implement JWT Authentication & User Model
- [ ] Build Donor & Emergency Request Services
- [ ] Integrate Global Error Boundaries and Server-State Management (React Query)
