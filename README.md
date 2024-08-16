# Patient Management App

This is a frontend application built with React and Vite for managing patient data. The application allows users to view, add, and edit patient information with a focus on smooth and interactive user experiences, using technologies like React Query, Styled Components, and Framer Motion.

## Features

- **View Patient Records**: Display a list of patient records in a user-friendly interface.
- **Add/Edit Patients**: Use a modal to add new patients or edit existing patient information.
- **Smooth Animations**: Leverage Framer Motion for interactive and polished animations.
- **Form Validation**: Ensure data accuracy and completeness with real-time form validation.
- **Responsive Design**: Optimized for various screen sizes and devices.

## Technologies Used

- **React**: Core framework for building the user interface.
- **Vite**: Fast and optimized build tool for modern web projects.
- **TypeScript**: Adds type safety and enhances code quality.
- **React Query**: Manages server state and simplifies data fetching and caching.
- **Styled Components**: CSS-in-JS library for styling React components.
- **Framer Motion**: Animation library for creating smooth, interactive animations.
- **ESLint & Prettier**: Ensures consistent code style and formatting.

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher) and **npm** installed on your machine.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/patient-management-app.git
   cd patient-management-app
   ```

2. **Clone the repository:**

   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
    npm run dev
   ```

This will start the Vite development server. The app will be accessible at http://localhost:5173/.

#### Linting and Formatting

```bash
  npm run lint
```

### Building for Production

To create a production build of the application:

```bash
npm run build
```

The optimized output will be in the dist directory.

## Project Structure

```bash
src/
│
├── assets/ # Static assets (images, icons, etc.)
├── components/ # Reusable React components
├── hooks/ # Custom hooks for data fetching and state management
├── pages/ # Main page components
├── services/ # API service functions (simulated for this project)
├── styles/ # Global styles and design tokens
├── utils/ # Utility functions (e.g., form validation schemas)
└── index.tsx # Entry point of the application
```

## Design Decisions

Vite was chosen for its fast development experience and optimized build process, making it an excellent fit for this project.

React Query is used to manage server state, handle caching, and provide a smooth data fetching experience.
Styled Components provides a flexible, component-based approach to styling, allowing for easy maintenance and theming.

Framer Motion was integrated to create smooth, engaging animations that enhance the user experience.
Future Enhancements

License
This project is licensed under the MIT License - see the LICENSE file for details.

Author
Martin Pascale Garcia
