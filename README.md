# GameSpot

![React](https://img.shields.io/badge/React-18.1.0-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.7.2-3178C6?logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.1.3-7952B3?logo=bootstrap&logoColor=white)
![Formik](https://img.shields.io/badge/Formik-2.2.9-165DFF?logo=formik&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-0.27.2-5A29E4?logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.3.0-CA4245?logo=react-router&logoColor=white)

A modern, full-featured frontend application that streamlines video game rental business operations. Built with React and TypeScript, GameSpot provides a user-friendly interface for managing game inventory, customer data, and rental transactions in one seamless platform.

**Live Demo:** [GameSpot App](https://gamespotz.netlify.app/games)

## 🎮 Overview

GameSpot is a comprehensive management system that enables video game rental businesses to efficiently track their inventory, manage customer relationships, and process rental transactions. The application provides a modern UI with responsive design, secure authentication, and a streamlined workflow for daily rental operations.

## 🚀 Features

- **Game Inventory Management**: Add, edit, and track detailed information about game titles
- **Customer Database**: Store and manage customer profiles and contact information
- **Rental Processing**: Handle the complete rental lifecycle from checkout to return
- **Automated Fee Calculation**: Calculate rental fees based on rental duration
- **Responsive Design**: Optimized for both desktop and mobile devices
- **User Authentication**: Secure JWT-based authentication system
- **Form Validation**: Comprehensive validation using Formik and Yup
- **Intuitive UI**: Clean, modern interface built with Bootstrap and custom CSS

## 🛠️ Technology Stack

### Core Technologies

- **React 18**: Modern component-based UI library
- **TypeScript 4.7**: Static typing for improved code quality and developer experience
- **React Router 6.3**: Declarative routing for React applications
- **Bootstrap 5.1**: Responsive CSS framework for styled components
- **Formik 2.2**: Form management library with built-in validation
- **Axios 0.27**: Promise-based HTTP client for API requests
- **JWT Authentication**: Secure user authentication with JWT tokens

### UI Components and Styling

- **React Bootstrap 2.4**: Bootstrap components built for React
- **React Select 5.3**: Flexible select input control
- **FontAwesome 6.1**: Icon library for enhanced UI elements
- **Custom CSS**: Tailored styling for unique design elements

### Development Tools

- **Create React App**: Toolchain for modern React development
- **ESLint**: Static code analysis for identifying problematic patterns
- **Jest & React Testing Library**: Testing framework for React components

## 🏗️ Project Architecture

GameSpot follows a modern React application architecture with clean separation of concerns:

```
src/
├── components/       # Reusable UI components
├── pages/            # Page-level components and routes
├── services/         # API service calls and business logic
├── context/          # React context for state management
├── hooks/            # Custom React hooks
├── utils/            # Utility functions and helpers
├── types/            # TypeScript type definitions
├── assets/           # Static assets (images, styles)
└── App.tsx           # Main application component
```

## 🔧 Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/a-maystorov/gamespot-client.git
cd gamespot-client

# Install dependencies
npm install

# Start development server
npm start
```

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

## 📷 Application Screenshots

### Game Library

![Game Library](https://user-images.githubusercontent.com/76817540/179537952-14bfb25d-c886-4f22-8119-3d34e09e0a68.jpeg)
_Browse through the complete game inventory with filtering options_

### Customer Management

![Customer Management](https://user-images.githubusercontent.com/76817540/179537996-73956e0f-ac12-40d1-987d-e140bc519fac.jpeg)
_Manage customer information and view rental history_

### Rental Processing

![Rental Processing](https://user-images.githubusercontent.com/76817540/179537988-ce2d75fe-43c2-4b46-8b66-2991ce4f4aa6.jpeg)
_Process game rentals and returns with automatic fee calculation_

## 💡 Key Technical Challenges Solved

- **Type-Safe API Integration**: Implemented strongly-typed API services using TypeScript interfaces
- **Form State Management**: Created a reusable form architecture with Formik and Yup validation
- **JWT Authentication Flow**: Built a secure authentication system with token refresh
- **Responsive Design System**: Developed a consistent UI that works across all device sizes
- **Optimized Rendering**: Improved performance through React's memo and useCallback hooks

## 🌟 Learning Outcomes & Skills Demonstrated

This project showcases proficiency in:

- Building complex React applications with TypeScript
- Implementing secure authentication and authorization
- Creating intuitive user interfaces with modern design principles
- Structuring scalable frontend architecture
- Working with RESTful APIs and asynchronous data flows
- Form validation and error handling
- Responsive web design

## 📝 Future Enhancements

- **Dark Mode**: Implement theme switching capability
- **Analytics Dashboard**: Add reporting features with data visualization
- **Advanced Search**: Enhance search functionality with filters
- **Offline Support**: Implement service workers for offline capabilities
- **Localization**: Add multi-language support

## 👤 About the Developer

I'm a passionate frontend developer with a love for creating clean, user-friendly applications. My background in gaming inspired this project, combining my technical skills with my personal interests to create a solution that addresses real business needs.

## 📫 Contact

- **LinkedIn**: [Alkin Maystorov](https://www.linkedin.com/in/alkin-maystorov/)
- **Portfolio**: [alkinmaystorov.com](https://alkinmaystorov.com)
- **Frontend Mentor**: [@SirDev97](https://www.frontendmentor.io/profile/SirDev97)

---

© 2025 Alkin Maystorov | Built with ❤️ using React & TypeScript
