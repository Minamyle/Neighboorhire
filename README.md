# 🏠 NeighborHire – Frontend MVP

NeighborHire is a premium web-based platform designed to connect customers with trusted local artisans (electricians, plumbers, carpenters, etc.). This MVP focuses on a high-fidelity "Mirror/Glassmorphism" user interface, seamless role-based navigation, and a robust layout architecture ready for backend integration.

---

## 🎯 1. Purpose and Function

The platform bridges the gap between service seekers and providers:

- **Customers:** Discover artisans, request services, and track job progress.
- **Artisans:** Manage incoming requests, update task statuses, and monitor earnings.

The frontend is built to deliver a smooth, app-like experience with clear separation between public browsing and private role-based dashboards.

---

## 👥 2. User Roles

| Role             | Responsibility                                                             |
| :--------------- | :------------------------------------------------------------------------- |
| **Public Users** | Visitors browsing the landing page and artisan directory.                  |
| **Customers**    | Users who hire artisans, track active jobs, and handle payments.           |
| **Artisans**     | Service providers who accept jobs, update progress, and view income stats. |

---

## 📂 3. Page & Routing Structure

### 🌐 Public Pages

- `/` **Landing Page:** Platform introduction and service highlights.
- `/artisans` **Artisan Discovery:** Searchable list of artisans by category and rating.
- `/login` **Login:** Secure access for existing users.
- `/signup` **Signup:** New account registration.
- `/role-selection` **Role Selection:** Toggle between Customer and Artisan profiles.

### 👤 Customer Suite (`/customer`)

- `/customer` **Dashboard:** High-level overview of active and past jobs.
- `/customer/profile` **Profile:** Personal settings and account info.
- `/customer/jobs` **Job History:** Detailed log of ongoing and completed services.
- `/customer/checkout` **Checkout:** Payment interface for finished tasks.

### 🛠️ Artisan Suite (`/artisan`)

- `/artisan` **Dashboard:** Summary of job requests and performance metrics.
- `/artisan/jobs` **Hired Jobs:** Management of assigned, pending, and "In-Progress" jobs.
- `/artisan/earnings` **Earnings:** Financial statistics and payout history.
- `/artisan/ratings` **Ratings:** Review board for customer feedback.

---

## 🏗️ 4. Technical Architecture

### **Routing & Layouts**

- **React Router DOM:** Manages navigation via layout-based routing.
- **Nested Routes:** Ensures dashboards share a consistent **Sidebar** and **Topbar** while rendering dynamic content.
- **Glassmorphism Design:** A custom "Mirror" UI theme using Tailwind CSS backdrop blurs and high-contrast borders.

### **Key Components**

- **Mirror Job Cards:** Interactive cards with real-time status updates.
- **Native-Style Modals:** Full-screen mobile modals for project details.
- **Actionable Links:** Integrated `tel:` and `WhatsApp API` for instant communication.

---

## 📁 5. Folder Structure

The project follows a modular architecture for scalability:

- `src/components`: Reusable UI elements (Buttons, Cards, Modals).
- `src/layouts`: Persistent structures (Sidebar, Topbar, Footer).
- `src/pages`: Individual view components.
- `src/context`: Global state management (`ArtisanContext`).
- `src/assets`: Icons, images, and global styles.

---

## 🚀 6. Future Enhancements

- [ ] **Backend API Integration:** Connecting to a live database.
- [ ] **Auth Protection:** Implementing Role-Based Access Control (RBAC).
- [ ] **Real-time Updates:** Push notifications for new job requests.
- [ ] **Performance:** Advanced SEO optimization and image lazy-loading.

---

_Developed as part of the NeighborHire Frontend MVP Phase._
