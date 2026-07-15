# Professional Developer Portfolio & Admin Panel

A premium, interactive developer portfolio featuring a custom 2D canvas particle galaxy background, smooth scroll transitions, and a comprehensive, fully functional glassmorphic **Admin Panel** to manage all site content. Built using **Next.js 15**, **TypeScript**, and **Prisma** backed by a **Neon PostgreSQL** database.

---

## 🚀 Key Features

### 🌐 Public Portfolio
- **Cinematic Loader**: Randomly-timed percentage progress uploader with orbital system animations.
- **Canvas Galaxy Scene**: Smoothly rotating particle galaxy with floating planet elements and responsive mouse-parallax effect (no heavy 3D library requirements).
- **Responsive Custom Cursor**: Lightweight custom cursor element that scales and interacts with key components.
- **Projects Grid**: Showcases featured work with categorical badges and redirects for live demos or code repository links.
- **Timeline Milestones**: Displays career history and academic achievements loaded dynamically.
- **Skills Showcase**: Clean progress bar badges grouped by expertise (Frontend, Backend, Tools, etc.).
- **Interactive Contact Form**: Client-side validated form that sends message payloads directly to the DB and prompts notifications.

### 🛡️ Admin Dashboard (`/admin`)
- **Real-time Overview**: Live metrics for Total Projects, Received Messages, Experience Timeline Entries, and Registered Skills.
- **Inbound Message Inbox**: Read contact messages, change processing states (Unread, Read, Replied, Archived), or delete inquiries.
- **Interactive CRUD Content Managers**:
  - **Projects CRUD**: Form-based creation, custom slug generation, tag stack lists, and featured selectors.
  - **Experience CRUD**: Work history fields (roles, locations, timeline range, current employment check).
  - **Skills Manager**: Sliders to set proficiency percentages (0-100%) and select stack categories.
  - **Education CRUD**: Field degree, institution parameters, GPAs, and description logs.
  - **Certificates CRUD**: Verify URL attachments, issuers, and credential IDs.
- **PDF Resume Uploader**: Simple drag-and-drop or click-to-browse PDF uploader that stores files securely inside `/public/resume.pdf` and immediately links download files globally.
- **Settings Manager**: Instantly configure global social link variables (GitHub, LinkedIn, Twitter) and system email alerts.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS variables
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [Neon Serverless PostgreSQL](https://neon.tech/)
- **Authentication**: [NextAuth.js v5 (Auth.js)](https://authjs.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & CSS keyframes
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner Toaster](https://sonner.dev/)

---

## 📦 Getting Started

### 1. Prerequisites
- **Node.js** (v20+ recommended)
- **PostgreSQL Database Instance** (e.g. Neon.tech)

### 2. Set Up Environment Variables
Create a `.env` file at the root of the project:

```env
# Database Connection
DATABASE_URL="postgresql://username:password@hostname/dbname?sslmode=require"

# NextAuth Settings
AUTH_SECRET="your-generate-32-chars-secret-key"
AUTH_URL="http://localhost:3000"

# Admin Login Details
ADMIN_EMAIL="admin@portfolio.com"
ADMIN_PASSWORD="yourpassword123"

# System Contact Email
CONTACT_EMAIL="yourname@example.com"
```

### 3. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 4. Run Database Migrations & Seeding
Set up your database tables and seed the initial admin account:
```bash
npx prisma db push
npx prisma db seed
```

### 5. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portfolio.
Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin) using your `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

### 6. Build for Production
```bash
npm run build
npm start
```
