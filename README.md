# ♻️ RecycleHub

## 📌 Project Overview
RecycleHub is an **Angular-based Single Page Application (SPA)** designed to facilitate **waste collection and recycling management**. The platform connects individuals with **authorized collectors** to streamline the waste recycling process.

## 🚀 Features
### 👤 User Features
- **Signup/Login**: Register and log in with email/password.
- **Profile Management**: Update personal information and delete account.
- **Request Collection**: Submit a request with details on waste type, weight, and pickup time.
- **View and Manage Requests**: Modify or cancel pending requests.
- **Points System**: Earn points based on recycled materials and redeem them for vouchers.

### 🚛 Collector Features
- **View Available Requests**: Access pending requests in the same city.
- **Accept and Manage Requests**: Change request statuses (`En attente`, `Occupée`, `En cours`, `Validée`, `Rejetée`).
- **Verify and Validate Collection**: Check waste details, confirm weight, and finalize transactions.

## 🛠️ Tech Stack
- **Frontend:** Angular 18+ (with NgRx for state management, RxJS for reactive programming).
- **UI Framework:** Bootstrap / TailwindCSS.
- **Data Persistence:** LocalStorage or IndexedDB.


## 🔧 Installation & Setup
### Prerequisites
- **Node.js 18+**
- **Angular CLI 18**

### Steps to Run
```sh
# Clone the repository
git clone https://github.com/Soulaiman-Bo/recycleHub
cd recycleHub

# Install dependencies
npm install

# Start the development server
ng serve -o
```

## 🧪 Testing
```sh
# Run unit tests
ng test

# Run end-to-end tests
ng e2e
```

## 🚀 Deployment
To build and deploy the application, use:
```sh
ng build --prod
```
Host the generated `dist/` folder on **Firebase, Netlify, Vercel, or any static hosting service**.

## 🏆 Contribution
Contributions are welcome! Please fork the repo, make your changes, and submit a pull request.

## 📜 License
This project is licensed under the **MIT License**.

---
_Developed with ❤️ for a greener planet!_ 🌍
