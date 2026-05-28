# CareConnect — Healthcare Appointment App

A mobile-first healthcare app prototype built with React, TypeScript, and Tailwind CSS. Simulates a real clinic booking experience inside a phone-frame viewport (390×844px).

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 6** — build tool
- **Tailwind CSS v4** — styling
- **shadcn/ui** + **Radix UI** — components
- **React Router v7** — navigation
- **Motion (Framer Motion)** — animations
- **Lucide React** — icons

## Features

-  **Home** — health stats, quick actions, top doctors
-  **Appointments** — book, cancel, reschedule with full flow
-  **Doctor List** — search, filter by specialty, availability
-  **Doctor Profile** — ratings, schedule, booking
-  **Appointment Scheduling** — 2-step flow with payment
-  **Medical History** — timeline, medications, diagnoses
-  **Records** — lab results, prescriptions, documents
- **Notifications** — alerts and updates
- **Messages** — doctor chat
- **Profile** — settings, security, saved doctors

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser at `http://localhost:5173`

## Project Structure

```
src/
├── app/
│   ├── pages/        # All page components
│   └── App.tsx       # Routes
├── imports/          # Shared imports
├── styles/           # Global styles
├── uploads/          # Local assets (profile photo)
└── main.tsx
```

## Notes

- All data is currently hardcoded (prototype only)
- Designed for mobile viewport — best viewed at 390px width
- Profile photo uses `src/uploads/my-profile.jpg`