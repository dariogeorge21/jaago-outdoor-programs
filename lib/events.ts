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
      'Meet the Stranger is an engaging fellowship activity designed to help participants connect with people from different regions, build fellowship, and share the love of Christ in a joyful and creative environment.',
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
      'Join us for a night of faith, fellowship, and feasting at Blessed Banquet, a special dinner with our beloved bishop.Come share in a delicious meal, inspiring words, and warm community as we gather for a graceful talk blessings, and a chance to connect with one another',
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

