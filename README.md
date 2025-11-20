# WasteWise Project

## Overview

WasteWise is a MERN-based application enabling users to create, view,
and discuss waste management reports within the community. The system
integrates Clerk for authentication, MongoDB for data storage, and
Node/Express for backend APIs.

## Features

-   User authentication via Clerk
-   Report creation, viewing, editing, and deletion
-   Comment system for user discussions
-   Admin routes with elevated privileges
-   Responsive frontend using React, TailwindCSS, and ShadCN UI
-   Sidebar navigation with mobile support

## Tech Stack

### Frontend

-   React
-   Vite
-   TailwindCSS v4
-   ShadCN UI components
-   Clerk authentication

### Backend

-   Node.js
-   Express.js
-   MongoDB with Mongoose
-   Clerk server authentication (`@clerk/clerk-sdk-node`)
-   JWT for additional user security

## Folder Structure

    backend/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
      server.js

    frontend/
      src/
      public/
      index.html
      main.jsx

## Environment Variables

### Frontend (.env)

    VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxx
    VITE_API_URL=http://localhost:5000/api

### Backend (.env)

    MONGODB_URI=your_mongo_connection
    PORT=5000
    CLERK_SECRET_KEY=sk_test_xxxxxxxxx
    JWT_SECRET=your_jwt_secret_key

## Setup Instructions

### Backend

``` bash
cd backend
npm install
npm run dev
```

### Frontend

``` bash
cd frontend
npm install
npm run dev
```

Ensure both servers are running simultaneously.

## API Endpoints

### Reports

-   `GET /api/reports`
-   `POST /api/reports` (auth)
-   `PUT /api/reports/:id` (auth)
-   `DELETE /api/reports/:id` (auth)

### Admin

-   `GET /api/admin/dashboard` (admin only)

### Users

-   `GET /api/users` (admin only)
-   `GET /api/users/me` (auth)

------------------------------------------------------------------------

## Contributing

Pull requests are welcome! For major changes, open an issue first.

## License

MIT License
