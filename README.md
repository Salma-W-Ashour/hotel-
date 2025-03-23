<div align="center">
  <a href="https://react.dev">
    <img width="50%" src="https://github.com/rebhi-2002/ReactJS/blob/main/assets/ReactJS-unscreen.gif" alt="ReactJS Logo" />
  </a>

  <h1 href="https://react.dev">🏨 Hotel Booking Management System</h1>
  <p>A full-stack hotel booking management system with modern UI/UX, secure authentication, and real-time booking capabilities.</p>
  <br />

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react)
[![GitHub repo size](https://img.shields.io/github/repo-size/Salma-W-Ashour/hotel-?style=plastic&color=61DAFB&label=Repo%20Size&logo=react)](https://github.com/Salma-W-Ashour/hotel-)
[![GitHub contributors](https://img.shields.io/github/contributors/Salma-W-Ashour/hotel-?style=plastic&color=181717&label=Contributors&logo=github)](https://github.com/Salma-W-Ashour/hotel-)
[![GitHub stars](https://img.shields.io/github/stars/Salma-W-Ashour/hotel-?style=plastic&color=FFD700&label=Stars)](https://github.com/Salma-W-Ashour/hotel-)
[![GitHub forks](https://img.shields.io/github/forks/Salma-W-Ashour/hotel-?style=plastic&color=008000&label=Forks)](https://github.com/Salma-W-Ashour/hotel-)

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)

  <img src="public/demo-banner.png" alt="Hotel Booking System Demo" width="90%" />
</div>

<br />

<!-- # Hotel JavaScript Content -->

## 📌 Table of Contents

- [✨ Key Features](#-key-features)
- [🛠️ Technical Stack](#-technical-stack)
- [🚀 Installation](#-installation)
- [📂 Project Structure](#-project-structure)
- [🤝 Contribution](#-contribution)
- [📄 License](#-license)
- [📚 References](#-references)

## Key Features ✨

- **User Authentication** 🔐  
  Secure JWT-based login/signup with form validation
- **Room Management** 🛏️  
  CRUD operations for hotel rooms with availability tracking
- **Booking System** 📅  
  Real-time reservation management with calendar integration
- **Payment Gateway** 💳  
  Integrated Stripe payment processing
- **Admin Dashboard** 📊  
  Comprehensive management interface for hotel operations
- **Responsive Design** 📱  
  Mobile-first approach with adaptive layouts
- **Search & Filters** 🔍  
  Advanced search with multiple filtering options

## Technology Stack 🛠️

| Technology      | Purpose              |
| --------------- | -------------------- |
| React           | Frontend Framework   |
| React Router    | Navigation & Routing |
| Tailwind CSS    | Styling & Theming    |
| React Hook Form | Form Management      |
| Yup             | Data Validation      |
| Axios           | HTTP Client          |
| React Toastify  | Notifications        |
| React Icons     | Icon Library         |
| Stripe          | Payment Processing   |
| JWT             | Authentication       |

## Getting Started

Before you begin, make sure you meet the following requirements:

### Requirements

To run the ReactJS project, you'll need:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/))
- A text editor like [Visual Studio Code](https://code.visualstudio.com/) (optional)

#### Prerequisites

- Node.js v16+
- npm v8+
- Stripe API keys

### Installation

1. Install Node.js and npm (or Yarn) from the official website.
2. Clone the project repository to your computer:

```bash
# Clone the repository
git clone https://github.com/Salma-W-Ashour/hotel-.git

# Navigate to project directory
cd hotel-

# Install dependencies
npm install
# Or
yarn install

# Start development server
npm start
```

**To set up your project, you can use [Create React App](https://github.com/facebook/create-react-app). It's a popular tool for quickly bootstrapping React applications.**

## Sign in to continue your journey

### Username

- ✅ Required (Username is required)

### Email

- ✅ Required (Email is required)

### Password

- ✅ Must be at least **6 characters long** (Password must be at least 6 characters)

## Test Accounts

Use these credentials to log in:

| Email            | Username |
| ---------------- | -------- |
| admin@gmail.com  | admin    |
| user@example.com | user123  |

### Project Libraries and Versions

In this project, we are using the following libraries and versions:

> :star: **ProjectFolder\package.json:**

```json
  "dependencies": {
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@gsap/react": "^2.1.2",
    "@headlessui/react": "^1.6.6",
    "@heroicons/react": "^1.0.6",
    "@hookform/resolvers": "^4.1.0",
    "@mui/icons-material": "^6.4.6",
    "@mui/material": "^6.4.6",
    "@mui/x-data-grid": "^7.27.2",
    "@mui/x-date-pickers": "^7.27.1",
    "@reduxjs/toolkit": "^2.5.1",
    "@shadcn/ui": "^0.0.4",
    "@stripe/react-stripe-js": "^3.4.0",
    "@stripe/stripe-js": "^5.10.0",
    "@tanstack/react-query": "^5.66.0",
    "@tanstack/react-table": "^8.21.2",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/gsap": "^1.20.2",
    "axios": "^0.27.2",
    "bootstrap": "^5.3.3",
    "browserify-zlib": "^0.2.0",
    "buffer": "^6.0.3",
    "classnames": "^2.5.1",
    "cors": "^2.8.5",
    "date-fns": "^2.30.0",
    "deepmerge": "^4.3.1",
    "dom": "^0.0.3",
    "express": "^4.21.2",
    "firebase": "^11.4.0",
    "formik": "^2.4.6",
    "framer-motion": "^12.4.10",
    "gsap": "^3.12.7",
    "heroicons": "^1.0.6",
    "hoist-non-react-statics": "^3.3.2",
    "lodash.memoize": "^4.1.2",
    "lucide-react": "^0.475.0",
    "miragejs": "^0.1.48",
    "next": "^15.1.7",
    "process": "^0.11.10",
    "react": "^18.2.0",
    "react-bootstrap": "^2.10.9",
    "react-data-table-component": "^7.6.2",
    "react-datepicker": "^8.1.0",
    "react-dom": "^18.2.0",
    "react-feather": "^2.0.10",
    "react-hook-form": "^7.54.2",
    "react-hot-toast": "^2.5.2",
    "react-hotkeys-hook": "^4.6.1",
    "react-icons": "^5.5.0",
    "react-is": "^19.0.0",
    "react-paginate": "^8.3.0",
    "react-range": "^1.10.0",
    "react-redux": "^9.2.0",
    "react-responsive": "^10.0.1",
    "react-router": "^6.3.0",
    "react-router-dom": "^6.29.0",
    "react-scripts": "5.0.1",
    "react-select": "^5.10.0",
    "react-spinners": "^0.15.0",
    "react-spring": "^9.7.5",
    "react-table": "^7.8.0",
    "react-toastify": "^11.0.5",
    "react-window": "^1.8.11",
    "router": "^1.3.7",
    "stream-browserify": "^3.0.0",
    "stripe": "^17.7.0",
    "styled-components": "^6.1.15",
    "use-sound": "^5.0.0",
    "web-vitals": "^2.1.4",
    "yup": "^1.6.1"
  },
```

## 🌍 dependencies.md

👉️ تثبيت Dependencies

1️⃣ تثبيت React و Next.js والمكتبات الأساسية

```sh
  npm install react@18.2.0 react-dom@18.2.0 next@15.1.7 react-scripts@5.0.1
```

2️⃣ تثبيت MUI وأيقوناته وبيانات الجداول والتواريخ

```sh
  npm install @mui/material@6.4.6 @mui/icons-material@6.4.6 @mui/x-data-grid@7.27.2 @mui/x-date-pickers@7.27.1
```

3️⃣ تثبيت React Router وإدارة الحالة (Redux & TanStack)

```sh
  npm install react-router@6.3.0 react-router-dom@6.29.0 react-redux@9.2.0 @reduxjs/toolkit@2.5.1 @tanstack/react-query@5.66.0 @tanstack/react-table@8.21.2
```

4️⃣ تثبيت التصميم والتنسيقات (Bootstrap, Emotion, Styled Components, ShadCN)

```sh
  npm install bootstrap@5.3.3 @emotion/react@11.14.0 @emotion/styled@11.14.0 styled-components@6.1.15 @shadcn/ui@0.0.4 classnames@2.5.1
```

5️⃣ تثبيت المكتبات التفاعلية (GSAP, Framer Motion, DnD-Kit)

```sh
  npm install gsap@3.12.7 @gsap/react@2.1.2 framer-motion@12.4.10 @dnd-kit/core@6.3.1 @dnd-kit/sortable@10.0.0
```

6️⃣ تثبيت التحقق من النماذج والتواريخ (Formik, Yup, React Hook Form)

```sh
  npm install formik@2.4.6 yup@1.6.1 react-hook-form@7.54.2 @hookform/resolvers@4.1.0 date-fns@2.30.0
```

7️⃣ تثبيت التعامل مع الـ API والطلبات (Axios, MirageJS, CORS, Express)

```sh
  npm install axios@0.27.2 miragejs@0.1.48 cors@2.8.5 express@4.21.2
```

8️⃣ تثبيت Stripe للدفع الإلكتروني

```sh
  npm install @stripe/react-stripe-js@3.4.0 @stripe/stripe-js@5.10.0 stripe@17.7.0
```

9️⃣ تثبيت أيقونات وواجهات المستخدم (Heroicons, Feather, Lucide, Headless UI)

```sh
  npm install @heroicons/react@1.0.6 heroicons@1.0.6 react-feather@2.0.10 lucide-react@0.475.0 @headlessui/react@1.6.6
```

🔟 تثبيت مكتبات إضافية للتحسينات والتفاعل

```sh
  npm install react-toastify@11.0.5 react-hot-toast@2.5.2 react-spinners@0.15.0 react-responsive@10.0.1 react-paginate@8.3.0
```

1️⃣1️⃣ تثبيت أدوات التطوير والاختبار (Testing Library, Web Vitals)

```sh
  npm install @testing-library/react@13.3.0 @testing-library/jest-dom@5.16.5 @testing-library/user-event@13.5.0 web-vitals@2.1.4
```

بهذا الشكل، سيكون التثبيت منظمًا على مراحل. يمكنك تنفيذ الأوامر بالتوالي حسب الأولوية والاحتياج في مشروعك. 🚀

🚀 تثبيت جميع المكتبات دفعة واحدة
لحفظ الوقت، يمكنك تثبيت جميع المكتبات عبر الأمر التالي في terminal:

```sh
npm install react react-dom next react-router-dom react-redux @reduxjs/toolkit @tanstack/react-query @tanstack/react-table @mui/material @mui/icons-material @mui/x-data-grid @mui/x-date-pickers bootstrap react-bootstrap @shadcn/ui classnames styled-components @dnd-kit/core @dnd-kit/sortable gsap @gsap/react framer-motion react-spring react-hook-form formik yup @hookform/resolvers @heroicons/react heroicons react-icons lucide-react react-feather date-fns react-datepicker axios firebase miragejs cors express react-hot-toast react-toastify lodash.memoize deepmerge hoist-non-react-statics classnames react-window react-paginate react-range react-responsive @stripe/react-stripe-js @stripe/stripe-js stripe
```

## 💡 ملاحظة:

- يمكنك تثبيت كل مجموعة على حدة باستخدام الأوامر المخصصة لها.
- أو يمكنك تثبيت جميع المكتبات دفعة واحدة باستخدام الأمر الأخير.

<hr />

| Package Name                | Version  | npm Link                                                                                                                      | Package Name               | Version  | npm Link                                                                                                                    |
| --------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| @dnd-kit/core               | ^6.3.1   | [![npm](https://img.shields.io/npm/v/@dnd-kit/core)](https://www.npmjs.com/package/@dnd-kit/core)                             | @dnd-kit/sortable          | ^10.0.0  | [![npm](https://img.shields.io/npm/v/@dnd-kit/sortable)](https://www.npmjs.com/package/@dnd-kit/sortable)                   |
| @emotion/react              | ^11.14.0 | [![npm](https://img.shields.io/npm/v/@emotion/react)](https://www.npmjs.com/package/@emotion/react)                           | @emotion/styled            | ^11.14.0 | [![npm](https://img.shields.io/npm/v/@emotion/styled)](https://www.npmjs.com/package/@emotion/styled)                       |
| @gsap/react                 | ^2.1.2   | [![npm](https://img.shields.io/npm/v/@gsap/react)](https://www.npmjs.com/package/@gsap/react)                                 | @headlessui/react          | ^1.6.6   | [![npm](https://img.shields.io/npm/v/@headlessui/react)](https://www.npmjs.com/package/@headlessui/react)                   |
| @heroicons/react            | ^1.0.6   | [![npm](https://img.shields.io/npm/v/@heroicons/react)](https://www.npmjs.com/package/@heroicons/react)                       | @hookform/resolvers        | ^4.1.0   | [![npm](https://img.shields.io/npm/v/@hookform/resolvers)](https://www.npmjs.com/package/@hookform/resolvers)               |
| @mui/icons-material         | ^6.4.6   | [![npm](https://img.shields.io/npm/v/@mui/icons-material)](https://www.npmjs.com/package/@mui/icons-material)                 | @mui/material              | ^6.4.6   | [![npm](https://img.shields.io/npm/v/@mui/material)](https://www.npmjs.com/package/@mui/material)                           |
| @mui/x-data-grid            | ^7.27.2  | [![npm](https://img.shields.io/npm/v/@mui/x-data-grid)](https://www.npmjs.com/package/@mui/x-data-grid)                       | @mui/x-date-pickers        | ^7.27.1  | [![npm](https://img.shields.io/npm/v/@mui/x-date-pickers)](https://www.npmjs.com/package/@mui/x-date-pickers)               |
| @reduxjs/toolkit            | ^2.5.1   | [![npm](https://img.shields.io/npm/v/@reduxjs/toolkit)](https://www.npmjs.com/package/@reduxjs/toolkit)                       | @shadcn/ui                 | ^0.0.4   | -                                                                                                                           |
| @stripe/react-stripe-js     | ^3.4.0   | [![npm](https://img.shields.io/npm/v/@stripe/react-stripe-js)](https://www.npmjs.com/package/@stripe/react-stripe-js)         | @stripe/stripe-js          | ^5.10.0  | [![npm](https://img.shields.io/npm/v/@stripe/stripe-js)](https://www.npmjs.com/package/@stripe/stripe-js)                   |
| @tanstack/react-query       | ^5.66.0  | [![npm](https://img.shields.io/npm/v/@tanstack/react-query)](https://www.npmjs.com/package/@tanstack/react-query)             | @tanstack/react-table      | ^8.21.2  | [![npm](https://img.shields.io/npm/v/@tanstack/react-table)](https://www.npmjs.com/package/@tanstack/react-table)           |
| @testing-library/jest-dom   | ^5.16.5  | [![npm](https://img.shields.io/npm/v/@testing-library/jest-dom)](https://www.npmjs.com/package/@testing-library/jest-dom)     | @testing-library/react     | ^13.3.0  | [![npm](https://img.shields.io/npm/v/@testing-library/react)](https://www.npmjs.com/package/@testing-library/react)         |
| @testing-library/user-event | ^13.5.0  | [![npm](https://img.shields.io/npm/v/@testing-library/user-event)](https://www.npmjs.com/package/@testing-library/user-event) | @types/gsap                | ^1.20.2  | [![npm](https://img.shields.io/npm/v/@types/gsap)](https://www.npmjs.com/package/@types/gsap)                               |
| axios                       | ^0.27.2  | [![npm](https://img.shields.io/npm/v/axios)](https://www.npmjs.com/package/axios)                                             | bootstrap                  | ^5.3.3   | [![npm](https://img.shields.io/npm/v/bootstrap)](https://www.npmjs.com/package/bootstrap)                                   |
| browserify-zlib             | ^0.2.0   | [![npm](https://img.shields.io/npm/v/browserify-zlib)](https://www.npmjs.com/package/browserify-zlib)                         | buffer                     | ^6.0.3   | [![npm](https://img.shields.io/npm/v/buffer)](https://www.npmjs.com/package/buffer)                                         |
| classnames                  | ^2.5.1   | [![npm](https://img.shields.io/npm/v/classnames)](https://www.npmjs.com/package/classnames)                                   | cors                       | ^2.8.5   | [![npm](https://img.shields.io/npm/v/cors)](https://www.npmjs.com/package/cors)                                             |
| date-fns                    | ^2.30.0  | [![npm](https://img.shields.io/npm/v/date-fns)](https://www.npmjs.com/package/date-fns)                                       | deepmerge                  | ^4.3.1   | [![npm](https://img.shields.io/npm/v/deepmerge)](https://www.npmjs.com/package/deepmerge)                                   |
| dom                         | ^0.0.3   | [![npm](https://img.shields.io/npm/v/dom)](https://www.npmjs.com/package/dom)                                                 | express                    | ^4.21.2  | [![npm](https://img.shields.io/npm/v/express)](https://www.npmjs.com/package/express)                                       |
| firebase                    | ^11.4.0  | [![npm](https://img.shields.io/npm/v/firebase)](https://www.npmjs.com/package/firebase)                                       | formik                     | ^2.4.6   | [![npm](https://img.shields.io/npm/v/formik)](https://www.npmjs.com/package/formik)                                         |
| framer-motion               | ^12.4.10 | [![npm](https://img.shields.io/npm/v/framer-motion)](https://www.npmjs.com/package/framer-motion)                             | gsap                       | ^3.12.7  | [![npm](https://img.shields.io/npm/v/gsap)](https://www.npmjs.com/package/gsap)                                             |
| heroicons                   | ^1.0.6   | [![npm](https://img.shields.io/npm/v/heroicons)](https://www.npmjs.com/package/heroicons)                                     | hoist-non-react-statics    | ^3.3.2   | [![npm](https://img.shields.io/npm/v/hoist-non-react-statics)](https://www.npmjs.com/package/hoist-non-react-statics)       |
| lodash.memoize              | ^4.1.2   | [![npm](https://img.shields.io/npm/v/lodash.memoize)](https://www.npmjs.com/package/lodash.memoize)                           | lucide-react               | ^0.475.0 | [![npm](https://img.shields.io/npm/v/lucide-react)](https://www.npmjs.com/package/lucide-react)                             |
| miragejs                    | ^0.1.48  | [![npm](https://img.shields.io/npm/v/miragejs)](https://www.npmjs.com/package/miragejs)                                       | next                       | ^15.1.7  | [![npm](https://img.shields.io/npm/v/next)](https://www.npmjs.com/package/next)                                             |
| process                     | ^0.11.10 | [![npm](https://img.shields.io/npm/v/process)](https://www.npmjs.com/package/process)                                         | react                      | ^18.2.0  | [![npm](https://img.shields.io/npm/v/react)](https://www.npmjs.com/package/react)                                           |
| react-bootstrap             | ^2.10.9  | [![npm](https://img.shields.io/npm/v/react-bootstrap)](https://www.npmjs.com/package/react-bootstrap)                         | react-data-table-component | ^7.6.2   | [![npm](https://img.shields.io/npm/v/react-data-table-component)](https://www.npmjs.com/package/react-data-table-component) |
| react-datepicker            | ^8.1.0   | [![npm](https://img.shields.io/npm/v/react-datepicker)](https://www.npmjs.com/package/react-datepicker)                       | react-dom                  | ^18.2.0  | [![npm](https://img.shields.io/npm/v/react-dom)](https://www.npmjs.com/package/react-dom)                                   |
| react-feather               | ^2.0.10  | [![npm](https://img.shields.io/npm/v/react-feather)](https://www.npmjs.com/package/react-feather)                             | react-hook-form            | ^7.54.2  | [![npm](https://img.shields.io/npm/v/react-hook-form)](https://www.npmjs.com/package/react-hook-form)                       |
| react-hot-toast             | ^2.5.2   | [![npm](https://img.shields.io/npm/v/react-hot-toast)](https://www.npmjs.com/package/react-hot-toast)                         | react-hotkeys-hook         | ^4.6.1   | [![npm](https://img.shields.io/npm/v/react-hotkeys-hook)](https://www.npmjs.com/package/react-hotkeys-hook)                 |
| react-icons                 | ^5.5.0   | [![npm](https://img.shields.io/npm/v/react-icons)](https://www.npmjs.com/package/react-icons)                                 | react-is                   | ^19.0.0  | [![npm](https://img.shields.io/npm/v/react-is)](https://www.npmjs.com/package/react-is)                                     |
| react-paginate              | ^8.3.0   | [![npm](https://img.shields.io/npm/v/react-paginate)](https://www.npmjs.com/package/react-paginate)                           | react-range                | ^1.10.0  | [![npm](https://img.shields.io/npm/v/react-range)](https://www.npmjs.com/package/react-range)                               |
| react-redux                 | ^9.2.0   | [![npm](https://img.shields.io/npm/v/react-redux)](https://www.npmjs.com/package/react-redux)                                 | react-responsive           | ^10.0.1  | [![npm](https://img.shields.io/npm/v/react-responsive)](https://www.npmjs.com/package/react-responsive)                     |
| react-router                | ^6.3.0   | [![npm](https://img.shields.io/npm/v/react-router)](https://www.npmjs.com/package/react-router)                               | react-router-dom           | ^6.29.0  | [![npm](https://img.shields.io/npm/v/react-router-dom)](https://www.npmjs.com/package/react-router-dom)                     |
| react-scripts               | 5.0.1    | [![npm](https://img.shields.io/npm/v/react-scripts)](https://www.npmjs.com/package/react-scripts)                             | react-select               | ^5.10.0  | [![npm](https://img.shields.io/npm/v/react-select)](https://www.npmjs.com/package/react-select)                             |
| react-spinners              | ^0.15.0  | [![npm](https://img.shields.io/npm/v/react-spinners)](https://www.npmjs.com/package/react-spinners)                           | react-spring               | ^9.7.5   | [![npm](https://img.shields.io/npm/v/react-spring)](https://www.npmjs.com/package/react-spring)                             |
| react-table                 | ^7.8.0   | [![npm](https://img.shields.io/npm/v/react-table)](https://www.npmjs.com/package/react-table)                                 | react-toastify             | ^11.0.5  | [![npm](https://img.shields.io/npm/v/react-toastify)](https://www.npmjs.com/package/react-toastify)                         |
| react-window                | ^1.8.11  | [![npm](https://img.shields.io/npm/v/react-window)](https://www.npmjs.com/package/react-window)                               | router                     | ^1.3.7   | [![npm](https://img.shields.io/npm/v/router)](https://www.npmjs.com/package/router)                                         |
| stream-browserify           | ^3.0.0   | [![npm](https://img.shields.io/npm/v/stream-browserify)](https://www.npmjs.com/package/stream-browserify)                     | stripe                     | ^17.7.0  | [![npm](https://img.shields.io/npm/v/stripe)](https://www.npmjs.com/package/stripe)                                         |
| styled-components           | ^6.1.15  | [![npm](https://img.shields.io/npm/v/styled-components)](https://www.npmjs.com/package/styled-components)                     | use-sound                  | ^5.0.0   | [![npm](https://img.shields.io/npm/v/use-sound)](https://www.npmjs.com/package/use-sound)                                   |
| web-vitals                  | ^2.1.4   | [![npm](https://img.shields.io/npm/v/web-vitals)](https://www.npmjs.com/package/web-vitals)                                   | yup                        | ^1.6.1   | [![npm](https://img.shields.io/npm/v/yup)](https://www.npmjs.com/package/yup)                                               |

## 👥 Team Members

📌 Project Lead & Full-Stack Developer

- **[Salma W. Ashour](https://github.com/Salma-W-Ashour)**
  📌 Frontend Developer & UI/UX Designer
  🎨 Styling & Animations | 🔒 Authentication

- **[Osama H.](https://github.com/Osama-H/Nest-HotelAPI)**
  📌 Backend Developer
  🔗 Built interactive API references with Swagger
  🛠️ API Integration | 💳 Payment Gateway

- **[Rebhe A. Ibrahim](https://github.com/rebhi-2002)**
  📌 Full-Stack JavaScript Developer
  🔨 Core Architecture | 🧩 State Management

  - **[Duha Ahmad](https://github.com/Duha-ahmad)**
    📌 Technical Writer & Documentation Lead
    ✍️ Wrote 90% of the project documentation

## Contribution

If you'd like to contribute to the development of the ReactJS project, please open a Pull Request or report issues on the [project's GitHub page](https://github.com/Salma-W-Ashour/hotel-).

## License

This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/license/mit) file for details.

## References

Below, you'll find some recommended resources for learning React:

### Video Tutorials and Courses:

- ✅ [ReactJs-Build Full E-Commerce-Scratch Redux 2023 (بالعربي)](https://www.youtube.com/playlist?list=PLDQ11FgmbqQPRui5VDCSQvYt2HOYiCVep)
  - ✅ [Complete Course in Udemy](https://www.udemy.com/course/reactjs-build-full-e-commerce-from-scratch-redux)
- ✅ [Learn React JS Tutorial](https://www.youtube.com/playlist?list=PLtFbQRDJ11kEjXWZmwkOV-vfXmrEEsuEW)
- ✅ [10-Hour Course: Build and Deploy 4 Modern React Apps for Frontend Developers](https://www.youtube.com/watch?v=F627pKNUCVQ&t=11767s)
- ✅ [Code 15 React Projects](https://www.youtube.com/watch?v=a_7Z7C_JCyo&t=3s)
- ✅ [React: The Complete Guide with Redux (Udemy Course)](https://www.udemy.com/course/react-the-complete-guide-incl-redux)
- ✅ [React JS Crash Course](https://www.youtube.com/watch?v=w7ejDZ8SWv8)
- ✅ [React Router v6 Major Changes](https://www.youtube.com/watch?v=k2Zk5cbiZhg)
- ✅ [React Context \& Hooks Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9hNokByJilPg5g9m2APUePI)
- ✅ [React js: (بالعربي) تعلم برمجة متجر إلكتروني مع لوحة التحكم](https://www.udemy.com/course/react-js-e-commerce)

### Official Documentation and Resources:

- ✅ [React: The library for web and native user interfaces](https://react.dev)
- ✅ [React Developer Tools](https://react.dev/learn/react-developer-tools)
- ✅ [React 18 Upgrade Guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-client-rendering-apis)
- ✅ [Legacy React Documentation](https://legacy.reactjs.org)
- ✅ [React Bootstrap](https://react-bootstrap.netlify.app)
- ✅ [Visual Studio Code React Tutorial](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial)
- ✅ [Create React App Documentation](https://create-react-app.dev/docs/getting-started)
- ✅ [React Router Documentation](https://reactrouter.com/en/main)
- ✅ [CodeSandbox React Examples](https://codesandbox.io/examples/package/react-emmet-assertion)

### Books:

- ✅ [Pro React Book](https://www.amazon.com/Pro-React-Cassio-Sousa-Antonio/dp/1484212614)
- ✅ [React: Up and Running Book](https://www.amazon.com/React-Up-Running-Stoyan-Stefanov/dp/1491931825)

### UI Component Libraries:

- ✅ [Material-UI: An elegant framework for crafting exquisite user interfaces in React](https://mui.com)
- ✅ [NextUI: A sophisticated library of meticulously designed UI components, tailored for accelerated React application development](https://nextui.org)
- ✅ [Horizon UI Components: A collection of modern, high-quality UI components, elevating the aesthetics of React applications](https://horizon-ui.com/components)
- ✅ [Ant Design: The quintessential design library for creating polished, visually stunning user interfaces in React and React Native](https://ant.design)
  - ✅ [Ant Design GitHub Repository](https://github.com/ant-design/ant-design)

### Additional Resources:

- ✅ [How to write Javascript and React with VS Code FASTER! (using code snippets)](https://www.youtube.com/watch?v=uuXxomVFbC8)
- ✅ [Hands-On React: The best way to learn React](https://handsonreact.com)

<hr />
<div align="center">Built with ❤️ by <a href="https://github.com/rebhi-2002">Rebhe Ibrahim</a></div>
