# ENTNT Assignment Frontend  

## Overview  

The ENTNT Assignment is a sleek, modern web application designed to streamline the management of communication schedules. This platform facilitates tracking company interactions, communication methods, and planned activities. Built with **React.js** and **Material-UI**, the app offers a responsive and user-friendly interface, making it effortless to view, add, and manage communication records.  

## Features  

### **Role-Based Access Control (RBAC)**  
- **Admins**:  
  - Create, update, and delete communication schedules.  
  - Manage all user communications effectively.  
- **Users**:  
  - View and filter communication schedules.  

### **Interactive DataGrid**  
- Dynamically displays communication data, including:  
  - Company names, communication types, and scheduled dates.  
- Supports sorting and filtering for an enhanced data visualization experience.  

### **CRUD Functionality**  
- Enables the addition of new communication records.  
- Streamlines updating and management of existing records.  

### **Search and Filter**  
- Quickly locate records by:  
  - Company name.  
  - Communication method.  
  - Scheduled date.  

### **Mock Data for Testing**  
- Displays sample data for testing.  
- Can be integrated with real-time APIs for dynamic data in the future.  

---

## Setup Instructions  

Follow these steps to get the application running on your local system:  

### **1. Clone the Repositories**  
- Clone the **frontend** and **backend** repositories:  

   ```bash  
   git clone https://github.com/theadityarawat/entnt-assessment-frontend 
   git clone https://github.com/theadityarawat/entnt-assessment-backend 
2. **Install dependencies**:

   Navigate to the project folder and install dependencies using npm:

   ```bash
   cd project
   npm install
   ```

3. **Run the development server**:

   Once the dependencies are installed, you can start the application locally:

   ```bash
   npm start
   ```

   This will start the development server and open the application in your browser at [http://localhost:3000](http://localhost:3000).

4. **Building for Production**:

   To create an optimized production build:

   ```bash
   npm run build
   ```
4. **Environment Variables**:

   For both frontend and backend, create a .env file at the root of the respective directories to store environment variables.

    **Frontend .env example:**

   ```bash
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```
    **Backend .env example:**

   ```bash
    PORT=5000
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_secret_key>
   ```
## Key Features
1. Role-Based Access Control

- Admins: Create, update, delete, and manage communication schedules.
- Users: View and filter communication schedules.
2. Dynamic DataGrid

- Displays communication details like company name, last interaction, and next scheduled interaction.
- Includes sorting and filtering options for enhanced data analysis.
3. CRUD Operations

- Create new communication records and manage schedules dynamically.
4. Search and Filtering

- Quickly locate communication records by company name or interaction details.
5. Interactive Calendar

- Visualize communication schedules and track upcoming deadlines.
## Technology Stack
- Frontend: React.js, Material-UI
- Backend: Node.js, Express.js, MongoDB
- Styling: Material-UI, custom CSS
- Deployment: Vercel (Frontend), Render (Backend)

## Future Enhancements
- Real-time notifications for due or overdue communications.
- Advanced reporting and analytics for communication history.
- Integration with third-party services like Google Calendar for reminders.