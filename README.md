# Golf Charity Subscription Platform

A full-stack MERN application where users subscribe, submit golf scores, and participate in a monthly draw system with automated winner selection and prize distribution.

---

## Live Demo

* Frontend: https://charity-subscription-5uatjowdt-sayoni-deys-projects.vercel.app/
* Backend: https://charity-subscription.onrender.com

---

## Features

### Authentication

* User registration & login (JWT-based)
* Protected routes using middleware

### Subscription System (Demo)
* Users can select subscription plans
* Access to features is restricted without active subscription

### Score System
* Users can submit golf scores
* Only latest 5 scores are stored per user

### Draw System
* Admin can run a monthly draw
* Random winning numbers generated
* Scores compared automatically

### Winner & Prize Distribution
* Winners categorized based on matches:
  * 5 matches → Jackpot
  * 4 matches → Tier 2
  * 3 matches → Tier 3
* Prize pool distributed proportionally

### Dashboards
* User dashboard (scores, participation)
* Admin dashboard (run draw, view results)

---

## Tech Stack

### Frontend
* Next.js
* Tailwind CSS
* Axios

### Backend
* Node.js
* Express.js
* MongoDB
* Mongoose

### Deployment
* Frontend: Vercel
* Backend: Render

---

## Installation (Local Setup)

### Clone the repository
```bash
git clone https://github.com/sayoni-dey/Charity-Subscription
cd Charity-Subscription
```
---

### 2️⃣ Backend Setup
```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000
```
---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## API Endpoints (Key Routes)

### Auth
* POST `/api/auth/register`
* POST `/api/auth/login`

### User
* GET `/api/users/me`

### Scores
* POST `/api/scores`
* GET `/api/scores`

### Draw
* POST `/api/draw/run`

---

## Notes
* Payment gateway is implemented as a demo (no real transactions)
* Focus is on core backend logic and system design

---

## Testing
* Use Postman or frontend UI
* Ensure token is included in protected routes

---

## Future Improvements

* Stripe payment integration
* Email notifications
* Leaderboard system
* Real-time updates

---

## Author

**Sayoni Dey**

---

## Acknowledgements

Built as part of a full-stack assignment focusing on real-world system design and implementation.
