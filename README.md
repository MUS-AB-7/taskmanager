# Team Task Manager

A full-stack web application for managing team projects and tasks with role-based access control (`ADMIN`, `MEMBER`). Users can create projects, assign tasks, update status, and track progress via a dashboard.

---

## 🌐 Live Demo

* Frontend: https://taskmanager-1-5v5c.onrender.com
* Backend: https://taskmanager-mjp3.onrender.com

---

## 🚀 Features

* JWT-based authentication (signup/login)
* Role-based access (ADMIN, MEMBER)
* Project & task management
* Task assignment and status updates
* Dashboard with task insights (total, completed, pending, overdue)

---

## 🛠 Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Axios
**Backend:** Java 21, Spring Boot, Spring Security, JPA, JWT
**Database:** PostgreSQL

---

## 📁 Structure

```
client/        → React frontend  
taskmanager/   → Spring Boot backend  
```

---

## 🔗 API (Core)

* POST `/auth/signup` → Register
* POST `/auth/login` → Login
* GET `/projects` → Get projects
* POST `/tasks` → Create task
* PUT `/tasks/{id}` → Update status
* GET `/dashboard` → Task stats

---

## ⚙️ Environment Variables

**Backend (.env)**

```
DB_URL=your_db_url
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

**Frontend (.env)**

```
VITE_API_BASE_URL=https://taskmanager-mjp3.onrender.com
```

---

## ▶️ Run Locally

```
# Backend
cd taskmanager
mvn spring-boot:run

# Frontend
cd client
npm install
npm run dev
```

---

## 🚀 Deployment

* Backend: Docker + Render
* Frontend: Render Static Site

---

## 👨‍💻 Author

Mohammad Musab
