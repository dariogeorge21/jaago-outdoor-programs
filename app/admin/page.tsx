'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { AuthGuard } from '@/components/admin/AuthGuard';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { RegistrationTable } from '@/components/admin/RegistrationTable';
import { createBrowserClient } from '@/lib/supabase';
import { RegistrationData } from '@/types/registration';
import { events } from '@/lib/events';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [registrations, setRegistrations] = useState<{
    [key: string]: RegistrationData[];
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRegistrations() {
      setIsLoading(true);
      try {
        const allRegistrations: { [key: string]: RegistrationData[] } = {};

        const supabase = createBrowserClient();
        for (const event of events) {
          const { data, error } = await supabase
            .from(event.tableName)
            .select('*')
            .order('created_at', { ascending: false });

          if (error) {
            console.error(`Error fetching ${event.name}:`, error);
            toast.error(`Failed to load ${event.name} registrations`);
            allRegistrations[event.tableName] = [];
          } else {
            allRegistrations[event.tableName] = data || [];
          }
        }

        setRegistrations(allRegistrations);
      } catch (error) {
        console.error('Error fetching registrations:', error);
        toast.error('Failed to load registrations');
      } finally {
        setIsLoading(false);
      }
    }

    fetchRegistrations();
  }, []);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-stone-50">
        <AdminHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {events.map((event, index) => (
                  <button
                    key={event.slug}
                    onClick={() => setActiveTab(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === index
                        ? 'border-amber-600 text-amber-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {event.name}
                    {registrations[event.tableName] && (
                      <span className="ml-2 bg-amber-100 text-amber-800 py-1 px-2 rounded-full text-xs">
                        {registrations[event.tableName].length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading registrations...</p>
            </div>
          ) : (
            <RegistrationTable
              registrations={
                registrations[events[activeTab].tableName] || []
              }
              eventName={events[activeTab].name}
            />
          )}
        </main>
      </div>
    </AuthGuard>
  );
}

