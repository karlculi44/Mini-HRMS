# Mini HRMS (Human Resource Management System)

## Project Overview

Mini HRMS is a full-stack Human Resource Management System designed to manage employee records, attendance, salaries, payroll generation, and dashboard analytics.

The application was developed using React, Node.js, Express, and MySQL following a client-server architecture.

---

> [!IMPORTANT]
> **Please use the `Final-Output` branch when reviewing and testing the project.**
>
> During development, deployment-related configuration changes were explored and tested on other branches. To ensure a stable and consistent evaluation environment, the **`Final-Output`** branch contains the final verified version of the application that was fully tested in a local development environment.
>
> The `Final-Output` branch should be considered the official project submission branch.

---

## Features

### Authentication

* Input Validation
* Error Handling

### Employee Management

* Add Employees
* View Employee Records
* Update Employee Information
* Delete Employee Records

### Attendance Management

* Record Attendance
* View Attendance History
* Track Employee Attendance

### Salary Management

* Manage Employee Salaries
* View Salary Records

### Payroll Management

* Generate Payroll for Individual Employees
* Generate Payroll for All Employees
* View Payroll Records

### Dashboard

* Employee Statistics
* Attendance Statistics
* Payroll Summaries

---

## Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Tools

* Git
* GitHub
* Visual Studio Code

---

## Installation Guide

### Prerequisites

Before running the application, please install:

* Node.js
* MySQL Server
* Git

---

## Step 1: Clone the Repository

**Run the following commands in the terminal:**

```bash
git clone https://github.com/karlculi44/Mini-HRMS.git
```

```bash
cd Mini-HRMS
```

---

## Step 3: Database Setup

> [!WARNING]
> The database must be imported before running the application.
>
> Failure to import the provided SQL file will prevent the system from functioning correctly.

### Create Database

Execute the following command in MySQL:

```sql
CREATE DATABASE mini_hrms;
```

### Import Database

Import the provided SQL file:

 `mini-hrms.sql`

The SQL file contains:

* Database Schema
* Required Tables
* Sample Data
* Default Login Account

---

## Step 4: Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=<your_mysql_password>
DB_NAME=mini_hrms
DB_CONNECTION_LIMIT=10
```

Start the backend server:

```bash
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

---

## Step 5: Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend application:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

> [!TIP]
> Start the backend server before starting the frontend application.

---

## Default Login Credentials

Use the credentials included in the SQL file:

```text
Email: mockAdmin@test.com
Password: mockAdmin123
```

---

## Project Structure

```text
Mini-HRMS
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── mini-hrms.sql
│
└── README.md
```
---

Screenshots
Login Page

<img width="1735" height="814" alt="Login Page" src="https://github.com/user-attachments/assets/4fbc8cb0-9931-48b8-9575-02f545d1aa42" />



Dashboard

<img width="1896" height="858" alt="Dashboard" src="https://github.com/user-attachments/assets/3fa8eb05-150e-43df-b3a4-2041d0d046a5" />



Employee Management

<img width="1873" height="852" alt="Employees" src="https://github.com/user-attachments/assets/a49ce8f3-40ff-41dd-aba2-d0d5a0cf464b" />



Attendance Management

<img width="1893" height="855" alt="Attendance" src="https://github.com/user-attachments/assets/130a0abf-d57a-44b7-869c-c5ba381c2c4c" />



Salary Management

<img width="1894" height="857" alt="Salaries" src="https://github.com/user-attachments/assets/740f58f4-f982-4355-b129-1a57e89ab6a3" />



Payroll Management

<img width="1890" height="851" alt="Payroll" src="https://github.com/user-attachments/assets/3992a4db-800c-4886-ab9a-697b656fcaee" />



Printable Payslip

<img width="1297" height="853" alt="Payslip" src="https://github.com/user-attachments/assets/3dcdc78f-100d-4a48-90f1-21ef69dd93de" />


---


## Notes

> [!NOTE]
> The project was developed and tested in a local development environment using React, Express, Node.js, and MySQL.

> [!NOTE]
> The provided SQL file contains all required tables and sample data needed to run the system.

> [!NOTE]
> The `Final-Output` branch should be used for evaluation and testing purposes.

---

## Submission Contents

✅ Source Code

✅ Database SQL File

✅ README Documentation

✅ GitHub Repository Link

✅ System Screenshots


---

## Author

Karl Culi

Mini HRMS Assessment Project
