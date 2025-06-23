# SplitSmart 💸 - Simple Group Expense Splitter

SplitSmart is a simple and mobile-friendly web app to help groups of friends, roommates, or families share and settle expenses easily and fairly.

---



## 🚀 Features
- Create groups (e.g., "Trip to Lagos", "Rent Sharing")
- Add members to groups
- Record expenses and assign payers/participants
- Automatic calculation of who owes whom
- Mark payments as done or use mock payment links
- Clean, responsive interface for mobile and desktop
- Basic user authentication (sign up, log in)


## 🚀 Features Implemented

### ✅ Authentication
- **User Sign-up/Login** using email and phone.
- JWT-based authentication system.
- Middleware for protecting private routes.
- Endpoint: `POST /api/users/register`  
- Endpoint: `POST /api/users/login`  

### ✅ Group Management
- Create groups for events (e.g., "Ibadan Trip").
- Each group has a name, description, and list of members.
- Group creator is automatically added to the members list.
- Endpoint:
   - `POST /api/groups` (Protected)
   - `GET /api/groups/:groupID`;  View groups that contains an authorized token for a user
   - `GET /api/groups`; View all groups

### ✅ Expense Management
- Add expenses to a group.
- Each expense has: title, amount, paidBy, groupId, and participants.
- Endpoint:
     - `POST /api/expenses` (Protected); to add new expense for a group
     - `GET /api/expenses/groups/:groupId`; to view all expenses for a group

### ✅ Settlement System
- Automatically compute who owes whom based on expenses.
- Endpoint:
   - `POST /api/settlement/groupID/settle` ; Record a breakdown of settlements between users within a group.
   - `GET /api/settlements/:groupId/transactions`; Suggest who owes who in a group (based on expenses)
   - `GET /api/settlements/:groupId` ; Fetch all recorded settlement in a group

### ✅ Swagger API Documentation
- Fully documented API with Swagger.
- Accessible via: `http://localhost:4000/api-docs`
- Includes descriptions for endpoints, request formats, and error responses.
- Authenticated endpoints use Bearer Token (JWT) in Swagger UI.

---

## 🧪 How to Test

### 📦 Requirements
- Node.js v18+
- MongoDB installed or Atlas connection
- Postman or Swagger UI

### 🔐 Getting a JWT Token
1. Register a user: `POST /api/users/register`
2. Log in with that user: `POST /api/users/login`
3. Copy the returned JWT token.
4. Use it in:
   - Postman: Authorization > Bearer Token
   - Swagger: Authorize 🔒 button > enter `Bearer <your_token>`

---

### Sample JSON test format

#### `/api/users/register`
```
{
    "username": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
}
```
---
#### `/api/users/login`
```
{
  "email": "johndoe@example.com",
  "password": "password123"
}

```
---
#### `/api/groups`
```
{
  "name": "Trip to Lokoja",
  "description": "Expense group for our Lokoja trip",
 "members": [
      "user2@gmail.com",
      "user3@gmail.com",
      "user4@gmail.com"
   ]
}

```
---
#### `/api/expenses/<groupID>`
```
{
  "description": "Ice Cream for the squad 🍨"
  "amount": 27000,
  "paidBy": "user3@gmail.com",
  "splitAmong": [
    "user1@gmail.com"
    "user2@gmail.com",
    "user3@gmail.com",
    "user4@gmail.com"
  ]
}

```
---
#### `/api/settlements/<groupID>settle`
```
{
  "fromEmail": "user1@gmail.com",
  "toEmail": "user3@gmail.com",
  "amount": 900,
  "totalOwed": 3000
}

```
---



## 🔄 API Routes Overview

| Endpoint                         | Method | Description                   | Auth Required  |
|----------------------------------|--------|-------------------------------|---------------  |
| `/api/users/register`            | POST   | Register a new user           | ❌              |
| `/api/users/login`               | POST   | Log in user, returns JWT      | ❌              |
| `/api/groups`                    | POST   | Create a new group            | ✅              |
| `/api/expenses/:groupId`         | POST   | Add expense to group          | ✅              |
| `api/settlements/:groupId/settle`| POST   | Record payment between users  | ✅              |
| `/api/expenses/group/:groupId`   | GET    | View all group expenses       | ✅              |
| `/api/groups/groupId`             | GET    | Get a single group by ID      | ✅              |
| `/api/settlements/groupid`       | GET    | Fetch all settlements         |  ✅             |
| `/api/settlements/groupid/transactions` | GET | Suggest who owes who   |  ✅             |
| `/api-docs`                      | GET    | Swagger API Documentation     | ❌              |

---

## 🪖 Tech Stack
- *Frontend*: React, TailwindCSS
- *Backend*: Node.js, Express.js
- *Database*: MongoDB with Mongoose
- *Auth*: JSON Web Tokens (JWT)
- *Other*: Vite, Axios, ESLint, Prettier

---

## 📁 Project Structure

```
Split-Smart API/
├── Middleware/
│   └── authMiddleware.js
├── Routes/
│   ├── userRoute.js
│   ├── groupRoute.js
│   ├── expenseRoute.js
│   └── settlementRoute.js
├── Controllers/
│   ├── userController.js
│   ├── groupController.js
│   ├── expenseController.js
│   └── settlementController.js
├── Models/
│   ├── userModel.js
│   ├── groupModel.js
│   ├── expenseModel.js
│   └── settlementModel.js
├── config/
│   └── db.js
├── Validations/
│   └── auth.js
├── app.js
├── .env
├── server.js
├── swagger.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

```
---


## 🌟 Future Features
- Premium account (reminders, reports)
- PDF export of expenses
- Real-time notifications
- Payment gateway integration (e.g., Flutterwave, Paystack)
- Admin panel for managing group data
- Offline mode (PWA)

---

## 💰 Subscription Plans
- Small fee for in-app payments (NGN 10 - 50)
- Premium tier (NGN 500/month)
- Ads for free users
- Custom group solutions (churches, cooperatives)

---


## 💪 License
MIT License. See LICENSE file for details.
