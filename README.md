<<<<<<< HEAD
<<<<<<< HEAD
"# InternBridge System" 
=======
# internbridge
>>>>>>> 77ca38bc8f973507f859b1f7e798b347c1ab7429
=======
# 🌉 InternBridge: Internship Management System

![Java 21](https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5-brightgreen?style=flat-square&logo=spring-boot)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=flat-square&logo=postgresql)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)

**InternBridge** is an enterprise-grade, multi-tenant platform engineered to digitize and manage the entire academic internship lifecycle. It provides a centralized ecosystem where educational institutions, corporate partners, and students can collaborate seamlessly—from the initial job application to daily activity monitoring.

Developed as a capstone system for **RP Karongi College**.

---

## 🎯 Core Modules & Business Logic

InternBridge is divided into three primary operational workflows:

### 1. Multi-Tenant Identity & Access Management
The system supports multiple schools and utilizes strict Role-Based Access Control (RBAC). 
* **School Admins:** Manage student profiles and oversee internship compliance.
* **Companies (HR/Supervisors):** Manage their organizational profile, post vacancies, and review student logs.
* **Students:** Apply for roles and submit daily academic deliverables.

### 2. The Recruitment Pipeline (ATS)
A built-in Applicant Tracking System designed specifically for academic placements.
* Companies create **Internships** (Job Vacancies) with specific deadlines and requirements.
* Students submit **Applications** (linking their profiles and CVs) to open vacancies.
* Status tracking prevents duplicate applications and manages the flow from `PENDING` to `HIRED` or `REJECTED`.

### 3. Logbook & Activity Monitoring
The core academic requirement feature. Once a student's application status is updated to `HIRED`:
* Students can submit daily **Logbook** entries, tracking exact dates, hours worked (up to 12 hours/day), and technical activities performed.
* Company Supervisors review these specific logs and update their status to `APPROVED` or `REJECTED`, providing a verifiable audit trail for the school.

---

## 🏗️ System Architecture & Database Design

The platform operates on a decoupled **Three-Tier Monolithic Architecture**:

* **Frontend (Presentation):** A responsive Single Page Application (SPA) built with React and Tailwind CSS.
* **Backend (Application):** A Java Spring Boot RESTful API implementing a strict Layered Architecture (Controller $\rightarrow$ Service $\rightarrow$ Repository) using the Data Transfer Object (DTO) pattern to secure internal domain models.
* **Database (Persistence):** A highly normalized (3NF) PostgreSQL database. 
  * Implements **Table Inheritance** (A base `users` table linked 1:1 with `students` and `companies` profiles) to eliminate null constraints.
  * Uses **UUID Primary Keys** across all tables to prevent ID enumeration vulnerabilities.

---

## 🚀 Local Development Setup

### Prerequisites
* **Java 21** & Maven
* **Node.js (v18+)**
* **PostgreSQL (v15+)**

### 1. Database Initialization
Execute the following in your PostgreSQL terminal or pgAdmin:
```sql
CREATE DATABASE internbridge_db;
\c internbridge_db  -- Or connect via GUI
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
>>>>>>> 2dead3279d67403ffa30d7c656dca80c2d6fb718
