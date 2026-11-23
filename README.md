# Permit to Work (PTW) Management System

A web-based Permit to Work (PTW) management module designed for a Computerized Maintenance Management System (CMMS). The application aims to manage workplace safety permits, approval workflows, work execution, and permit closure.

**Project Status:** In Development

## 1. Project Overview

The Permit to Work system is designed to help organizations manage and monitor safety-related work activities through a structured digital workflow.

The system will support four permit categories:

- Hot Work
- Confined Space Entry
- Working at Height
- Electrical Isolation (LOTO)

It will provide role-based access for Requesters, Area Owners, Safety Officers, and Administrators.

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Node.js, Express.js, TypeScript |
| Database | MySQL 8 |
| ORM | Prisma ORM 7 |
| Authentication | JWT (planned) |
| Password Hashing | bcrypt (planned) |
| API Communication | REST API |

### Database Decision

The assignment recommends PostgreSQL as the preferred database. This project uses MySQL 8 as a deliberate alternative because of my existing experience with MySQL and its suitability for relational data and transaction-based workflows.

Prisma ORM is used for database schema management and migrations.

## 3. Project Structure

```text
opmaint-ptw/
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   ├── package.json
│   └── prisma7.config.ts
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── .gitignore
└── README.md
```

## 4. Current Implementation

The following foundation has been completed:

- React and TypeScript frontend project initialized.
- Express and TypeScript backend project initialized.
- MySQL database created.
- Prisma ORM configured.
- Initial database schema created.
- Initial database migration generated and applied.
- Core database models created for users, plants, equipment, permits, approvals, and audit logs.
- Permit categories, user roles, and permit lifecycle statuses defined.

The API, authentication, user interface, seed data, and automated tests are still under development.

## 5. Database Setup

### Prerequisites

- Node.js and npm
- MySQL 8
- Git

### Clone the Repository

```bash
git clone https://github.com/Nigashini/opmaint-permit_to_work.git
cd opmaint-permit_to_work
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Configure Environment Variables

Create a `.env` file inside the `backend` directory.

```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3308/opmaint_ptw"
```

Replace `YOUR_PASSWORD` with your local MySQL password. Update the port if your MySQL server uses a different port.

**Important:** Never commit your `.env` file or expose database credentials.

### Database Migration

After configuring the database connection, run:

```bash
npx prisma migrate dev
npx prisma generate
```

These commands apply pending development migrations and generate the Prisma Client.

## 6. User Roles

The application is designed around four roles:

| Role | Responsibility |
|---|---|
| Requester | Create and submit work permits |
| Area Owner | Review and approve work within the assigned area |
| Safety Officer | Review safety requirements and approve permits |
| Admin | Manage system-level operations and users |

Role-based authorization will be enforced on the backend.

## 7. Permit Lifecycle

The planned permit workflow includes:

```text
DRAFT
  |
  v
PENDING_APPROVAL
  |
  v
APPROVED
  |
  v
ACTIVE
  |
  v
CLOSED
```

Additional supported workflow states include:

- SUSPENDED
- REJECTED
- CANCELLED
- EXPIRED

The backend will enforce the transition rules, approval requirements, and permit validity period.

## 8. Demo Accounts and Seed Data

Demo accounts for all four roles, along with sample plants, equipment, and permits, will be provided through a database seed script.

**Status:** Seed script and demo credentials are not yet implemented. This section will be updated with working login details once the seed data and authentication are completed.

## 9. Testing

Automated tests are planned for:

- Permit lifecycle and state transitions.
- Role-based access permissions.
- Approval workflow.
- Permit activation and expiry rules.
- Restrictions on unauthorized actions.

**Status:** Automated tests are not yet implemented.

## 10. Future Improvements

- Complete backend REST APIs.
- JWT-based authentication and authorization.
- Role-specific dashboards.
- Permit creation and detail screens.
- Approval and rejection workflow.
- Permit suspension and resumption.
- Permit closure and verification.
- Immutable audit trail.
- Expiry countdown and permit extension.
- Conflict detection for overlapping work activities.
- Responsive user interface.
- Automated backend tests.

## 11. Known Limitations

This project is currently in the initial development stage.

- Frontend currently contains the Vite starter application.
- Backend API endpoints are not yet implemented.
- Authentication is not yet implemented.
- Database seed data is not yet available.
- Automated tests are not yet available.
- Deployment is pending.

These limitations will be updated as development progresses.

## 12. AI Usage Disclosure

AI tools, including ChatGPT, are used as development assistants for:

- Understanding assignment requirements.
- Planning the project structure and implementation.
- Understanding database design and Prisma configuration.
- Troubleshooting development errors.
- Reviewing code and improving documentation.

All implementation decisions and code are reviewed and tested during development. I am responsible for understanding and explaining the final implementation.

## 13. Author

**Developer:** Nigashini K

**GitHub Repository:** https://github.com/Nigashini/opmaint-permit_to_work