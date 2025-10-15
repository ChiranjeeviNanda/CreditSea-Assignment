# CreditSea Assignment – MERN Stack Credit Report Viewer

This repository contains a full-stack MERN application for uploading, parsing, and visualizing consumer credit reports from Experian XML files. The project features a modern React frontend (Vite, Tailwind, DaisyUI) and a robust Express.js backend with MongoDB for data persistence.

## Live Demo

[https://creditsea-internship-assignment.onrender.com/](https://creditsea-internship-assignment.onrender.com/)

## Features

- **Upload Experian XML Files:** Securely upload credit report files for parsing and analysis.
- **Automated XML Parsing:** The backend extracts key consumer, account, and summary data from the raw XML, transforming it into structured JSON.
- **Credit Score Visualization:** Interactive gauge dial and detailed score breakdowns.
- **Portfolio & Account Summaries:** View total accounts, current balances, secured/unsecured breakdowns, and recent enquiries.
- **Account History:** Chronological **DPD (Days Past Due) grid** for each credit account, providing a clear history of payment performance.
- **Deep Dive:** Expandable sections for viewing raw application data, metadata, and the complete portfolio structure.
- **Mobile Responsive Design:** The interface is optimized to provide a seamless viewing experience across **all devices, from desktop to mobile**.
- **Theme Support:** Toggle between **light and dark modes** for personalized viewing comfort.
- **Single-Port Deployment:** Optimized for platforms like Render or Heroku, serving both the API and the frontend from a single Express instance.

## Screenshots
<img width="1920" height="1000" alt="image" src="https://github.com/user-attachments/assets/25f70bc6-b8fa-4535-9ed1-4d0f1341de90" />
<img width="1920" height="952" alt="image" src="https://github.com/user-attachments/assets/16d52dfa-e834-4968-ba21-f8cfaae99dcb" />
<img width="1920" height="952" alt="image" src="https://github.com/user-attachments/assets/b680f0fa-9d45-470a-8760-c36f7775d29a" />
<img width="1920" height="952" alt="image" src="https://github.com/user-attachments/assets/4de3715b-1c02-46cd-bdba-d3c01c883ad0" />
<img width="1920" height="952" alt="image" src="https://github.com/user-attachments/assets/5baaaaac-2843-40ec-8820-b6491cb03aee" />

---

## Project Structure

```
.
├── backend/
│   ├── .env
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── controllers/
│       │   └── report.controller.js
│       ├── lib/
│       │   └── db.js
│       ├── models/
│       │   └── Report.js
│       └── routes/
│           └── report.route.js
├── frontend/
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── api/
│       │   └── reportApi.js
│       ├── components/
│       │   ├── AccountHistory.jsx
│       │   ├── ConsumerOverview.jsx
│       │   ├── CreditAccountRow.jsx
│       │   └── ...
│       ├── config/
│       ├── contexts/
│       ├── hooks/
│       ├── pages/
│       └── utils/
├── .gitignore
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas or local MongoDB instance

### Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/creditsea-assignment.git
   cd creditsea-assignment
   ```

2. **Install dependencies for both frontend and backend:**
   ```sh
   npm run install-dependencies
   ```

3. **Configure environment variables:**
   - Copy `backend/.env.example` to `backend/.env` and set your MongoDB URI and desired port.

4. **Run the backend server (development):**
   ```sh
   cd backend
   npm run dev
   ```

5. **Run the frontend (development):**
   ```sh
   cd ../frontend
   npm run dev
   ```

6. **Access the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5001/api](http://localhost:5001/api)

### Production Build

- Build the frontend:
  ```sh
  npm run build
  ```
- Start the backend (serves frontend from `/frontend/dist` if `NODE_ENV=production`):
  ```sh
  npm run start
  ```

## API Endpoints

- `POST /api/reports/upload` – Upload XML file and process report.
- `GET /api/reports/:id` – Fetch processed report by ID.

## Technologies Used
### Frontend
| Technology | Description |
| :--- | :--- |
| **React** | Core library for building the user interface. |
| **Vite** | Fast build tool and dev server. |
| **Tailwind CSS** | Utility-first CSS framework for rapid styling. |
| **DaisyUI** | Tailwind plugin providing pre-designed component classes (buttons, navbar, badges). |
| **`react-router-dom`** | For client-side routing between the upload and report pages. |
| **`react-gauge-component`**| Library used for rendering the credit score dial. |
| **`lucide-react`** | Icon library for clean, vector graphics. |

### Backend (Assumed)
| Technology | Description |
| :--- | :--- |
| **Node.js / Express** | Server runtime environment and web framework. |
| **`multer`** | Middleware for handling multipart/form-data (file uploads). |
| **`xml2js`** | Library for converting the uploaded credit report XML file into usable JSON data. |

---

**CreditSea Assignment** – Built for credit report analysis and visualization.
