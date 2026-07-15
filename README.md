# Project-Assessment-Bean-Scene-Ordering-App-API

### Developed by Lloyd Ryu

## Overview
Diploma of Information Technology (Advanced Programming) Mobile Application Development Cluster

The Bean Scene Ordering API is a secure, scalable backend service powering the restaurant’s digital ordering system. It provides endpoints for menu browsing, order placement, staff authentication, and manager‑level administration as intermediary to the MongoDB database.

This API is designed for use exclusively by Bean Scene staff through the official mobile application running on Android tablets.

## Features

### Ordering (Staff Only)

- Place orders for tables (Main, Outside, Balcony areas)
- Add dietary notes, allergens, and special requests
- Track order status (in‑progress, completed)
- Add timestamps and notes

### Menu Management (Manager Only)

- Retrieve/Add/edit/delete menu items
- Retrieve/Add/edit/delete menu categories
- Set as available or unavailable  
- Include dietary flags like gluten‑free, vegetarian, vegan, allergens

### Staff Management (Manager Only)
- Retrieve/Add/edit/delete staff accounts
- Role‑based access control for Manager and Staff

### Reporting
- View order activity summaries
- Compare in‑progress vs completed orders

### Security
- JWT‑based authentication
- Role‑based authorization
- Strong password policies
- REST API protection against unauthorized access

## Technology Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

## Setup Instructions

### Clone the repository
- Open up  Windows Powershall
- git clone https://github.com/Lloyd-05 Project-Assessment-Bean-Scene-Ordering-App-API
- cd Bean-Scene-Ordering-App-API 
### Connect
- Log into MongoDB Atlas
- Create a cluster
- Go to Database → Connect → Drivers
- Copy the connection string
- Add your IP to the Network Access whitelist

### Install dependencies and create a .env file
- Go back to the local repository 
- npm install
- create a .env file
- add the following environment variables
    PORT=5000
    MONGO_URI=<"your MongoDB Atlas connection string">
    JWT_SECRET=<"your-secret-key">

### Running the API
- Start the server by entering the following command
    npm run start
- The Swagger documentation is available in the terminal when running the API.
- The link to swagger is the following:
    http://localhost:5000/api-docs