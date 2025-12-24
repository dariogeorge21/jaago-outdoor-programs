import { EventConfig } from '@/types/registration';

export const events: EventConfig[] = [
  {
    slug: 'coffee-with-bishop',
    name: 'Coffee with Bishop',
    tableName: 'coffee_with_bishop_registrations',
    posterPath: '/coffee.jpeg',
    description:
      'An intimate gathering where faith meets fellowship. Share your thoughts, ask questions, and connect with our spiritual leader over a warm cup of coffee.',
    highlights: [
      'Chat with a Bishop for over 30 minutes',
      'Clarify doubts and deepen your love for God and the Church',
      'Connect with fellow believers and strengthen your faith community',
      'Come with an open heart and leave inspired',
    ],
    ctaText: 'Book Your Spot',
  },
  {
    slug: 'meet-the-strangers',
    name: 'Meet the Strangers',
    tableName: 'meet_the_strangers_registrations',
    posterPath: '/strangers.jpeg',
    description:
      'Meet the strangers—connect, converse, and discover new perspectives through an interactive and welcoming session.',
    highlights: [
      'Engage in meaningful conversations with new people',
      'Build connections and expand your community',
      'Share experiences and learn from diverse perspectives',
      'Experience the joy of fellowship and friendship',
    ],
    ctaText: 'Register Now',
  },
  {
    slug: 'blessed-banquet',
    name: 'Blessed Banquet',
    tableName: 'blessed_banquet_registrations',
    posterPath: '/banquete.jpeg',
    description:
      'An exclusive dinner gathering fostering faith and fellowship, offering an opportunity to engage in meaningful dialogue with our spiritual leader.',
    highlights: [
      'Enjoy a special dinner in a warm, welcoming atmosphere',
      'Engage in meaningful dialogue with our spiritual leader',
      'Connect with fellow believers over shared meals',
      'Experience fellowship and spiritual growth together',
    ],
    ctaText: 'Register Now',
  },
];

export function getEventBySlug(slug: string): EventConfig | undefined {
  return events.find((event) => event.slug === slug);
}

