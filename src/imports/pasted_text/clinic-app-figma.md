You are a senior mobile product designer and healthcare UX architect. I need complete, step-by-step Figma instructions to design a high-fidelity mobile app for a Clinic and Medical Appointment System.

---

ROLE
Act as a professional UI/UX designer who specializes in healthcare telemedicine apps like KonsultaMD, Practo, and HealthNow. Design thinking must be production-level, not academic or generic.

---

APP OVERVIEW
App Name: [You may suggest a name]
Platform: Mobile only (iPhone 14 Pro — 390x844px frame)
Purpose: Allow patients to book appointments, view medical records, track history, and receive health notifications.

---

FIGMA SETUP INSTRUCTIONS
1. Create a new Figma file titled: "CareConnect – Clinic App UI"
2. Set up a page structure:
   - Page 1: Design System (colors, typography, components)
   - Page 2: Auth Flow
   - Page 3: Main App Screens
   - Page 4: Components Library

---

DESIGN SYSTEM (Page 1)
Define the following:

COLOR PALETTE
- Primary: Medical Blue (#1A73E8 or similar calm blue)
- Secondary: Soft Teal (#00BFA5)
- Background: Off-white (#F8FAFC)
- Surface: White (#FFFFFF)
- Text Primary: (#1A1A2E)
- Text Secondary: (#6B7280)
- Success: (#10B981)
- Warning: (#F59E0B)
- Error: (#EF4444)
- Divider: (#E5E7EB)

TYPOGRAPHY
- Font: Inter (Google Fonts, free)
- H1: 24px / Bold / Primary text
- H2: 20px / SemiBold
- H3: 16px / SemiBold
- Body: 14px / Regular
- Caption: 12px / Regular / Secondary text
- Button label: 14px / Medium

SPACING SYSTEM
- Base unit: 8px
- Component padding: 16px
- Card padding: 20px
- Section gap: 24px

COMPONENT LIBRARY
Create reusable components for:
- Primary button (48px height, full-width, rounded 12px)
- Secondary/outline button
- Input field with label + placeholder + error state
- Doctor card (avatar, name, specialty, rating, distance)
- Appointment card (doctor, date, time, status badge)
- Notification card (icon, title, description, time)
- Bottom navigation bar (5 tabs: Home, Appointments, Records, Notifications, Profile)
- Status badge (Upcoming = blue, Completed = green, Cancelled = red)
- Avatar circle (initials-based, 40px and 56px variants)
- Search bar with filter icon
- Section header with "See All" link
- Calendar/Date picker widget

---

AUTH FLOW SCREENS (Page 2)

SCREEN 1 – SPLASH SCREEN
- Centered app logo + tagline
- Blue gradient or clean white background
- Auto-dismisses in 2 seconds
- Figma frame: 390x844

SCREEN 2 – ONBOARDING (3 slides, use horizontal scroll prototype)
- Slide 1: "Find Doctors Near You" — doctor illustration, short description
- Slide 2: "Book Appointments Instantly" — calendar/booking illustration
- Slide 3: "Your Health, Your Records" — records illustration
- Each slide has: illustration area, title, subtitle, progress dots, Next/Skip button

SCREEN 3 – LOGIN
- App logo at top
- Email input field
- Password input field with show/hide toggle
- "Forgot Password?" text link
- "Log In" primary button
- "Or continue with Google" divider + Google button
- "Don't have an account? Register" link at bottom

SCREEN 4 – REGISTER
- Full name, email, phone number, password, confirm password fields
- Date of birth picker
- "Create Account" button
- Terms and privacy checkbox
- "Already have an account? Log In" link

SCREEN 5 – FORGOT PASSWORD
- Email input
- "Send Reset Link" button
- Back to Login link

---

MAIN APP SCREENS (Page 3)

SCREEN 6 – HOME DASHBOARD
Layout (top to bottom):
- Status bar (auto)
- Header: "Good morning, [Name] 👋" + notification bell icon + avatar
- Search bar: "Search doctors, clinics..."
- Upcoming appointment card (large card): doctor avatar, name, specialty, date + time, "View Details" and "Cancel" buttons
- Quick Actions row (4 icons): Book Appointment, My Records, Lab Results, Messages
- "Find by Specialization" section: horizontal scrollable category chips (General, Cardiology, Dermatology, Pediatrics, OB-GYN, Neurology)
- "Recommended Doctors" section: vertical list of doctor cards (2-3 visible, "See All")
- Bottom navigation bar

SCREEN 7 – DOCTOR LIST
- Top: back button + "Find a Doctor" title + filter icon
- Search bar (persistent)
- Filter chips: All, Available Today, Highest Rated, Near Me
- Vertical list of doctor cards:
  Each card: avatar, name, specialty, hospital/clinic, rating (stars), consultation fee, availability badge, "Book" button
- Pagination or infinite scroll indicator

SCREEN 8 – DOCTOR PROFILE / DETAILS
- Top: back button + share icon
- Doctor hero section: large avatar, name, specialty, hospital
- Rating row: stars + review count + experience years
- Bio/About section (2-3 lines of text)
- Info chips: Consultation fee, Languages, Response time
- "Available Slots" section header
- Horizontal calendar strip (7 days visible, selected day highlighted in blue)
- Time slot grid (morning/afternoon/evening groups)
- Consultation type toggle: In-Clinic / Telemedicine
- Sticky bottom: "Book Appointment" CTA button

SCREEN 9 – APPOINTMENT SCHEDULING
- Top: "Schedule Appointment" + back
- Doctor mini-card at top (non-editable)
- Selected date + time (editable, tappable)
- Consultation type selector (In-Clinic / Telemedicine)
- Reason for visit input field
- Add symptoms text area
- Upload documents button
- Patient info summary (pre-filled, editable link)
- "Confirm Booking" primary button
- Estimated fee display

SCREEN 10 – APPOINTMENT CONFIRMATION
- Success checkmark animation area (large green circle + checkmark icon)
- "Appointment Booked!" title
- Booking reference number
- Summary card: doctor, date, time, type, location
- "Add to Calendar" button
- "View Appointments" button
- "Back to Home" text link

SCREEN 11 – APPOINTMENTS LIST
- Header: "My Appointments"
- Tab switcher: Upcoming | Past | Cancelled
- Upcoming tab content:
  Appointment cards with: doctor info, date/time, status badge, "Reschedule" and "Cancel" action buttons
- Past tab content:
  Appointment cards with: "View Summary" and "Book Again" buttons + rating option

SCREEN 12 – PATIENT RECORDS
- Header: "My Health Records"
- Patient summary card: name, age, blood type, allergies
- Section list:
  - Prescriptions (icon + count badge)
  - Lab Results (icon + count badge)
  - Uploaded Documents (icon + count badge)
  - Vaccination Records (icon + count badge)
- Each section expands into a list of document cards:
  File name, date, doctor, download/view icon

SCREEN 13 – MEDICAL HISTORY
- Header: "Medical History"
- Timeline view (vertical, chronological):
  Each entry: date bubble + card with diagnosis, doctor, medications, notes
- Filter bar: All | Consultations | Diagnoses | Medications
- Expandable cards with full details

SCREEN 14 – NOTIFICATIONS CENTER
- Header: "Notifications" + "Mark all read" text button
- Segmented control: All | Appointments | Reminders | Updates
- Notification list:
  Each item: icon (colored by type), title, description, timestamp, unread dot indicator
  Types: Appointment reminder (blue bell), Prescription reminder (green pill), Schedule update (amber calendar), New message (purple chat)

SCREEN 15 – USER PROFILE
- Profile header: large avatar, name, email, "Edit Profile" button
- Health info section: blood type, height, weight, allergies
- Settings list (grouped):
  Group 1 – Account: Edit Profile, Change Password, Linked Accounts
  Group 2 – Preferences: Notifications, Language, Dark Mode toggle
  Group 3 – Medical: Saved Doctors, My Clinics, Insurance Info
  Group 4 – Support: Help Center, Privacy Policy, Terms of Service
- "Log Out" button (red text, bottom of list)

---

NAVIGATION SYSTEM
Use a bottom navigation bar (fixed, 64px height) with:
- Home (house icon)
- Appointments (calendar icon)
- Records (folder icon)
- Notifications (bell icon + badge)
- Profile (user icon)

Active state: filled icon + blue color + label
Inactive state: outline icon + gray color + label

---

PROTOTYPE FLOW INSTRUCTIONS
Create click-through prototype connections:
Splash → Onboarding → Login → Home Dashboard
Home Dashboard → Doctor List → Doctor Profile → Appointment Scheduling → Confirmation
Home Dashboard → Appointments List
Home Dashboard → Patient Records
Home Dashboard → Medical History
Home Dashboard → Notifications
Home Dashboard → Profile

---

HCI PRINCIPLES TO APPLY (add annotations in Figma)
- Visibility of system status: show loading states, success states, empty states
- Consistency: same button styles, spacing, and colors across all screens
- Recognition over recall: use icons with labels, not icons alone
- Error prevention: show inline form validation
- Accessibility: minimum 44x44px tap targets, WCAG AA contrast ratio

---

FINAL FIGMA OUTPUT CHECKLIST
[ ] Design system page complete (colors, type, components)
[ ] All 15 screens created at 390x844px
[ ] Reusable components in component library
[ ] Prototype connections set up
[ ] Consistent spacing and alignment (8px grid)
[ ] Auto-layout used on components
[ ] Properly named layers and frames
[ ] Export-ready screen previews

---

OUTPUT FORMAT FROM GEMINI:
Please provide:
1. Step-by-step Figma instructions for each screen
2. Exact layout descriptions (what goes where, what spacing to use)
3. Color hex codes and font size for each text element
4. Component behavior and states to create
5. Figma-specific tips (auto-layout, component variants, prototyping)
6. Any suggestions to improve the UX above what was described