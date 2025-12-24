'use client';

import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';

export function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Logout failed', {
        description: error.message,
      });
    } else {
      toast.success('Logged out successfully');
      router.push('/admin/login');
      router.refresh();
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Jaago Outdoor</h1>
            <p className="text-sm text-gray-600">Admin Dashboard</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}

