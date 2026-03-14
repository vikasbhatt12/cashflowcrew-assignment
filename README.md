# IdeaSpark – Mini Idea Pitching Board

**Live URL:** [https://cashflowcrew-assignment-cyan.vercel.app](https://cashflowcrew-assignment-cyan.vercel.app)

IdeaSpark is a platform where users can share their project ideas, discover what others are building, and upvote their favorites. Built as part of the CashFlowCrew Engineering Assessment.

## 🚀 Tech Stack (Path B)
- **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, Axios, date-fns
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB


## ✨ Bonus Features Implemented
1. **Server-Side Pagination** with intuitive client-side UI controls.
2. **Search & Filtering**: Debounced real-time search by title or author, and sorting (Newest / Most Upvoted).
3. **Form Validation**: Comprehensive client and server-side validation with helpful error messages.

## 🛠️ Local Setup Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.
You will also need a MongoDB URI (e.g., from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)).

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/cashflowcrew-assignment.git
cd cashflowcrew-assignment
```

### 2. Install Dependencies
Run the install script from the root to install dependencies for both the root, server, and client directories:
```bash
npm run install-all
```

### 3. Environment Variables
Create a `.env` file in the `server` directory and add your MongoDB connection string:
```bash
# server/.env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
```

### 4. Run the Application
Start both the client and server concurrently:
```bash
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

---
*Developed by Vikas Bhatt*
