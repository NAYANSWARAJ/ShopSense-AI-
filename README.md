# 🛍️ ShopSense

### AI-Powered Online Shopping Intention Prediction Platform

<p align="center">
  <strong>Predict • Analyze • Understand Customer Intent</strong>
</p>

<p align="center">
  ShopSense is a full-stack Machine Learning application that predicts whether an online visitor is likely to make a purchase based on their browsing session behavior.
</p>

<p align="center">

  <a href="https://shopsense1.netlify.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-ShopSense-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Live Demo">
  </a>

  <a href="https://github.com/urankit19/ShopSense">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>

  <img src="https://img.shields.io/badge/ML-XGBoost-orange?style=for-the-badge" alt="XGBoost">

  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">

  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react&logoColor=white" alt="React">

</p>

---

## 🌐 Live Demo

### 🚀 ShopSense

**Live Website:**  
https://shopsense1.netlify.app/

**Backend API:**  
https://shopsense-backend-i3ji.onrender.com/

> The frontend is deployed on Netlify, while the Node.js backend is deployed on Render.

---

# 📌 About The Project

**ShopSense** is an AI-powered online shopping intention prediction system designed to analyze customer browsing behavior and estimate whether a visitor is likely to complete a purchase.

The system takes various session-level features such as:

- Administrative page visits
- Informational page visits
- Product-related page visits
- Page duration
- Bounce rate
- Exit rate
- Page value
- Visitor type
- Month
- Operating system
- Browser
- Region
- Traffic type
- Weekend activity

and uses a trained **XGBoost Machine Learning model** to generate a purchase-intention prediction.

The application provides the prediction through a modern web interface and stores prediction history in **MongoDB Atlas** for further analysis.

---

# 🎯 Problem Statement

E-commerce platforms generate large amounts of behavioral data from their visitors.

However, understanding whether a visitor is actually interested in purchasing a product is difficult using traditional rule-based systems.

ShopSense addresses this problem by using Machine Learning to analyze browsing-session behavior and predict the probability of purchase intention.

### The system aims to help answer:

> **"Is this visitor likely to make a purchase?"**

---

# 💡 Key Features

### 🤖 Machine Learning Prediction

- XGBoost-based classification model
- Predicts online shopping purchase intention
- Generates purchase probability
- Provides prediction confidence

### 📊 Customer Behavior Analysis

Analyzes multiple session-level behavioral attributes including:

- Page visits
- Page duration
- Bounce rate
- Exit rate
- Page value
- Visitor type
- Traffic source
- Device/browser information

### 🎨 Modern Frontend

- Responsive React interface
- Clean and professional UI
- Interactive prediction form
- Prediction result visualization
- Dashboard for analytics

### ⚡ REST API

Node.js and Express.js backend provides APIs for:

- Predictions
- Prediction history
- Analytics
- Health monitoring

### 🗄️ Database

MongoDB Atlas is used to store:

- Prediction results
- Purchase probability
- Confidence
- Prediction timestamps
- Model information

### ☁️ Cloud Deployment

The project uses:

- GitHub → Source Code
- Netlify → Frontend
- Render → Backend / ML services
- MongoDB Atlas → Cloud Database

---

# 🏗️ System Architecture

```text
                    ┌───────────────────────┐
                    │       USER            │
                    │                       │
                    │  Shopping Session     │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │   React Frontend      │
                    │      Netlify          │
                    └───────────┬───────────┘
                                │
                         REST API Request
                                │
                                ▼
                    ┌───────────────────────┐
                    │   Node.js Backend     │
                    │      Express.js       │
                    │       Render          │
                    └───────────┬───────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
        ┌────────────────────┐   ┌────────────────────┐
        │   ML Service       │   │   MongoDB Atlas    │
        │     FastAPI        │   │                    │
        │      Render        │   │ Prediction History │
        └─────────┬──────────┘   └────────────────────┘
                  │
                  ▼
        ┌────────────────────┐
        │   XGBoost Model    │
        │                    │
        │ Purchase Intention │
        │    Prediction      │
        └─────────┬──────────┘
                  │
                  ▼
        ┌────────────────────┐
        │ Prediction Result  │
        │                    │
        │ Probability        │
        │ Confidence         │
        │ Purchase / No      │
        └────────────────────┘


    User enters shopping session data
              │
              ▼
       React Frontend
              │
              ▼
      Node.js REST API
              │
              ▼
      FastAPI ML Service
              │
              ▼
      Data Preprocessing
              │
              ▼
        XGBoost Model
              │
              ▼
     Purchase Prediction
              │
        ┌─────┴─────┐
        ▼           ▼
   Prediction    Probability
        │           │
        └─────┬─────┘
              ▼
       MongoDB Atlas
              │
              ▼
        Dashboard    