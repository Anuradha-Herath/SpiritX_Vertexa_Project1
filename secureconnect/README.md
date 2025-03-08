# SecureConnect

SecureConnect is a secure authentication system built using Next.js (TypeScript), MongoDB, JWT, and Tailwind CSS. This project implements signup and login workflows with validation, error handling, and session management, ensuring a seamless integration between the frontend, backend, and database.

## Features

- **User Authentication**: Secure signup and login processes with JWT for session management.
- **Real-time Validation**: Input fields for username and password include real-time validation and error messages.
- **Password Strength Indicator**: Visual feedback on password strength during signup.
- **Responsive Design**: Tailwind CSS is used for a responsive and modern UI.
- **Session Management**: JWT stored in HTTP-only cookies for enhanced security.
- **Error Handling**: Comprehensive error handling for user input and API responses.

## Project Structure

```
secureconnect
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   ├── login
│   │   │   │   ├── logout
│   │   │   │   └── signup
│   │   │   └── hello
│   │   ├── login
│   │   ├── signup
│   │   ├── welcome
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── auth
│   │   ├── ui
│   │   └── PasswordStrength.tsx
│   ├── lib
│   ├── middleware.ts
│   ├── models
│   └── types
├── .env.local
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- A package manager (npm or yarn)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/secureconnect.git
   cd secureconnect
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory and add your MongoDB connection string and JWT secret:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. Create a favicon.ico file:
   - Get a simple icon (16x16 or 32x32 pixels)
   - Save it as `favicon.ico` in the `/public` directory
   - You can use online favicon generators like [favicon.io](https://favicon.io/)

5. Run the development server:
   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Navigate to the signup page to create a new account.
- Use the login page to authenticate and access the welcome page.
- The welcome page displays a personalized greeting and includes a logout button.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.