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

```text
mini-hrms.sql
```

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
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── helpers
│   ├── services
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── mini-hrms.sql
│
└── README.md
```

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


---

## Author

Karl Culi

Mini HRMS Assessment Project
