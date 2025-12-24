Here’s a **clean, enhanced, AI-IDE–ready prompt** you can directly paste into Cursor / Copilot / any AI coding IDE. It’s structured, unambiguous, and implementation-focused, without over-explaining.

---

## 🔹 AI IDE PROMPT — Jaago Outdoor Event Web Page

Build a **modern, clean, and responsive outdoor event webpage** for a church program named **“Jaago Outdoor”**.

### Tech Stack

* **Frontend:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Backend & DB:** Supabase
* **Forms:** Controlled components with validation
* **Admin Access:** Supabase-auth protected admin panel

---

## 🌿 Page Purpose

This page promotes **three major sub-events** under *Jaago Outdoor*.
Each sub-event has:

* A poster image
* Title
* Description
* Highlights
* CTA button
* A **custom registration form**
* Backend submission to **separate Supabase tables**

---

## 🧩 Page Structure

### 1️⃣ Hero Section

* Event Name: **Jaago Outdoor**
* Short tagline emphasizing fellowship, faith, and community
* Outdoor / warm aesthetic
* Clean typography, soft shadows, subtle animations

---

## 2️⃣ Events Section (3 Sections)

Each event should be displayed as a **card or full-width section** with:

* Left: Poster image
* Right: Content + CTA
* Responsive stacking on mobile

---

### 🟤 Event 1: Coffee with Bishop

**Poster:** `/public/bishop.png`

**Description:**
An intimate gathering where faith meets fellowship. Share your thoughts, ask questions, and connect with our spiritual leader over a warm cup of coffee.

**Highlights (bullet points):**

* Chat with a Bishop for over 30 minutes
* Clarify doubts and deepen your love for God and the Church
* Connect with fellow believers and strengthen your faith community
* Come with an open heart and leave inspired

**CTA Button:**
👉 *Book Your Spot / Register Now*

---

### 🟤 Event 2: Meet the Strangers

**Poster:** `/public/bishop.png`

**Description:**
Meet the strangers—connect, converse, and discover new perspectives through an interactive and welcoming session.

**CTA Button:**
👉 *Register Now*

---

### 🟤 Event 3: Blessed Banquet

**Poster:** `/public/bishop.png`

**Description:**
An exclusive dinner gathering fostering faith and fellowship, offering an opportunity to engage in meaningful dialogue with our spiritual leader.

**CTA Button:**
👉 *Register Now*

---

## 📝 Registration Form (Same UI, Same Fields for All Events)

Each event opens a **separate page** with the same form UI, but submits to a **different Supabase table**.

### Form Fields

* **Full Name***
  Placeholder: *Enter your full name*
* **Phone Number***
  Placeholder: *+91 12345 67890*
* **Email Address***
  Placeholder: *[your.email@example.com](mailto:your.email@example.com)*
* **State***
  Placeholder: *Enter your state*
* **Questions or Topics You’d Like to Discuss***
  Textarea
  Placeholder: *Share any questions, doubts, or topics you'd like to discuss with the Bishop*

**Submit Button:**
✅ *Complete Registration*

### Form Requirements

* Client-side validation
* Required field checks
* Loading & success states
* Error handling
* Disable button on submit
* Toast or inline confirmation on success

---

## 🗄️ Backend Logic (Supabase)

* Create **three separate tables**:

  * `coffee_with_bishop_registrations`
  * `meet_the_strangers_registrations`
  * `blessed_banquet_registrations`

Each table stores:

* id (uuid)
* full_name
* phone
* email
* state
* questions
* created_at

---

## 🛠 Admin Panel

* Protected via Supabase Auth
* Admin can:

  * View registrations per event
  * Filter / search
  * Export data (optional)
* Simple, clean dashboard UI

---

## 🎨 UI / UX Guidelines

* Minimal, premium church-event aesthetic
* Warm colors, outdoor vibe
* Smooth hover effects
* Subtle transitions
* Fully responsive
* Accessible form inputs

---

## 🚀 Deliverables

* Event landing page
* Registration flow
* Supabase integration
* Admin panel
* Clean, scalable code structure

---

