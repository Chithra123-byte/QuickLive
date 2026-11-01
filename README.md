# ⚡ QuickLive – Application Deployment & Management Platform

QuickLive is a web-based application deployment and management platform designed to simplify the deployment workflow for developers. It provides a centralized dashboard where users can connect their GitHub accounts, access repositories, manage projects, and monitor deployment activities.

The platform aims to make application deployment easier through a simple, modern, and user-friendly interface.

## 🌐 Live Demo

Check out the deployed QuickLive application:

**[🚀 Visit QuickLive](https://quick-live-beige.vercel.app)**

- **Deployment Platform:** Vercel
- **GitHub Repository:** [Chithra123-byte/QuickLive](https://github.com/Chithra123-byte/QuickLive)

---

## 🚀 Features

- **User Authentication:** Secure registration and login using Supabase.
- **GitHub Integration:** Connect GitHub accounts using GitHub OAuth.
- **Repository Management:** Access and view connected GitHub repositories.
- **Project Dashboard:** Manage projects and view project information.
- **Deployment Management:** Initiate and monitor deployment records.
- **Deployment Status:** View deployment statuses such as Building and Live.
- **Deployment History:** View previous deployment records.
- **Live Logs Interface:** Provides a terminal-style interface for deployment activity.
- **User Settings:** Manage profile information, password, and account settings.
- **Responsive UI:** Modern interface designed for different screen sizes.
- **Animations:** Smooth animations and interactive effects using Framer Motion.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js 16 | Frontend framework and API routes |
| React.js | Component-based user interface |
| TypeScript | Type-safe development |
| Tailwind CSS | Styling and responsive design |
| Supabase | Authentication and database |
| PostgreSQL | Relational database |
| GitHub OAuth | GitHub account authentication |
| GitHub API | Repository information |
| Framer Motion | UI animations |
| Lucide React | Icons |
| Vercel | Hosting the QuickLive application |

---

## 🏗️ Project Architecture

```text
                    USER
                      |
                      v
              QUICKLIVE WEBSITE
                      |
                      v
               NEXT.JS FRONTEND
                      |
                      v
                BACKEND / API
                      |
             +--------+--------+
             |                 |
             v                 v
         SUPABASE            GITHUB
             |                 |
             v                 v
       PostgreSQL DB     Repository Data
             |
             v
     Project & Deployment
        Information
             |
             v
     Deployment Management
```

---

## 📂 Project Structure

```text
QuickLive/
│
├── app/
│   ├── page.tsx
│   ├── globals.css
│   │
│   ├── login/
│   ├── register/
│   │
│   ├── api/
│   │   └── deploy/
│   │       └── route.ts
│   │
│   └── dashboard/
│       ├── page.tsx
│       ├── projects/
│       ├── deployments/
│       └── setting/
│
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── FeatureCard.tsx
│   ├── HowItWorks.tsx
│   ├── Pricing.tsx
│   ├── AnimatedGrid.tsx
│   ├── FloatingParticles.tsx
│   ├── LiveTerminal.tsx
│   ├── Stats.tsx
│   ├── Testimonials.tsx
│   ├── CTA.tsx
│   ├── Footer.tsx
│   ├── DeployModal.tsx
│   ├── NewProjectModal.tsx
│   └── RepositoryModal.tsx
│
├── lib/
│   └── supabase.ts
│
├── public/
│
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## ⚙️ Installation and Setup

Follow these steps to run QuickLive locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Chithra123-byte/QuickLive.git
```

### 2. Navigate to the Project Folder

```bash
cd QuickLive
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory.

Add your Supabase credentials using the variable names expected by your `lib/supabase.ts` file.

For example:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Add any additional server-side environment variables required by your integrations.

**Important:** Never upload `.env.local`, private API keys, service-role keys, or OAuth secrets to GitHub.

### 5. Run the Development Server

```bash
npm run dev
```

### 6. Open in Browser

Visit:

```text
http://localhost:3000
```

---

## 🔄 How QuickLive Works

1. **Register/Login:** Users create an account or sign in using email and password or GitHub authentication.
2. **Dashboard:** After authentication, users access their personalized dashboard.
3. **Connect GitHub:** Users connect their GitHub account to access repositories.
4. **Import Repository:** Users select a repository through the repository interface.
5. **Initiate Deployment:** Users start a deployment through the QuickLive dashboard.
6. **Monitor Status:** Deployment records and their statuses are displayed in the dashboard.
7. **View History:** Users can review their deployment information and history.

---

## 🗄️ Database

QuickLive uses Supabase with PostgreSQL for storing and managing application data.

The application uses:

- **Authentication:** Supabase Auth for user registration and login.
- **Projects:** Project-related information.
- **Deployments:** Deployment records, status, and related information.

Row Level Security (RLS) policies should be configured to protect user-specific records.

---

## 🎨 User Interface

QuickLive uses a modern dark-themed interface with:

- Black background and golden-yellow highlights.
- Animated background effects.
- Floating golden particles.
- Interactive navigation.
- Responsive dashboard layouts.
- Smooth transitions and hover effects.

---

## 🔮 Future Enhancements

- Integration with a real deployment engine.
- Actual automated repository builds.
- Real-time build log streaming.
- Custom domain configuration.
- Payment gateway integration for subscription plans.
- Team collaboration and workspace management.
- Deployment notifications.
- Advanced project analytics.
- Deployment rollback functionality.

---

## ⚠️ Current Implementation Note

QuickLive is currently a development prototype with GitHub integration, dashboard functionality, and a simulated deployment workflow.

The current deployment API simulates deployment status changes. Actual repository cloning, dependency installation, application building, and hosting through a deployment provider are planned enhancements.

The pricing section is currently a frontend interface and does not yet process subscriptions or payments.

---

## 👩‍💻 Developer

**Developed by:** Chithra

**GitHub:** [Chithra123-byte](https://github.com/Chithra123-byte)

**Project Repository:** [QuickLive](https://github.com/Chithra123-byte/QuickLive)

---

⭐ If you find this project interesting, consider giving the repository a star!