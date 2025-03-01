# Vite Task List Template 🚀
A simple full-stack template using:
- **Vite + Vanilla JS frontend**
- **Express + PostgreSQL backend (hosted on Render)**
- **Deployed via Vercel (frontend) and Render (backend)**

## 🛠 Setup Instructions
1. **Clone the template**:
   ```sh
   git clone git@github.com:yourusername/new-project.git
   cd new-project
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Configure environment variables**:
   - Rename `.env.example` to `.env`
   - Fill in your PostgreSQL credentials

4. **Start the backend**:
   ```sh
   npm run start
   ```
5. **Start the frontend**:
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

## 📌 Notes
- The API runs on **Render**, using PostgreSQL for persistent data.
- The frontend is deployed on **Vercel**.
- You can modify `/server.js` for API changes.
