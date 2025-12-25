import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { RegistrationForm } from '@/components/RegistrationForm';
import { getEventBySlug } from '@/lib/events';
import { Button } from '@/components/ui/Button';

interface RegisterPageProps {
  params: Promise<{ eventSlug: string }>;
}

export async function generateMetadata({ params }: RegisterPageProps) {
  const { eventSlug } = await params;
  const event = getEventBySlug(eventSlug);

  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  return {
    title: `Register for ${event.name} - Jaago Outdoor Gala`,
    description: event.description,
  };
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { eventSlug } = await params;
  const event = getEventBySlug(eventSlug);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-teal-50">
      {/* Header with navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-semibold transition-colors group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero section for event */}
      <div className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 via-transparent to-teal-100/50"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Event Image */}
            <div className="relative w-full md:w-1/3 max-w-sm">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={event.posterPath}
                  alt={`${event.name} event poster`}
                  fill
                  className={
                    event.slug === 'blessed-banquet' ? 'object-contain' : 'object-cover'
                  }
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Event Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                Registration Open
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                {event.name}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
                {event.description}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {event.highlights.slice(0, 2).map((highlight, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-sm"
                  >
                    <svg
                      className="w-4 h-4 text-amber-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form Section */}
      <div className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <RegistrationForm
          eventName={event.name}
          eventSlug={event.slug}
          tableName={event.tableName}
        />
      </div>
    </main>
  );
}
