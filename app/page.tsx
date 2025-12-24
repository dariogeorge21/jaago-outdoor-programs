import { Hero } from '@/components/Hero';
import { EventCard } from '@/components/EventCard';
import { events } from '@/lib/events';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <section
        id="events"
        className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-50 to-white"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
              Our Events
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Join Us for Inspiring{' '}
              <span className="bg-gradient-to-r from-amber-600 to-teal-600 bg-clip-text text-transparent">
                Experiences
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our upcoming events designed to strengthen your faith and
              build meaningful connections within our community.
            </p>
          </div>

          {/* Events Grid */}
          <div className="space-y-0">
            {events.map((event, index) => (
              <div
                key={event.slug}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <EventCard
                  event={event}
                  imagePosition={index % 2 === 0 ? 'left' : 'right'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Join our community and experience the power of faith and fellowship.
          </p>
          <a
            href="#events"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Explore All Events
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}
