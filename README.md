🧾 Inventory Management System

A full-stack web application for managing products and inventory movements in real time.

🚀 Features

Product CRUD (Create, Read, Update, Delete)

Inventory tracking (Entries & Exits)

Dashboard with analytics and charts

Low stock alerts

Authentication with JWT

Role-based access (Admin/User)

Search, filters and pagination

CSV export

Movement history per product

🛠️ Tech Stack
Frontend

React

Axios

Chart.js

Backend

Node.js

Express.js

Prisma ORM

Database

PostgreSQL

Authentication

JSON Web Tokens (JWT)

📂 Project Structure
inventory_system/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── config/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
🔐 Authentication

Users login using email and password

JWT token is generated and stored in localStorage

Protected routes using middleware

Role-based authorization (admin / user)

📊 Dashboard

Displays:

Total products

Total stock

Total entries & exits

Inventory chart

Recent movements

Low stock alerts

🔄 Inventory System Logic
ENTRY

Increases product stock

EXIT

Decreases product stock

Prevents negative stock

📡 API Endpoints
Auth

POST /users → Register

POST /users/login → Login

Products

GET /products

POST /products (admin)

PUT /products/:id (admin)

DELETE /products/:id (admin)

Movements

GET /movements

POST /movements

Inventory

POST /inventory/entry

POST /inventory/exit

Dashboard

GET /dashboard

⚙️ Environment Variables

Create a .env file in /backend:

DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
▶️ Installation
1. Clone repo
git clone [https://github.com/your-username/inventory-system](https://github.com/diegohernandezfrt-debug/inventory-system-fullstack)
2. Backend
cd backend
npm install
npx prisma migrate dev
node seed.js
npm run dev
3. Frontend
cd frontend
npm install
npm run dev

🌐 Live Demo

👉 [[Your Live URL]](https://dh-inventory-system-fullstack.vercel.app/)

💻 GitHub Repository

👉 [[Your GitHub Repo]](https://github.com/diegohernandezfrt-debug/inventory-system-fullstack)

💻 Portafolio web

👉 [[[Your GitHub Repo]](https://github.com/diegohernandezfrt-debug/inventory-system-fullstack)](https://diegohernandezfrt-debug.github.io/portafolio-diego/#proyectos-reales)

📸 Screenshots

<img width="1366" height="646" alt="Login-System-Inventory" src="https://github.com/user-attachments/assets/9e84cb01-8bea-4efb-9ee3-978148f9ec24" />
User authentication using JWT

<img width="1366" height="646" alt="Dashboard-System-Inventory" src="https://github.com/user-attachments/assets/12b1ee17-1deb-4d37-9e88-b51190e44e27" />
Real-time inventory analytics dashboard

<img width="1366" height="647" alt="Dashboard-System-Inventory2" src="https://github.com/user-attachments/assets/1f93c4dd-05b5-4c2d-b9d8-2dca03187dd9" />
Low stock alert system

<img width="1366" height="645" alt="Products-System-Inventory" src="https://github.com/user-attachments/assets/227ae686-f345-4f69-ac34-30727630ee88" />
Product management with search, filters and pagination
Export data to CSV

<img width="1366" height="642" alt="AddProducts-System-Inventory" src="https://github.com/user-attachments/assets/b99cca36-3a06-4dfa-9649-51622c93af05" />
Create new products easily

<img width="1366" height="643" alt="Movements-System-Inventory" src="https://github.com/user-attachments/assets/72988a3a-33d2-4517-9357-d674615e7dbe" />
Inventory movement tracking (entries & exits)

📌 Future Improvements

Deploy backend (Railway / Render)

Improve UI/UX

Add categories & suppliers UI

Add reports & analytics

Add unit tests

👨‍💻 Author

Diego Hernández
Fullstack Developer

🧪 Test Credentials
Admin:
email: admin@test.com
password: 123456

User:
email: user@test.com
password: 123456
