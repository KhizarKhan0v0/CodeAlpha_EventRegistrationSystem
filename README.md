# CodeAlpha_EventRegistrationSystem
## CodeAlpha Backend Development – Task 2

This project was built as part of my **CodeAlpha Backend Development Internship (Task 2)**.  
It demonstrates core backend concepts like **JWT authentication, MongoDB schema design, CRUD operations, and relations between users and events**, along with a **basic React frontend** to visualize the flow between client and server.  

---

## 🚀 Features
- 🔑 **JWT Authentication** – Secure login & protected routes  
- 🗄️ **MongoDB Schema Design** – Organized models for Users & Events  
- ⚡ **CRUD Operations** – Create, Read, Update, Delete functionality  
- 🔗 **Relations between Users & Events** – User registration for events using MongoDB references  
- 🎨 **Basic React Frontend** – UI to interact with backend APIs  

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Frontend:** React.js  
- **Authentication:** JSON Web Tokens (JWT)  

---

## 📂 Project Structure
/backend
┣ /models
┣ /routes
┣ index.js
/frontend
┣ /src
┣ App.js

---

## ⚙️ Installation & Setup
```bash
cd backend
npm install

cd ../frontend
npm install
```

---

## Setup environment variables
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Start backend
```bash
cd backend
npm start
```

## Start frontend
```bash
cd frontend
npm start
```
