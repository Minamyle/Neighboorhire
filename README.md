# NeighborHire Frontend MVP

A React-based platform connecting customers with local artisans for various services.

## Project Structure

This project is structured for 5 students to work on different features simultaneously:

### Student 1: Landing Page & Navigation

- **Files**: `src/pages/LandingPage.jsx`, `src/components/Navigation.jsx`
- **Tasks**:
  - Build hero section with compelling messaging
  - Create categories section showcasing service types
  - Implement responsive layout and animations
  - Ensure navigation works across all pages

### Student 2: Authentication & Role Flow

- **Files**: `src/pages/Auth/Login.jsx`, `src/pages/Auth/Signup.jsx`, `src/pages/Auth/RoleSelection.jsx`
- **Tasks**:
  - Create login form with email/password
  - Build signup form with validation
  - Implement role selection (Customer vs Artisan)
  - Set up routing between auth pages

### Student 3: Artisan Discovery

- **Files**: `src/pages/ArtisanDiscovery.jsx`
- **Tasks**:
  - Build listing page for artisans
  - Implement search functionality
  - Add category filters
  - Create artisan cards with ratings and info

### Student 4: Service Request & Job Flow

- **Files**:
  - `src/pages/ServiceRequest/ProfilePage.jsx`
  - `src/pages/ServiceRequest/RequestModal.jsx`
  - `src/pages/ServiceRequest/JobStatusTimeline.jsx`
- **Tasks**:
  - Create user profile page
  - Build service request modal
  - Implement job status timeline with progress tracking

### Student 5: Payment & Dashboards

- **Files**:
  - `src/pages/Payment/Checkout.jsx`
  - `src/pages/Payment/CustomerDashboard.jsx`
  - `src/pages/Payment/ArtisanDashboard.jsx`
- **Tasks**:
  - Build checkout UI with payment forms
  - Create customer dashboard with job history
  - Build artisan dashboard with earnings and ratings

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd neighboorhire
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Available Routes

- `/` - Landing Page
- `/login` - Login Page
- `/signup` - Signup Page
- `/role-selection` - Role Selection
- `/artisans` - Artisan Discovery
- `/profile` - User Profile
- `/request-modal` - Service Request Modal (demo)
- `/jobs` - Job Status Timeline
- `/checkout` - Payment Checkout
- `/customer-dashboard` - Customer Dashboard
- `/artisan-dashboard` - Artisan Dashboard

## Technologies Used

- **React 19** - Frontend framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and development server

## Development Guidelines

1. Each student should work on their assigned files
2. Use Tailwind CSS classes for styling
3. Follow React best practices and hooks
4. Test your components on different screen sizes
5. Use the navigation to test routing between pages

## Project Goals

- Clean, responsive UI using Tailwind CSS
- Functional routing between all pages
- Placeholder data for demonstration
- Ready for backend integration
- Professional appearance suitable for MVP

## Next Steps

After completing the frontend MVP:

1. Integrate with backend API
2. Add authentication state management
3. Implement real data fetching
4. Add form validation and error handling
5. Optimize for performance
