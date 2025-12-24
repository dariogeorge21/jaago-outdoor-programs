# Jaago Outdoor - Event Registration Website

A modern, responsive outdoor event webpage for "Jaago Outdoor" - a church program featuring three sub-events. Each sub-event has its own registration form that submits to a separate Supabase table.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- 📝 Three event registration forms with client-side validation
- 🔐 Admin dashboard with Supabase authentication
- 📊 Registration management with search, filter, and sorting
- 🎯 TypeScript for type safety
- ⚡ Next.js 15 with App Router

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Backend/Database:** Supabase
- **Forms:** React Hook Form with client-side validation
- **Authentication:** Supabase Auth
- **TypeScript:** Full type safety
- **Toast Notifications:** Sonner

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jaago-outdoor
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the Supabase database:
   - Open your Supabase project dashboard
   - Go to SQL Editor
   - Run the SQL script from `supabase/schema.sql` to create tables, policies, and indexes

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

### Tables

The application requires three tables with identical schemas:

1. `coffee_with_bishop_registrations`
2. `meet_the_strangers_registrations`
3. `blessed_banquet_registrations`

### Schema

Each table has the following columns:
- `id` (UUID, Primary Key)
- `full_name` (TEXT, NOT NULL)
- `phone` (TEXT, NOT NULL)
- `email` (TEXT, NOT NULL)
- `state` (TEXT, NOT NULL)
- `questions` (TEXT, NOT NULL)
- `created_at` (TIMESTAMPTZ, Default: NOW())

### Row Level Security (RLS)

- **INSERT Policy:** Allows anonymous/public users to insert (for registration forms)
- **SELECT Policy:** Only authenticated admin users can read data

See `supabase/schema.sql` for the complete setup script.

## Project Structure

```
jaago-outdoor/
├── app/
│   ├── page.tsx                    # Main landing page
│   ├── layout.tsx                   # Root layout
│   ├── globals.css                  # Global styles
│   ├── register/
│   │   └── [eventSlug]/
│   │       ├── page.tsx             # Dynamic registration page
│   │       └── not-found.tsx        # 404 page for invalid events
│   └── admin/
│       ├── page.tsx                 # Admin dashboard (protected)
│       └── login/
│           └── page.tsx             # Admin login page
├── components/
│   ├── Hero.tsx                     # Hero section component
│   ├── EventCard.tsx                # Event card component
│   ├── RegistrationForm.tsx          # Reusable registration form
│   ├── ui/                          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Textarea.tsx
│   └── admin/                       # Admin components
│       ├── AuthGuard.tsx
│       ├── AdminHeader.tsx
│       └── RegistrationTable.tsx
├── lib/
│   ├── supabase.ts                  # Supabase client
│   ├── auth.ts                      # Authentication helpers
│   ├── utils.ts                     # Utility functions
│   └── events.ts                    # Event configurations
├── types/
│   └── registration.ts              # TypeScript types
└── public/                          # Static assets
    ├── bishop.png                   # Event poster (add your images)
    ├── strangers.png
    └── banquete.png
```

## Events

### Coffee with Bishop
- Intimate gathering with spiritual leader
- Registration: `/register/coffee-with-bishop`

### Meet the Strangers
- Interactive session for connecting with new people
- Registration: `/register/meet-the-strangers`

### Blessed Banquet
- Exclusive dinner gathering
- Registration: `/register/blessed-banquet`

## Admin Panel

Access the admin dashboard at `/admin` (requires authentication).

### Features:
- View registrations for all three events
- Search by name or email
- Sort by name, email, or date
- Pagination (20 registrations per page)
- Tabbed interface for easy navigation

### Authentication:
1. Create an admin user in Supabase Auth
2. Login at `/admin/login`
3. Access the dashboard to view all registrations

## Form Validation

All registration forms include client-side validation:

- **Full Name:** Minimum 2 characters, letters only
- **Phone:** Indian phone number format (10 digits, optional +91 prefix)
- **Email:** Valid email format
- **State:** Minimum 2 characters
- **Questions:** Minimum 10 characters

## Building for Production

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key |

## Notes

- Add your event poster images to the `/public` directory
- Ensure RLS policies are correctly set up in Supabase
- Create admin users through Supabase Auth dashboard
- All form submissions are logged to Supabase tables

## License

Private project for Jaago Outdoor church program.
