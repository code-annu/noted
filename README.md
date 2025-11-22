# Noted 📝

A collaborative note-taking application built with clean architecture principles, enabling users to create, version, and share notes with real-time collaboration features.

🔗 **Live Demo**: [https://noted-tawny.vercel.app/anurag](https://noted-tawny.vercel.app/anurag)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## 🌟 Features

### 1. **User Authentication**
- **Sign Up**: Create a new account with email and password
- **Login**: Secure authentication with JWT tokens
- **Profile Management**: Update user profile information

**Navigation**: Start at the homepage → Click "Sign Up" to create an account → After registration, use "Login" to access your dashboard

---

### 2. **Note Management**
- **Create Notes**: Write and save notes with a rich text editor
- **Update Notes**: Edit existing notes anytime
- **Delete Notes**: Remove notes you no longer need
- **Organize**: View all your notes in a centralized dashboard

**Navigation**: Dashboard → Click "Create New Note" → Write your content → Click "Save" → View all notes in "My Notes" section → Click any note to edit

---

### 3. **Version Control**
- **Create Versions**: Save snapshots of your notes at different points in time
- **Version History**: View all previous versions of a note
- **Restore Versions**: Revert to any previous version
- **Compare Changes**: See what changed between versions

**Navigation**: Open any note → Click "Versions" tab → View version history → Click "Create Version" to save current state → Select any version to preview or restore

---

### 4. **Collaboration**
- **Invite Users**: Share notes with other users via email
- **Role-Based Access**: 
  - **Viewer**: Can only view the note
  - **Editor**: Can view and edit the note
- **Real-time Updates**: See changes made by collaborators instantly
- **Manage Permissions**: Change or revoke user access anytime

**Navigation**: Open a note → Click "Share" button → Enter collaborator's email → Select role (Viewer/Editor) → Click "Invite" → Manage collaborators in "Shared With" section

---

## 🏗️ Architecture

This project follows **Clean Architecture** principles to ensure scalability, maintainability, and testability.

### Architecture Layers

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│    (React Components, UI, Routes)       │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Application Layer               │
│    (Use Cases, Business Logic)          │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│           Domain Layer                  │
│    (Entities, Domain Models)            │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      Infrastructure Layer               │
│  (Database, External APIs, Frameworks)  │
└─────────────────────────────────────────┘
```

### Project Structure

```
noted/
├── backend/
│   ├── src/
│   │   ├── domain/              # Core business entities
│   │   │   ├── entities/        # User, Note, Version, Collaboration
│   │   │   └── repositories/    # Repository interfaces
│   │   ├── application/         # Use cases and business logic
│   │   │   ├── usecases/        # CreateNote, UpdateNote, InviteCollaborator
│   │   │   └── services/        # Application services
│   │   ├── infrastructure/      # External dependencies
│   │   │   ├── database/        # MongoDB connection and models
│   │   │   ├── repositories/    # Repository implementations
│   │   │   └── auth/            # JWT authentication
│   │   └── presentation/        # API layer
│   │       ├── controllers/     # Route controllers
│   │       ├── routes/          # API routes
│   │       └── middleware/      # Auth, validation, error handling
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── auth/            # Login, SignUp components
│   │   │   ├── notes/           # Note list, editor, viewer
│   │   │   ├── versions/        # Version history, comparison
│   │   │   └── collaboration/   # Share modal, collaborator list
│   │   ├── pages/               # Page-level components
│   │   ├── services/            # API service calls
│   │   ├── hooks/               # Custom React hooks
│   │   ├── types/               # TypeScript interfaces
│   │   └── utils/               # Helper functions
│   └── package.json
│
└── README.md
```

---

## 🛠️ Tech Stack

### Backend
- **Node.js**: JavaScript runtime for server-side development
- **TypeScript**: Type-safe JavaScript for better code quality
- **Express.js**: Web framework for building REST APIs
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose**: ODM for MongoDB object modeling
- **JWT**: Secure token-based authentication
- **bcrypt**: Password hashing for security

### Frontend
- **React**: UI library for building interactive interfaces
- **TypeScript**: Type-safe development
- **React Router**: Client-side routing
- **Axios**: HTTP client for API requests
- **Context API / Redux**: State management (if applicable)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/code-annu/noted.git
cd noted
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Set up environment variables**

Create `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/noted
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

Create `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

6. **Run the application**

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Notes
- `GET /api/notes` - Get all user notes
- `GET /api/notes/:id` - Get specific note
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Versions
- `GET /api/notes/:id/versions` - Get note version history
- `POST /api/notes/:id/versions` - Create new version
- `GET /api/notes/:id/versions/:versionId` - Get specific version
- `POST /api/notes/:id/versions/:versionId/restore` - Restore version

### Collaboration
- `POST /api/notes/:id/collaborators` - Invite collaborator
- `GET /api/notes/:id/collaborators` - Get note collaborators
- `PUT /api/notes/:id/collaborators/:userId` - Update collaborator role
- `DELETE /api/notes/:id/collaborators/:userId` - Remove collaborator

---

## 🎯 Clean Architecture Benefits

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Testability**: Business logic is independent of frameworks
3. **Flexibility**: Easy to swap databases or frameworks without affecting core logic
4. **Maintainability**: Changes in one layer don't cascade to others
5. **Scalability**: New features can be added without restructuring

---

## 🔐 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes with middleware
- Role-based access control for collaboration
- Input validation and sanitization

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**
- GitHub: [@code-annu](https://github.com/code-annu)

---

## 🙏 Acknowledgments

- Clean Architecture principles by Robert C. Martin
- React and Node.js communities
- MongoDB documentation

---

## 📧 Contact

For questions or suggestions, please open an issue or contact me at code.annu@gmail.com

---

**⭐ If you find this project helpful, please give it a star!**