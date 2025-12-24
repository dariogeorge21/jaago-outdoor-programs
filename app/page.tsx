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
    </main>
  );
}
