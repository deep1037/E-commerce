# 🛍️ ShopPro - E-Commerce PWA

ShopPro is a **Progressive Web App (PWA)** e-commerce platform built with **HTML, CSS, and JavaScript**.  
It provides a responsive shopping experience with **offline support**, product filtering, cart & wishlist management, and a dark/light theme toggle.

---

## 🚀 Features
- **Product Listings** – Dynamic product cards fetched from [FakeStore API](https://fakestoreapi.com/).
- **Search & Filters** – Real-time product search and category-based filtering.
- **Shopping Cart** – Add products to cart, update quantity, and view total price.
- **Wishlist** – Save your favorite products for later.
- **Dark/Light Theme** – Toggle between light and dark modes.
- **Offline Support** – Displays an indicator when the user is offline.
- **Responsive UI** – Works seamlessly on desktop and mobile.

---

## 🏗️ Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS)
- **API**: [FakeStore API](https://fakestoreapi.com/) for product data
- **PWA**: Offline detection with service worker support *(optional to add)*

---

## 📂 Project Structure
shoppro/
│
├─ index.html # Main HTML file
├─ style.css # Custom CSS styles
├─ script.js # Application logic (fetch, cart, wishlist)
└─ README.md # Project documentation

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/shoppro.git
cd shoppro
# Using VS Code Live Server Extension
Right-click → "Open with Live Server"

# OR using Python Simple Server
python -m http.server 5500
