# 🌉 InternBridge Backend: Internship Management System API

![Java 21](https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5-brightgreen?style=flat-square&logo=spring-boot)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=flat-square&logo=postgresql)
![JWT Security](https://img.shields.io/badge/Security-JWT-red?style=flat-square&logo=json-web-tokens)

The **InternBridge Backend** is a high-performance, secure RESTful API engineered to manage the internship lifecycle for educational institutions and corporate partners. It provides a robust foundation for multi-tenant identity management, recruitment pipelines, and academic tracking.

---

## 🚀 Technical Stack

- **Core:** Java 21 & Spring Boot 3.5.11
- **Persistence:** PostgreSQL with Spring Data JPA
- **Security:** Spring Security & JWT (JSON Web Tokens)
- **Utilities:** Lombok, Jakarta Validation, Jackson
- **Build Tool:** Maven

---

## 🏗️ Architecture & Core Principles

- **Layered Architecture:** Strict separation between Controllers, Services, and Repositories.
- **DTO Pattern:** All internal domain models are protected via Data Transfer Objects.
- **Security First:** Stateless authentication using JWT and Role-Based Access Control (RBAC).
- **Audit Ready:** Integrated logging of critical system events.
- **UUID Keys:** Implementation of UUID-v4 for all primary keys to prevent ID enumeration.

---

## 📡 API Endpoints Overview

The API is primarily versioned under `/api/v1/` for core governance and `/api/` for business logic.

### 🔐 Identity & Access (`/api/v1/auth`)

| Endpoint | Method | Description | Access |
| :--- | :---: | :--- | :--- |
| `/register/intern` | `POST` | Register a new student/intern | Public |
| `/register/company-admin` | `POST` | Register a company administrator | Public |
| `/register/super-admin` | `POST` | Register a system super-admin | Public |
| `/login` | `POST` | Authenticate and receive JWT | Public |
| `/me` | `GET` | Get current authenticated user details | User |

### 💼 Internship Management (`/api/internships`)

| Endpoint | Method | Description | Access |
| :--- | :---: | :--- | :--- |
| `/` | `POST` | Create a new internship posting | Company |
| `/` | `GET` | List all internships | User |
| `/{id}` | `GET` | Get internship details | User |
| `/company/{id}` | `GET` | Get internships by company | Company |
| `/{id}` | `PUT` | Update internship details | Company |
| `/{id}` | `DELETE` | Remove internship listing | Company |
| `/search` | `GET` | Advanced keyword & status search | User |

### 📑 Recruitment Pipeline (`/api/applications`)

| Endpoint | Method | Description | Access |
| :--- | :---: | :--- | :--- |
| `/` | `POST` | Apply for an internship | Intern |
| `/{id}` | `GET` | Get application details | User |
| `/internship/{id}` | `GET` | List applications for a posting | Company |
| `/intern/{id}` | `GET` | List applications by an intern | Intern |
| `/{id}/status` | `PATCH` | Update status (HIRED, REJECTED) | Company |

### 📍 Work Placement (`/api/placements`)

| Endpoint | Method | Description | Access |
| :--- | :---: | :--- | :--- |
| `/{id}` | `GET` | Get placement details | User |
| `/intern/{id}` | `GET` | Active/Past placements for intern | Intern |
| `/company/{id}` | `GET` | Active placements for company | Company |
| `/` | `GET` | List all placements | Admin |

### 📔 Academic Tracking (`/api/logbooks`)

| Endpoint | Method | Description | Access |
| :--- | :---: | :--- | :--- |
| `/` | `POST` | Submit daily/weekly log entry | Intern |
| `/{id}` | `GET` | Get specific log entry | User |
| `/placement/{id}` | `GET` | History of log entries for placement | User |
| `/{id}` | `PUT` | Update log entry content | Intern |
| `/{id}/company-status`| `PATCH` | Company supervisor sign-off | Company |
| `/{id}/lecturer-status`| `PATCH` | Academic lecturer sign-off | Lecturer |
| `/{id}` | `DELETE` | Remove log entry | Intern |

### 📜 Agreements & Communication (`/api/contracts` | `/api/messages`)

| Endpoint | Method | Description | Access |
| :--- | :---: | :--- | :--- |
| `POST /api/contracts` | `POST` | Create internship agreement | Company |
| `GET /api/contracts/placement/{id}` | `GET` | Get contract for a placement | User |
| `GET /api/contracts/intern/{id}` | `GET` | List contracts for an intern | Intern |
| `PATCH /api/contracts/{id}/sign` | `PATCH` | Electronically sign contract | Intern |
| `POST /api/messages` | `POST` | Send internal message | User |
| `GET /api/messages/user/{id}` | `GET` | Fetch message thread for user | User |
| `PATCH /api/messages/{id}/read` | `PATCH` | Mark message as read | User |

### 🏢 Governance & Core (`/api/v1/schools` | `/api/v1/departments`)

| Endpoint | Method | Description | Access |
| :--- | :---: | :--- | :--- |
| `/api/v1/schools` | `CRUD` | Manage educational institutions | Admin |
| `/api/v1/departments` | `CRUD` | Manage academic departments | Admin |
| `/api/v1/users` | `GET` | Global user directory | Admin |

### ⚙️ System Operations (`/api/audit-logs` | `/api/v1/system`)

| Endpoint | Method | Description | Access |
| :--- | :---: | :--- | :--- |
| `/api/v1/system/ping` | `GET` | Health check | Public |
| `/api/v1/system/stats` | `GET` | Platform statistics | SuperAdmin |
| `/api/v1/system/audit` | `GET` | Fetch system audit logs | SuperAdmin |
| `/api/audit-logs` | `GET` | Detailed event logging | SuperAdmin |
| `/api/notifications` | `CRUD` | User notification management | User |

---

## 🛠️ Local Development Setup

### 1. Database Configuration

Ensure **PostgreSQL** is running. Create a database named `internbridge_db` and update `src/main/resources/application.yml` with your credentials:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5433/internbridge_db
    username: your_username
    password: your_password
```

### 2. Environment Setup

The system uses **Java 21**. Ensure your `JAVA_HOME` is set correctly.

### 3. Build & Run

```bash
# Clone the repository
git clone <repo-url>
cd backend

# Build the project
./mvnw clean install

# Run the application
./mvnw spring-boot:run
```

---

## 🔒 Security Implementation

All protected endpoints require an `Authorization` header with a valid Bearer token:
`Authorization: Bearer <your_jwt_token>`

Roles currently supported:

- `ROLE_SUPER_ADMIN`: Full system control.
- `ROLE_SCHOOL_ADMIN`: Institution governance.
- `ROLE_COMPANY_SUPERVISOR`: Recruitment & placement management.
- `ROLE_STUDENT`: Applications, logbooks, and contracts.

---

## 📬 Contact & Support

For API documentation issues or feature requests, contact the development team at **dev@internbridge.com**.
