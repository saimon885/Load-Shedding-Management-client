<p align="center">
  <img
    src="https://i.ibb.co.com/gMMtRNdN/Screenshot-2026-10-10-193407.png"
    alt="Load Shedding & Power Management Dashboard Banner"
    width="100%"
  />
</p>

<h1 align="center">⚡ Load Shedding & Power Management</h1>

<p align="center">
  A centralized platform for power outage control, infrastructure management,
  technician coordination, and restoration tracking.
</p>

<p align="center">
  <a href="https://load-shedding-management-client.vercel.app/"><strong>🌐 Live Application</strong></a>
  &nbsp; • &nbsp;
  <a href="https://load-shedding-management.vercel.app/"><strong>⚙️ Live Backend</strong></a>
  &nbsp; • &nbsp;
  <a href="https://documenter.getpostman.com/view/54993822/2sBYB1MTVK"><strong>📘 API Documentation</strong></a>
  &nbsp; • &nbsp;
  <a href="https://www.loom.com/share/82d794b16549406db891141d375da775"><strong>🎬 Demo Video</strong></a>
</p>

---

---

## 📌 Project Overview

**Load Shedding & Power Management** is a full-stack web application that provides a centralized platform for managing power distribution infrastructure and outage-related operations.

The system organizes electrical infrastructure through a hierarchical structure of distribution zones, substations, feeders, and areas. It supports role-based access control, outage monitoring, technician coordination, service request management, and restoration tracking.

The goal is to make power operations more organized, transparent, and accessible for administrators, operators, technicians, and customers.

## 🌐 Live Links

