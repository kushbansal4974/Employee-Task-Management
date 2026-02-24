# Employee Task Manager

A simple **MERN stack** web application to manage tasks for employees. Administrators can create, assign, edit, and delete tasks, while employees can view and update their assigned tasks. This project demonstrates full-stack development with authentication, protected routes, and dashboard functionality.

---

## 📝 Features

### Admin
- Login to system
- Create tasks
- Assign tasks to employees
- Edit and delete tasks
- Update task status
- View dashboard with:
  - Total tasks
  - Completed tasks
  - Pending tasks
  - Total users

### Employee
- Login to system
- View assigned tasks
- Update task status
- View task details
- Dashboard with:
  - My tasks count
  - Completed tasks
  - Pending tasks
  - Profile information

### Authentication
- Login & logout
- Secure password hashing
- Protected routes/pages

### Task Module
- Task includes:
  - Title
  - Description
  - Priority (Low / Medium / High)
  - Deadline
  - Status (Pending / In Progress / Completed)
  - Assigned user

---

## 💻 Tech Stack

- **Frontend:** React, TailwindCSS, React Router, Axios, React Toastify  
- **Backend:** Node.js, Express.js, Mongoose  
- **Database:** MongoDB  
- **Authentication:** JWT (stored in HttpOnly cookies)  

---

## 🏗️ Project Structure


backend/
├─ controllers/
│ ├─ user.controller.js
│ ├─ task.controller.js
│ └─ dashboard.controller.js
├─ models/
│ ├─ user.model.js
│ └─ task.model.js
├─ routes/
│ ├─ user.routes.js
│ ├─ task.routes.js
│ └─ dashboard.routes.js
├─ middlewares/
│ ├─ isAuthenticated.js
│ └─ authorizeRoles.js
├─ server.js
frontend/
├─ src/
│ ├─ components/
│ │ ├─ Login.jsx
│ │ ├─ Register.jsx
│ │ ├─ AdminDashboard.jsx
│ │ └─ EmployeeDashboard.jsx
│ ├─ api/
│ │ ├─ axios.js
│ │ └─ taskApi.js
│ ├─ context/
│ │ └─ AuthContext.jsx
│ └─ App.jsx


---

## ⚙️ Setup Instructions

### Backend
1. Navigate to backend folder:
```bash
cd backend

Install dependencies:

npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start server:

npm run dev
Frontend

Navigate to frontend folder:

cd frontend

Install dependencies:

npm install

Start frontend:

npm start

Open in browser: http://localhost:3000

🔗 API Endpoints
User

POST /users/register – Register new user

POST /users/login – Login

GET /users/me – Get current user info

GET /users/employees – Get all employees

Task

POST /tasks/create – Create task (admin)

GET /tasks/all – Get all tasks (admin)

GET /tasks/my-tasks – Get logged-in employee tasks

PUT /tasks/:id – Update task (admin/employee)

DELETE /tasks/:id – Delete task (admin)

📂 Notes

Admin can create, edit, assign, and delete tasks.

Employee can only view and update status of their assigned tasks.

Passwords are hashed using bcrypt.

JWT stored in HttpOnly cookie for security.

🚀 Future Improvements

Add email notifications for task assignment

Add filters and search for tasks

Add role-based dashboard analytics