# 🚀 BeatsVibe Core - Enterprise Learning Management System (LMS)

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Deployment](https://img.shields.io/badge/deployment-Vercel-black.svg)
![License](https://img.shields.io/badge/license-Proprietary-red.svg)

Welcome to the core repository of **BeatsVibe Technologies**, a next-generation Learning Management System designed for high-performance, zero-latency content delivery, and seamless student onboarding.

This application powers the BeatsVibe EdTech ecosystem, serving premium tech courses, managing student states, and handling secure media streaming via an edge-optimized architecture.

---

## 📑 Table of Contents
1. [System Architecture](#-system-architecture)
2. [Core Features](#-core-features)
3. [Technology Stack](#-technology-stack)
4. [Security & Authentication](#-security--authentication)
5. [Local Development](#-local-development)
6. [Deployment Pipeline](#-deployment-pipeline)
7. [About the Founder](#-about-the-founder)

---

## 🏗 System Architecture

BeatsVibe Core utilizes a lightweight, serverless-first approach to maximize performance and minimize infrastructure overhead. By leveraging a **Config-Driven Edge Database** (`app.js`), the platform achieves millisecond response times without the bottleneck of traditional database querying.



### Data Flow
1. **Client Request:** User hits the edge network (Vercel CDN).
2. **State Hydration:** Client-side JavaScript initializes the local state and dynamic UI.
3. **Transaction Routing:** Direct handoff to external payment gateways (Razorpay) via secure API links.
4. **Media Delivery:** Secure iframe embedding with `strict-origin-when-cross-origin` policies for proprietary video content (Google Drive/YouTube Unlisted).

---

## ✨ Core Features

### 🎓 For Students
* **Frictionless Checkout Workflow:** Bypass mandatory pre-registration. Users can browse the academy and initiate secure payments instantly.
* **Smart Dashboard (SPA):** A Single Page Application-like experience with dynamic tabs for Courses, Premium Notes, Locked Certificates, and Account Settings.
* **Virtual Classroom Engine:** A distraction-free, cinematic video player supporting responsive multi-module playlists and downloadable resources.
* **Adaptive UI/UX:** Built-in Dark/Light mode preference tracking, smooth CSS hardware-accelerated animations, and a mobile-first responsive grid.

### 🛡️ For Administrators
* **Role-Based Access Control (RBAC):** Strict admission-only portal. Users can only access the dashboard if explicitly provisioned by the Admin.
* **Config-Driven Scaling:** Easily deploy new courses, update pricing, or manage student cohorts by simply updating the master JSON objects.
* **Zero-Downtime Updates:** Seamless CI/CD integration ensures course content is updated globally in seconds.

---

## 💻 Technology Stack

* **Frontend Engine:** HTML5, CSS3, ES6+ JavaScript
* **Styling Framework:** Tailwind CSS (JIT via CDN) for utility-first, scalable design systems.
* **Typography & Icons:** Plus Jakarta Sans (Google Fonts), FontAwesome 6 Pro.
* **Cloud Platform:** Vercel Edge Network.
* **Payment Integration:** Razorpay Payment Links (Stateless routing).

---

## 🔒 Security & Authentication

* **Stateless Client Sessions:** User sessions are managed via localized `localStorage` tokens initialized only upon valid credential verification.
* **Piracy Mitigation:** Implementation of `referrerpolicy` restrictions on iFrames to prevent external embedding of proprietary video assets.
* **Route Protection:** Hardcoded redirects on protected routes (`dashboard.html`, `lesson.html`) instantly kick out unauthorized or unauthenticated requests.

---

## 🛠 Local Development

To run this project locally for development or testing:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/beatsvibe-core.git](https://github.com/your-username/beatsvibe-core.git)
   cd beatsvibe-core
