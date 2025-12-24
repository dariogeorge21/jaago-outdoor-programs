export interface RegistrationData {
  id?: string;
  full_name: string;
  phone: string;
  email: string;
  state: string;
  questions: string;
  created_at?: string;
}

export interface EventConfig {
  slug: string;
  name: string;
  tableName: string;
  posterPath: string;
  description: string;
  highlights: string[];
  ctaText: string;
}

export type EventSlug = 'coffee-with-bishop' | 'meet-the-strangers' | 'blessed-banquet';