| Resource | Link |
|---|---|
| Live Frontend | [Open Application](https://load-shedding-management-client.vercel.app/) |
| Live Backend | [Backend API](https://load-shedding-management.vercel.app/) |
| Backend Repository | [GitHub Repository](https://github.com/saimon885/Load-Shedding-Management.git) |
| Frontend Repository | [GitHub Repository](https://github.com/saimon885/Load-Shedding-Management-client.git) |
| API Documentation | [Postman Documentation](https://documenter.getpostman.com/view/54993822/2sBYB1MTVK) |
| Demo Video | [Watch on Loom](https://www.loom.com/share/82d794b16549406db891141d375da775) |

## ✨ Key Features

### 🔐 Authentication & Authorization
- User authentication and session management.
- Role-based access control.
- Protected dashboard routes.
- Permission-based access to management features.

### ⚡ Power Infrastructure Management
- Manage distribution zones, substations, feeders, and areas.
- Maintain hierarchical relationships between infrastructure entities.
- View infrastructure information through organized dashboards.

### 🔌 Outage Management
- Create and manage scheduled outages.
- Report and manage unexpected power outages.
- Track outage status and affected areas.
- Record estimated and actual restoration times.
- Manage restoration information and outage history.

### 🧑‍🔧 Technician Management
- Assign technicians to outage-related tasks.
- Track assignment status and progress.
- Support technician workflows from assignment to completion.

### 🛠️ Customer Service Requests
- Manage customer service requests.
- Track request status and payment status.
- Display related area, feeder, and substation information.

### 🔔 Notifications
- Provide a centralized notification interface.
- Support outage-related communication and operational updates.

### 📊 Dashboard & Monitoring
- Role-specific dashboards and navigation.
- Organized views of infrastructure, outages, assignments, and service requests.
- Responsive interface for desktop, tablet, and mobile screens.

> Feature availability depends on the current implementation and the permissions assigned to each user role.

## 👥 User Roles

The application supports five user roles:

| Role | Responsibility |
|---|---|
| `ADMIN` | System administration and authorized management operations |
| `ZONE_MANAGER` | Distribution zone and operational management |
| `POWER_OPERATOR` | Power operations and outage-related activities |
| `TECHNICIAN` | Assigned fieldwork and restoration tasks |
| `CUSTOMER` | Customer-facing features, outage information, and service requests |

Each role receives access according to the application's authorization rules.

## 🏗️ Infrastructure Hierarchy

The application follows a structured power distribution hierarchy:

```text
Power Authority
      │
      ▼
Distribution Zone
      │
      ▼
Substation
      │
      ▼
Feeder
      │
      ▼
Area
```

This structure helps associate outages and service requests with the appropriate locations and infrastructure.

## 🔄 Outage Management Workflow

```text
Scheduled / Unexpected Outage
             │
             ▼
     Identify Affected Area
       and Feeder
             │
             ▼
      Monitor Outage Status
             │
             ▼
     Assign Technician
             │
             ▼
      Repair / Maintenance
             │
             ▼
      Update Restoration
             │
             ▼
       Power Restored
```

The workflow represents the intended operational process; specific transitions depend on the implemented business rules and permissions.

## 🛠️ Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Hook Form
- Zod
- Lucide React

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT-based authentication
- REST API architecture

### Deployment & Tools
- Vercel
- Git and GitHub
- Postman
- Loom

## 📂 Repositories

### Backend

Repository: [Load-Shedding-Management](https://github.com/saimon885/Load-Shedding-Management.git)

The backend provides REST APIs for authentication, infrastructure management, outage operations, technician assignments, service requests, and other supported application features.

Clone the backend repository:

```bash
git clone https://github.com/saimon885/Load-Shedding-Management.git
cd Load-Shedding-Management
npm install
```

Configure the required environment variables, database connection, and Prisma setup according to the backend configuration.

Start the development server using the script defined in `package.json`. For a project configured with the standard development script:

```bash
npm run dev
```

### Frontend

Repository: [Load-Shedding-Management-client](https://github.com/saimon885/Load-Shedding-Management-client.git)

The frontend provides the responsive user interface, role-specific dashboards, protected routes, forms, and API integration.

Clone the frontend repository:

```bash
git clone https://github.com/saimon885/Load-Shedding-Management-client.git
cd Load-Shedding-Management-client
npm install
```

Create a `.env.local` file in the frontend project root and configure the backend API URL using the environment variable name expected by the application.

For example, if the application uses `NEXT_PUBLIC_API_URL`:

```env
NEXT_PUBLIC_API_URL=https://load-shedding-management.vercel.app
```

Start the frontend development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Important:** The environment variable name above is an example. If the source code uses a different name, use the exact name referenced by your API client or configuration.

## 🔑 Environment Configuration

The application requires environment variables appropriate to each repository.

Typical backend configuration may include:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
```

These are illustrative examples, not a verified copy of the project's actual `.env` schema. Check the backend source code for the exact variable names and required authentication, database, CORS, cookie, payment, or other configuration values.

**Security guidelines:**
- Never commit `.env`, `.env.local`, database credentials, or token secrets.
- Configure production secrets in the deployment platform's environment settings.
- Use strong, unique secrets and a properly secured production database.
- Do not expose private backend credentials through `NEXT_PUBLIC_` variables.

## 📘 API Documentation

The backend API documentation is available through Postman.

**[Explore API Documentation →](https://documenter.getpostman.com/view/54993822/2sBYB1MTVK)**

Use the documentation to explore available endpoints, request methods, authentication requirements, request payloads, and response formats.

## 🎬 Project Demo

Watch the project demonstration to explore the application's interface and implemented workflows.

**[Watch the Demo Video on Loom →](https://www.loom.com/share/82d794b16549406db891141d375da775)**

## 🚀 Deployment

The project is deployed using Vercel.

- **Frontend:** [load-shedding-management-client.vercel.app](https://load-shedding-management-client.vercel.app/)
- **Backend:** [load-shedding-management.vercel.app](https://load-shedding-management.vercel.app/)

For local development, ensure that the frontend API configuration points to the intended backend and that the backend has valid production or local environment variables configured.

## 🔮 Future Improvements

Potential improvements for the platform include:

- Automated outage scheduling and conflict detection.
- Real-time outage notifications.
- Advanced analytics and operational reporting.
- Priority-based load management for critical facilities.
- Improved restoration-time estimation.
- Interactive outage maps and affected-area visualization.
- More comprehensive service request tracking.
- Enhanced audit logs and operational monitoring.

These items represent potential enhancements and should not be interpreted as completed features unless implemented.

## 🎯 Project Goals

- Centralize power infrastructure and outage information.
- Improve coordination between power operators and field technicians.
- Provide clearer outage and restoration visibility.
- Organize customer service requests and related operations.
- Apply secure, role-based access to operational features.
- Deliver a responsive and maintainable full-stack application.

## 👨‍💻 Developer

**Saimon Hossain**

Full Stack Developer | MERN Stack | Next.js | TypeScript | PostgreSQL

- GitHub: [@saimon885](https://github.com/saimon885)
- Frontend Repository: [Load-Shedding-Management-client](https://github.com/saimon885/Load-Shedding-Management-client)
- Backend Repository: [Load-Shedding-Management](https://github.com/saimon885/Load-Shedding-Management)

---

<p align="center">
  <strong>⚡ Load Shedding & Power Management</strong><br />
  <sub>Centralized infrastructure, outage control, and restoration management.</sub>
</p>
