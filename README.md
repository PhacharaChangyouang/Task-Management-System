# Task Management System (Monolithic Architecture)

## 📌 Project Overview
โปรเจกต์นี้เป็นเว็บแอปพลิเคชันสำหรับจัดการงาน (Task Management System)  
พัฒนาในรูปแบบ **Monolithic Architecture** โดยรวม Frontend และ Backend ไว้ในเซิร์ฟเวอร์เดียวกัน  
ระบบรองรับการจัดการงานแบบ CRUD และสามารถเปลี่ยนสถานะงานได้

---

## ✨ Features
- ✅ Create, Read, Update, Delete (CRUD) Tasks
- 🔄 Task Status Management  
  - To Do  
  - In Progress  
  - Done
- 🎨 แสดงสีของงานตามสถานะ (Visual Status Indicator)
- 🔍 Filter งานตามสถานะ
- 💾 Persistent Storage ด้วย SQLite (ข้อมูลไม่หายเมื่อปิดเซิร์ฟเวอร์)
- 🌐 RESTful API สำหรับจัดการข้อมูล

---

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** SQLite3
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Architecture:** Monolithic Architecture

---

## 📁 Project Structure
week3-starter-code/
├── server.js # Backend server & REST API
├── package.json # Project dependencies
├── .gitignore
├── database/
│ ├── schema.sql # Database schema
│ └── tasks.db # SQLite database
├── public/
│ ├── index.html # Frontend UI
│ ├── style.css # Styling
│ ├── app.js # Frontend logic
│ └── status-utils.js # Utility for task status styling
└── README.md


---

## ▶️ Getting Started

### Prerequisites
- Node.js (v14 หรือสูงกว่า)
- npm
- SQLite3

---

### Installation

1. Clone repository
```bash
git clone <your-repository-url>
cd week3-starter-code
Install dependencies

npm install
Setup Database

Mac / Linux

cd database
sqlite3 tasks.db < schema.sql
Windows (PowerShell)

cd database
Get-Content schema.sql | sqlite3 tasks.db
Start Server

cd ..
npm run dev
เปิดเว็บเบราว์เซอร์

http://localhost:3000
📡 API Documentation
Method	Endpoint	Description
GET	/api/tasks	ดึงข้อมูลงานทั้งหมด
GET	/api/tasks/:id	ดึงข้อมูลงานตาม ID
POST	/api/tasks	สร้างงานใหม่
PUT	/api/tasks/:id	แก้ไขข้อมูลงานทั้งหมด
PATCH	/api/tasks/:id/status	แก้ไขเฉพาะสถานะงาน
DELETE	/api/tasks/:id	ลบงาน
🧾 Example JSON Payload (Create Task)
{
  "title": "ทำการบ้านวิชา Web",
  "description": "พัฒนา Task Management System",
  "priority": "HIGH"
}
🧠 Architecture Explanation
ระบบนี้ใช้ Monolithic Architecture
โดย Frontend, Backend และ Database ทำงานร่วมกันในแอปพลิเคชันเดียว
เหมาะสำหรับระบบขนาดเล็กถึงกลาง และง่ายต่อการพัฒนาและดูแลรักษา