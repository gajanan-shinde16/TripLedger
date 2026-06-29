# TripLedger — Trip Management Platform

> A full-stack web application to create, explore, and manage travel listings — built with Node.js, Express, MongoDB, and EJS.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)

---

## 📌 What is TripLedger?

TripLedger lets users discover and list travel destinations. Users can create trip listings with images, descriptions, and location details — and leave reviews on others' trips.

---

## ✨ Features

- Create, read, update, and delete trip listings
- Image upload per listing via **Cloudinary**
- User authentication (register / login / logout)
- Leave and delete **reviews** on any listing
- Only listing owners can edit or delete their own trips
- **Flash messages** for success and error feedback
- Input validation using **Joi** schema

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js |
| Templating | EJS (Embedded JavaScript) |
| Database | MongoDB + Mongoose |
| Image Storage | Cloudinary + Multer |
| Auth | Passport.js (Local Strategy) + express-session |
| Validation | Joi |
| Styling | Bootstrap 5 |

---

## 📁 Project Structure (MVC)

```
TripLedger/
├── controllers/        # Route logic — listings, reviews, users
├── models/             # Mongoose schemas — Listing, Review, User
├── routes/             # Express routers
├── views/              # EJS templates
│   ├── listings/       # Index, show, new, edit
│   ├── reviews/        # Partials
│   └── users/          # Login, register
├── utils/              # ExpressError, wrapAsync
├── public/             # Static assets (CSS, JS)
├── init/               # DB seed data
├── uploads/            # Temp upload buffer
├── middleware.js        # isLoggedIn, isOwner, validateListing
├── cloudConfig.js       # Cloudinary + Multer setup
├── schema.js           # Joi validation schemas
└── app.js              # Entry point
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas URI)
- Cloudinary account (free tier works)

### 1. Clone the repo
```bash
git clone https://github.com/gajanan-shinde16/TripLedger.git
cd TripLedger
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SESSION_SECRET=your_session_secret
```

### 4. Seed the database (optional)
```bash
node init/index.js
```

### 5. Start the server
```bash
node app.js
```

App runs at `http://localhost:3000`

---

## 🔐 Middleware

| Middleware | Purpose |
|---|---|
| `isLoggedIn` | Redirects unauthenticated users to login |
| `isOwner` | Ensures only the listing creator can edit/delete |
| `isReviewAuthor` | Ensures only the review author can delete |
| `validateListing` | Runs Joi schema validation on listing data |
| `validateReview` | Runs Joi schema validation on review data |

---

## 🔮 Planned Features

- [ ] Map view using Leaflet.js
- [ ] Search and filter listings by location or category
- [ ] User profile page with all listings
- [ ] Pagination for listing index
