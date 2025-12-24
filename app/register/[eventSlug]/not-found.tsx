import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-stone-50 to-teal-50 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl shadow-xl mb-6">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Event Not Found
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
          The event you're looking for doesn't exist or has been removed. Please
          check the URL or return to our events page.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button variant="primary" size="lg">
              Return to Home
            </Button>
          </Link>
          <Link href="/#events">
            <Button variant="outline" size="lg">
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
