import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © 2025 Jaago. All rights reserved.
          </p>
          <Link
            href="/admin/login"
            className="text-sm text-gray-500 hover:text-amber-600 transition-colors"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}

