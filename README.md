# Task Management App

A Task Management App with drag-and-drop functionality using `@dnd-kit`. Users can manage tasks across three categories: **To-Do, In Progress, and Done** with real-time updates.

## 🚀 Live Demo
[Live App](https://cool-horse-1b4b9f.netlify.app)

## 📂 Technologies Used
- **Frontend:** React, Tailwind CSS, @dnd-kit
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Real-time Updates:** MongoDB Change Streams

## 📦 Dependencies

### Frontend
```json
"@dnd-kit/core": "latest",
"@dnd-kit/sortable": "latest",
"react-query": "latest",
"axios": "latest",
"tailwindcss": "latest"
```

### Backend
```json
"express": "latest",
"mongodb": "latest",
"cors": "latest",
"dotenv": "latest"
```

## 🛠 Installation & Setup

### Prerequisites
- **Node.js** (v16+ recommended)
- **MongoDB** (local or cloud instance)
- **VS Code** (Recommended for development)

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/Imranahmed935/task-management-app.git
   cd task-management-app/server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add your MongoDB connection string:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd ../client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## 🎯 Features
- Drag and Drop functionality with `@dnd-kit`
- Task management with real-time updates
- Secure authentication
- Responsive UI

## 🤝 Contributing
Feel free to fork the repository and create a pull request. Any contributions are appreciated!



