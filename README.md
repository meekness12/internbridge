# 🌉 InternBridge: Internship Management System

![Java 21](https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5-brightgreen?style=flat-square&logo=spring-boot)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=flat-square&logo=postgresql)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)

**InternBridge** is an enterprise-grade, multi-tenant platform engineered to digitize and manage the entire academic internship lifecycle. It provides a centralized ecosystem where educational institutions, corporate partners, and students can collaborate seamlessly—from the initial job application to daily activity monitoring and feedback.

Developed as a capstone system for **RP Karongi College**.

---

## 🎯 Core Modules & Business Logic

InternBridge is divided into three primary operational workflows:

### 1. Multi-Tenant Identity & Access Management
The system supports multiple schools and utilizes strict **Role-Based Access Control (RBAC)**.
* **School Admins:** Manage student profiles and oversee internship compliance.
* **Companies (HR/Supervisors):** Manage their organizational profile, post vacancies, and review student logs.
* **Students:** Apply for roles and submit daily academic deliverables.

### 2. The Recruitment Pipeline (ATS)
A built-in **Applicant Tracking System** designed specifically for academic placements.
* Companies create **Internships** (Job Vacancies) with specific deadlines and requirements.
* Students submit **Applications** (linking their profiles and CVs) to open vacancies.
* Status tracking prevents duplicate applications and manages the flow from `PENDING` to `HIRED` or `REJECTED`.

### 3. Logbook & Activity Monitoring
The core academic requirement feature. Once a student's application status is updated to `HIRED`:
* Students can submit daily **Logbook** entries, tracking exact dates, hours worked, and technical activities performed.
* Company Supervisors review these specific logs and update their status to `APPROVED` or `REJECTED`, providing a verifiable audit trail for the school.

---

## 🏗️ System Architecture & Database Design

The platform operates on a decoupled **Three-Tier Monolithic Architecture**:

* **Backend (API):** A Java Spring Boot RESTful API implementing a strict Layered Architecture (Controller $\rightarrow$ Service $\rightarrow$ Repository) using the Data Transfer Object (DTO) pattern to secure internal domain models.
* **Frontend (Presentation):** A responsive Single Page Application (SPA) built with React and Tailwind CSS.
* **Database (Persistence):** A highly normalized (3NF) PostgreSQL database using UUID Primary Keys for enhanced security.

---

## 📂 Project Structure

| Component | Repository Link | Description |
| :--- | :--- | :--- |
| **Backend** | [backend/README.md](file:///c:/Users/user/OneDrive/Desktop/InternBridge-Workspace/backend/README.md) | Java Spring Boot REST API, Security, & JWT. |
| **Frontend** | [frontend/README.md](file:///c:/Users/user/OneDrive/Desktop/InternBridge-Workspace/frontend/README.md) | React SPA with Tailwind CSS & Glassmorphic UI. |

---

## 🚀 Local Development Setup

### Prerequisites
- **Java 21** & Maven
- **Node.js (v18+)**
- **PostgreSQL (v15+)**

### 1. Database Initialization
Execute the following in your PostgreSQL terminal or pgAdmin:
```sql
CREATE DATABASE internbridge_db;
\c internbridge_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### 2. Running the Backend
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

### 3. Running the Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🔒 Security
The system implements JWT-based authentication. All API calls to protected routes must include the `Authorization` header with a valid Bearer token.

---

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
