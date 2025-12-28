

# 🏠 Property Buy & Sell Platform

A full-stack **Property Buy & Sell web application** that allows users to list, search, and manage properties for buying and selling.
The platform is built with a **modern React frontend**, **Spring Boot backend**, **MySQL database**, and fully **Dockerized** for easy deployment.

---

## 🚀 Features

* 👤 User Registration & Login
* 🏘️ List properties for sale
* 🔍 Search & filter properties (location, price, type)
* 📄 View detailed property information
* ❤️ Save favorite properties
* 🧑‍💼 Admin property management (optional)
* 🔐 Secure REST APIs
* 📱 Responsive UI for all devices
* 🐳 Dockerized frontend, backend & database

---

## 🛠️ Tech Stack

### Frontend

* React.js
* HTML5, CSS3, JavaScript
* Axios (API communication)
* Bootstrap / Tailwind CSS

### Backend

* Spring Boot
* Spring Data JPA (Hibernate)
* Spring Security (JWT)
* RESTful APIs

### Database

* MySQL

### DevOps

* Docker
* Docker Compose

---

## 🧩 System Architecture

```
React (Frontend)
      |
REST APIs
      |
Spring Boot (Backend)
      |
   MySQL DB
```

---

## 📂 Project Structure

```
property-buy-sell/
 ├── frontend/
 │    ├── src/
 │    ├── public/
 │    └── Dockerfile
 │
 ├── backend/
 │    ├── src/main/java
 │    │    ├── controller
 │    │    ├── service
 │    │    ├── repository
 │    │    └── model
 │    ├── src/main/resources
 │    │    └── application.yml
 │    └── Dockerfile
 │
 ├── docker-compose.yml
 └── README.md
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/property-buy-sell.git
cd property-buy-sell
```

---

### 2️⃣ Configure MySQL (If running without Docker)

```sql
CREATE DATABASE property_db;
```

Update backend config:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/property_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

---

### 3️⃣ Run Using Docker (Recommended)

```bash
docker-compose up --build
```

Access the application:

* **Frontend:** [http://localhost:3000](http://localhost:3000)
* **Backend API:** [http://localhost:8080](http://localhost:8080)

---

## 🔐 API Features

* RESTful architecture
* JSON-based communication
* Secure endpoints
* Role-based access 

---

## 📸 Screenshots

*Add screenshots of:*

* Home Page
* Property Listing Page
* Property Details Page
* Login / Register Page
* Admin Dashboard 

---

## 🎯 Future Enhancements

* Property image upload
* Chat between buyer & seller
* Google Maps integration
* Payment gateway integration
* Email & SMS notifications
* Advanced search & AI recommendations

---

## 👨‍💻 Developer

**Ajay Yadav**
Full Stack Java Developer

* Spring Boot | React | MySQL
* Docker | Git | Linux | REST APIs
