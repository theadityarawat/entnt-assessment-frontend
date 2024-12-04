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