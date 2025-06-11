# 🏆 Leetcode Progress Tracker

A simple full-stack app to track, add, edit, and delete LeetCode problems you’ve solved.  
Built with React, Zustand, TailwindCSS, and a Node/SQL backend.

## 🧰 Tech Stack

- **Front-End**  
  - React (via Create React App / Vite / Next.js)  
  - Zustand for state management  
  - TailwindCSS for styling  
  - React Router for navigation  
  - Axios for HTTP requests  
  - react-hot-toast for notifications  
  - lucide-react for icons  

- **Back-End**  
  - Node.js + Express
  - `postgresql` via [`sql` tagged-template]  
  - RESTful CRUD endpoints under `/api/problems`

## 🚀 Features

- **List** all tracked problems with title & difficulty  
- **Add** new problems (title, difficulty, description)  
- **Edit** existing problems in a modal or dedicated page  
- **Delete** problems with confirmation  
- Toast notifications for success / error  
- Responsive, dark-mode-friendly UI

## 📦 Getting Started

### Clone & install

```bash
git clone https://github.com/tmdrl02/leetcode_progress.git
cd leetcode_progress

# Install both front-end and back-end deps (if in a monorepo)
npm install
```

![스크린샷 2025-06-11 164143](https://github.com/user-attachments/assets/9c96029a-07fc-493b-9bba-980c1b3799cf)
![스크린샷 2025-06-11 164133](https://github.com/user-attachments/assets/7e751e67-c9bf-43df-b0ab-eee7d6021ea2)
