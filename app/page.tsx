import { Hero } from '@/components/Hero';
import { EventCard } from '@/components/EventCard';
import { events } from '@/lib/events';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 md:mb-16">
            Our Events
          </h2>
          <div className="space-y-0">
            {events.map((event, index) => (
              <EventCard
                key={event.slug}
                event={event}
                imagePosition={index % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
