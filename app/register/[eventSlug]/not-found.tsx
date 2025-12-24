import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-stone-50 to-teal-50 px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Event Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/">
          <Button variant="primary">Return to Home</Button>
        </Link>
      </div>
    </main>
  );
}

