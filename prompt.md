Build a modern, responsive outdoor event webpage for "Jaago Outdoor" - a church program featuring three sub-events. Each sub-event has its own registration form that submits to a separate Supabase table.

---

## Tech Stack Requirements

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Backend/Database:** Supabase
- **Forms:** React controlled components with client-side validation
- **Authentication:** Supabase Auth for admin panel

---

## Page Structure & Implementation

### 1. Hero Section
Create a hero section with:
- Event name: "Jaago Outdoor"
- Tagline emphasizing fellowship, faith, and community
- Warm, outdoor aesthetic with clean typography, soft shadows, and subtle animations

### 2. Events Section (3 Event Cards)
Display three events as cards or full-width sections with:
- **Layout:** Image on left, content on right (stack vertically on mobile)
- **Each card contains:** Poster image, title, description, bullet-point highlights, CTA button

---

## Event Details

### Event 1: Coffee with Bishop
- **Poster path:** `/public/bishop.png`
- **Description:** "An intimate gathering where faith meets fellowship. Share your thoughts, ask questions, and connect with our spiritual leader over a warm cup of coffee."
- **Highlights:**
  - Chat with a Bishop for over 30 minutes
  - Clarify doubts and deepen your love for God and the Church
  - Connect with fellow believers and strengthen your faith community
  - Come with an open heart and leave inspired
- **CTA:** "Book Your Spot" or "Register Now"
- **Registration route:** `/register/coffee-with-bishop`
- **Supabase table:** `coffee_with_bishop_registrations`

### Event 2: Meet the Strangers
- **Poster path:** `/public/bishop.png`
- **Description:** "Meet the strangers—connect, converse, and discover new perspectives through an interactive and welcoming session."
- **CTA:** "Register Now"
- **Registration route:** `/register/meet-the-strangers`
- **Supabase table:** `meet_the_strangers_registrations`

### Event 3: Blessed Banquet
- **Poster path:** `/public/bishop.png`
- **Description:** "An exclusive dinner gathering fostering faith and fellowship, offering an opportunity to engage in meaningful dialogue with our spiritual leader."
- **CTA:** "Register Now"
- **Registration route:** `/register/blessed-banquet`
- **Supabase table:** `blessed_banquet_registrations`

---

## Registration Form Specification

Create a **reusable registration form component** that accepts the event name and target table as props. Each event links to a separate registration page using the same form UI.

### Form Fields (all required):
1. **Full Name** - Text input, placeholder: "Enter your full name"
2. **Phone Number** - Text input, placeholder: "+91 12345 67890"
3. **Email Address** - Email input, placeholder: "your.email@example.com"
4. **State** - Text input, placeholder: "Enter your state"
5. **Questions or Topics** - Textarea, placeholder: "Share any questions, doubts, or topics you'd like to discuss with the Bishop"

### Form Behavior:
- Implement client-side validation for all required fields
- Validate email format and phone number format
- Show loading state during submission
- Disable submit button while submitting
- Display success message/toast on successful submission
- Display error message on failure
- Clear form after successful submission
- Submit button text: "Complete Registration"

---

## Supabase Database Schema

Create three tables with identical schemas:
1. `coffee_with_bishop_registrations`
2. `meet_the_strangers_registrations`
3. `blessed_banquet_registrations`

**Table columns:**
- `id` - uuid, primary key, auto-generated
- `full_name` - text, not null
- `phone` - text, not null
- `email` - text, not null
- `state` - text, not null
- `questions` - text, not null
- `created_at` - timestamp with time zone, default now()

Enable Row Level Security (RLS) on all tables:
- Public can INSERT
- Only authenticated admin users can SELECT

---

## Admin Panel Requirements

Create an admin dashboard at `/admin` with:
- **Authentication:** Protected by Supabase Auth (redirect to login if not authenticated)
- **Features:**
  - View all registrations for each event in separate tabs or sections
  - Display registrations in a table format with all fields
  - Show registration count per event
  - Basic search/filter functionality by name or email
  - Sort by date (newest first by default)
- **UI:** Clean, minimal dashboard design consistent with main site aesthetic

---

## Design Guidelines

- **Color scheme:** Warm, outdoor-inspired colors suitable for a church event
- **Typography:** Clean, readable fonts with proper hierarchy
- **Interactions:** Smooth hover effects and subtle transitions
- **Responsiveness:** Mobile-first approach, test on mobile, tablet, and desktop
- **Accessibility:** Proper labels, ARIA attributes, keyboard navigation support
- **Images:** Ensure poster images are optimized and have proper alt text

---

## File Structure Expectations

- Main landing page: `app/page.tsx`
- Registration pages: `app/register/[event-slug]/page.tsx` (dynamic route)
- Admin panel: `app/admin/page.tsx`
- Reusable form component: `components/RegistrationForm.tsx`
- Event card component: `components/EventCard.tsx`
- Supabase client configuration: `lib/supabase.ts`
- Type definitions: `types/registration.ts`

---

## Implementation Checklist

1. Set up Next.js project with Tailwind CSS
2. Configure Supabase client and environment variables
3. Create database tables with RLS policies
4. Build hero section
5. Create EventCard component for reusable event display
6. Build main landing page with all three events
7. Create RegistrationForm component with validation
8. Implement registration pages for each event
9. Set up Supabase Auth for admin access
10. Build admin dashboard with registration viewing functionality
11. Test form submissions and data persistence
12. Test responsive design across devices
13. Verify admin authentication and data access