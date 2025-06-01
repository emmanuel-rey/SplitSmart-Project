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

## API Endpoints
```bash 
`POST /api/users` - Create a new user
`POST /api/auth/login` - User login
`GET /api/auth/logout` - User logout
`POST /api/groups` - Create a new group
`POST /api/expenses` - Add an expense to a group
`GET /api/groups/:id` - Get group details and balances
```

## 🪖 Tech Stack
- *Frontend*: React, TailwindCSS
- *Backend*: Node.js, Express.js
- *Database*: MongoDB with Mongoose
- *Auth*: JSON Web Tokens (JWT)
- *Other*: Vite, Axios, ESLint, Prettier

---

## 📂 Project Structure
```
SplitSmart/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
├── .env
├── README.md

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
