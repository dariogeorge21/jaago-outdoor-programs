Build a modern, responsive outdoor event webpage for "Jaago Outdoor" - a church program featuring three sub-events. Each sub-event has its own registration form that submits to a separate Supabase table.

---

## Tech Stack Requirements

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Backend/Database:** Supabase
- **Forms:** React controlled components with client-side validation
- **Authentication:** Supabase Auth for admin panel
- **TypeScript:** Use TypeScript for all components and type safety

---

## Page Structure & Implementation

### 1. Hero Section
Create a hero section with:
- Event name: "Jaago Outdoor" (use h1 tag for SEO)
- Tagline emphasizing fellowship, faith, and community (e.g., "Where Faith Meets Fellowship")
- Warm, outdoor aesthetic with:
  - Clean, modern typography (consider using Inter or similar sans-serif font)
  - Soft shadows (use Tailwind's shadow-lg or shadow-xl)
  - Subtle animations (fade-in on load, smooth scroll behavior)
  - Background: Consider a subtle gradient or outdoor-themed background image with overlay
- Minimum height: Full viewport height (min-h-screen) on desktop, auto on mobile
- Center-aligned content with proper vertical spacing

### 2. Events Section (3 Event Cards)
Display three events as individual cards or full-width sections with:
- **Layout:** 
  - Desktop: Image on left (40% width), content on right (60% width)
  - Mobile: Stack vertically (image on top, content below)
  - Use CSS Grid or Flexbox for responsive layout
  - Alternate image position (left-right-left) for visual variety on desktop
- **Each card contains:** 
  - Poster image (aspect ratio 3:4 or 16:9, object-fit: cover)
  - Event title (h2 tag)
  - Description paragraph (2-3 sentences)
  - Bullet-point highlights (ul/li with custom styling)
  - CTA button (primary button style, full width on mobile)
- **Spacing:** Generous padding (p-8 on desktop, p-6 on mobile), margin between cards (mb-12 or mb-16)
- **Card styling:** White background, rounded corners (rounded-xl), subtle shadow, hover effect (lift/shadow increase)

---

## Event Details

### Event 1: Coffee with Bishop
- **Poster path:** `/bishop.png` (stored in `/public` directory)
- **Title:** "Coffee with Bishop"
- **Description:** "An intimate gathering where faith meets fellowship. Share your thoughts, ask questions, and connect with our spiritual leader over a warm cup of coffee."
- **Highlights:**
  - Chat with a Bishop for over 30 minutes
  - Clarify doubts and deepen your love for God and the Church
  - Connect with fellow believers and strengthen your faith community
  - Come with an open heart and leave inspired
- **CTA Button Text:** "Book Your Spot"
- **Registration route:** `/register/coffee-with-bishop`
- **Supabase table:** `coffee_with_bishop_registrations`
- **Event slug:** `coffee-with-bishop`

### Event 2: Meet the Strangers
- **Poster path:** `/strangers.png` (Note: Update with actual poster when available)
- **Title:** "Meet the Strangers"
- **Description:** "Meet the strangers—connect, converse, and discover new perspectives through an interactive and welcoming session."
- **Highlights:** (Add 3-4 bullet points similar to Event 1 format)
- **CTA Button Text:** "Register Now"
- **Registration route:** `/register/meet-the-strangers`
- **Supabase table:** `meet_the_strangers_registrations`
- **Event slug:** `meet-the-strangers`

### Event 3: Blessed Banquet
- **Poster path:** `/banquete.png` (Note: Update with actual poster when available)
- **Title:** "Blessed Banquet"
- **Description:** "An exclusive dinner gathering fostering faith and fellowship, offering an opportunity to engage in meaningful dialogue with our spiritual leader."
- **Highlights:** (Add 3-4 bullet points similar to Event 1 format)
- **CTA Button Text:** "Register Now"
- **Registration route:** `/register/blessed-banquet`
- **Supabase table:** `blessed_banquet_registrations`
- **Event slug:** `blessed-banquet`

---

## Registration Form Specification

Create a **reusable registration form component** (`RegistrationForm.tsx`) that accepts the following props:
- `eventName` (string): Display name of the event
- `eventSlug` (string): URL-friendly event identifier
- `tableName` (string): Target Supabase table name

Each event links to a separate registration page (`/register/[event-slug]`) using the same form UI component.

### Form Fields (all required):
1. **Full Name** 
   - Type: Text input
   - Placeholder: "Enter your full name"
   - Validation: Minimum 2 characters, no numbers
   - Error message: "Please enter your full name"

2. **Phone Number** 
   - Type: Text input
   - Placeholder: "+91 12345 67890"
   - Validation: Must match Indian phone number format (10 digits, optional +91 prefix)
   - Error message: "Please enter a valid phone number"

3. **Email Address** 
   - Type: Email input
   - Placeholder: "your.email@example.com"
   - Validation: Valid email format (use regex or HTML5 validation)
   - Error message: "Please enter a valid email address"

4. **State** 
   - Type: Text input or dropdown (consider dropdown with Indian states for better UX)
   - Placeholder: "Enter your state"
   - Validation: Minimum 2 characters
   - Error message: "Please enter your state"

5. **Questions or Topics** 
   - Type: Textarea
   - Placeholder: "Share any questions, doubts, or topics you'd like to discuss with the Bishop"
   - Rows: 4-5
   - Validation: Minimum 10 characters (optional field consideration)
   - Error message: "Please share at least one question or topic"

### Form Behavior:
- Implement client-side validation using React state or a form library (e.g., react-hook-form)
- Show inline error messages below each field when validation fails
- Validate on blur and on submit
- Show loading spinner on submit button during submission
- Disable all form inputs and submit button while submitting
- Display success message/toast notification on successful submission (use a toast library like react-hot-toast or sonner)
- Display error message/toast on failure with specific error details
- Clear form after successful submission and optionally redirect to confirmation page or show "Register for Another Event" CTA
- Submit button text: "Complete Registration"
- Submit button styling: Primary color, full width on mobile, disabled state styling

### Form Submission Flow:
1. Validate all fields on submit
2. If validation fails, show errors and prevent submission
3. If validation passes, set loading state
4. Call Supabase insert function with form data
5. Handle success: Show success message, clear form, log success
6. Handle error: Show error message, keep form data, log error
7. Reset loading state

---

## Supabase Database Schema

Create three tables with identical schemas in your Supabase project:
1. `coffee_with_bishop_registrations`
2. `meet_the_strangers_registrations`
3. `blessed_banquet_registrations`

**Table columns (SQL schema):**
```sql
CREATE TABLE coffee_with_bishop_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  state TEXT NOT NULL,
  questions TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Repeat for other two tables
```

**Row Level Security (RLS) Policies:**
- Enable RLS on all three tables
- **INSERT Policy:** Allow anonymous/public users to insert (for registration form)
  ```sql
  CREATE POLICY "Allow public insert" ON coffee_with_bishop_registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);
  ```
- **SELECT Policy:** Only authenticated admin users can read data
  ```sql
  CREATE POLICY "Allow authenticated select" ON coffee_with_bishop_registrations
  FOR SELECT TO authenticated
  USING (true);
  ```
- Apply identical policies to all three tables

**Indexes (for performance):**
- Create index on `created_at` for sorting
- Create index on `email` for search functionality

---

## Admin Panel Requirements

Create an admin dashboard at `/admin` with the following specifications:

### Authentication:
- Protected route using Supabase Auth
- Redirect unauthenticated users to `/admin/login`
- Create login page at `/admin/login` with email/password authentication
- Show logout button in admin header

### Dashboard Features:
- **Layout:** Tabbed interface or accordion sections for each event
- **Event Tabs:** "Coffee with Bishop", "Meet the Strangers", "Blessed Banquet"
- **Registration Display:**
  - Table format with columns: Name, Phone, Email, State, Questions, Date Registered
  - Responsive table (consider horizontal scroll on mobile or card layout)
  - Show registration count badge on each tab
  - Display total registrations at the top of each section
- **Search/Filter:**
  - Search bar to filter by name or email (client-side filtering)
  - Debounced search input (300ms delay)
  - Clear search button
- **Sorting:**
  - Default sort: Newest first (created_at DESC)
  - Allow sorting by name (alphabetical), email, date
  - Click column headers to toggle sort direction
- **Pagination (optional but recommended):**
  - Show 20 registrations per page
  - Pagination controls at bottom
- **Export (optional):**
  - Button to export registrations as CSV

### UI Design:
- Clean, minimal dashboard design consistent with main site
- Use Tailwind UI components or shadcn/ui for professional look
- Sidebar or top navigation with logo
- Proper spacing and typography hierarchy
- Loading states while fetching data
- Empty states when no registrations exist

---

## Design Guidelines

### Color Scheme:
- **Primary color:** Warm earth tones (e.g., amber-600, orange-500) suitable for outdoor/church theme
- **Secondary color:** Complementary cool tone (e.g., teal-600, sky-600)
- **Background:** Off-white or light beige (e.g., stone-50, amber-50)
- **Text:** Dark gray for body (gray-800), black for headings (gray-900)
- **Accents:** Use primary color for CTAs, links, and highlights

### Typography:
- **Font family:** Use system fonts or Google Fonts (Inter, Poppins, or Lato recommended)
- **Heading sizes:** 
  - h1: text-4xl md:text-5xl lg:text-6xl
  - h2: text-3xl md:text-4xl
  - h3: text-2xl md:text-3xl
- **Body text:** text-base md:text-lg
- **Line height:** Generous (leading-relaxed or leading-loose)
- **Font weight:** Bold for headings (font-bold), normal for body (font-normal)

### Interactions:
- **Hover effects:** 
  - Buttons: Slight color darkening (hover:bg-primary-700), scale up (hover:scale-105)
  - Cards: Shadow increase (hover:shadow-xl), subtle lift (hover:-translate-y-1)
  - Links: Underline or color change
- **Transitions:** Use transition-all duration-300 for smooth animations
- **Focus states:** Visible focus rings for accessibility (focus:ring-2 focus:ring-primary-500)

### Responsiveness:
- **Breakpoints:** Mobile-first approach using Tailwind breakpoints (sm, md, lg, xl)
- **Test on:** iPhone SE (375px), iPad (768px), Desktop (1280px+)
- **Navigation:** Hamburger menu on mobile, full nav on desktop
- **Images:** Responsive images with srcset or Next.js Image component
- **Touch targets:** Minimum 44x44px for buttons and links on mobile

### Accessibility:
- **Semantic HTML:** Use proper heading hierarchy, nav, main, section tags
- **ARIA attributes:** aria-label for icon buttons, aria-describedby for form errors
- **Keyboard navigation:** All interactive elements accessible via Tab key
- **Alt text:** Descriptive alt text for all images (e.g., "Coffee with Bishop event poster")
- **Color contrast:** Ensure WCAG AA compliance (4.5:1 for body text, 3:1 for large text)
- **Form labels:** Visible labels or aria-label for all inputs
- **Error announcements:** Use aria-live regions for dynamic error messages

### Images:
- **Optimization:** Use Next.js Image component for automatic optimization
- **Format:** WebP with JPEG fallback
- **Dimensions:** Poster images should be at least 800x1000px for quality
- **Loading:** Lazy loading for below-fold images, priority loading for hero
- **Alt text:** Descriptive and specific (e.g., "Bishop sharing coffee with community members")

---

## File Structure Expectations

```
jaago-outdoor/
├── app/
│   ├── page.tsx                          # Main landing page with hero and events
│   ├── layout.tsx                        # Root layout with metadata
│   ├── register/
│   │   └── [eventSlug]/
│   │       └── page.tsx                  # Dynamic registration page
│   ├── admin/
│   │   ├── page.tsx                      # Admin dashboard (protected)
│   │   └── login/
│   │       └── page.tsx                  # Admin login page
│   └── api/                              # Optional API routes if needed
├── components/
│   ├── EventCard.tsx                     # Reusable event card component
│   ├── RegistrationForm.tsx              # Reusable registration form
│   ├── Hero.tsx                          # Hero section component
│   └── ui/                               # Reusable UI components (Button, Input, etc.)
├── lib/
│   ├── supabase.ts                       # Supabase client configuration
│   └── utils.ts                          # Utility functions (validation, formatting)
├── types/
│   └── registration.ts                   # TypeScript type definitions
├── public/
│   └── bishop.png                        # Event poster images
├── .env.local                            # Environment variables (Supabase keys)
└── tailwind.config.ts                    # Tailwind configuration
```

---

## Environment Variables

Create `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Implementation Checklist

### Phase 1: Project Setup
- [ ] Initialize Next.js 15 project with TypeScript and Tailwind CSS
- [ ] Install dependencies: `@supabase/supabase-js`, `react-hot-toast` or `sonner`
- [ ] Configure Supabase client in `lib/supabase.ts`
- [ ] Set up environment variables in `.env.local`
- [ ] Configure Tailwind with custom colors and fonts

### Phase 2: Database Setup
- [ ] Create three Supabase tables with identical schemas
- [ ] Enable Row Level Security on all tables
- [ ] Create INSERT policy for public access
- [ ] Create SELECT policy for authenticated users only
- [ ] Create indexes on `created_at` and `email` columns
- [ ] Test database connection and policies

### Phase 3: Frontend Components
- [ ] Build Hero component with animations
- [ ] Create EventCard component with responsive layout
- [ ] Build reusable UI components (Button, Input, Textarea)
- [ ] Create RegistrationForm component with validation logic
- [ ] Implement form submission with Supabase integration
- [ ] Add toast notifications for success/error states

### Phase 4: Pages
- [ ] Build main landing page (`app/page.tsx`) with hero and all three events
- [ ] Create dynamic registration page (`app/register/[eventSlug]/page.tsx`)
- [ ] Implement event slug validation and 404 handling
- [ ] Add metadata and SEO tags to all pages

### Phase 5: Admin Panel
- [ ] Set up Supabase Auth configuration
- [ ] Create admin login page with email/password authentication
- [ ] Build protected admin dashboard with authentication check
- [ ] Implement registration data fetching for all three events
- [ ] Create tabbed interface for viewing different event registrations
- [ ] Add search/filter functionality
- [ ] Implement sorting by date, name, email
- [ ] Add logout functionality

### Phase 6: Testing & Optimization
- [ ] Test form submissions for all three events
- [ ] Verify data persistence in Supabase tables
- [ ] Test admin authentication flow (login, logout, protected routes)
- [ ] Test responsive design on mobile (375px), tablet (768px), desktop (1280px+)
- [ ] Verify accessibility (keyboard navigation, screen reader, color contrast)
- [ ] Test form validation (all edge cases)
- [ ] Optimize images with Next.js Image component
- [ ] Test loading states and error handling
- [ ] Verify RLS policies are working correctly

### Phase 7: Deployment Preparation
- [ ] Add proper error boundaries
- [ ] Implement loading skeletons for better UX
- [ ] Create README with setup instructions
- [ ] Verify all environment variables are documented
- [ ] Test production build locally (`npm run build && npm start`)

---

## Additional Notes

- **Error Handling:** Implement comprehensive error handling for all Supabase operations with user-friendly error messages
- **Loading States:** Show loading indicators during data fetching and form submissions
- **Success Feedback:** Provide clear confirmation after successful registration (consider a confirmation page or modal)
- **Data Validation:** Implement both client-side and server-side validation (use Supabase database constraints)
