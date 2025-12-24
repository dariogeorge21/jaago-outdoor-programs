import { notFound } from 'next/navigation';
import Link from 'next/link';
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
    title: `Register for ${event.name} - Jaago Outdoor`,
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
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-teal-50 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-block mb-8">
          <Button variant="outline">← Back to Home</Button>
        </Link>
        <RegistrationForm
          eventName={event.name}
          eventSlug={event.slug}
          tableName={event.tableName}
        />
      </div>
    </main>
  );
}

